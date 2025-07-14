import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "../store/slices/productSlice";
import axios from "axios";

import SearchBar from "../components/search/SearchBar";
import ProductCard from "../components/products/ProductCard";
import ProductModal from "../components/products/ProductModal";
import Pagination from "../components/pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { courses: allCourses, isCoursesLoaded } = useSelector(
    (state) => state.products
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(!isCoursesLoaded);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 8,
  });

  // filter
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      if (!max) {
        matchesPrice = course.price >= min;
      } else {
        matchesPrice = course.price >= min && course.price <= max;
      }
    }

    return matchesSearch && matchesPrice;
  });

  // phân trang
  const startIndex = (currentPage - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // fetch lần đầu tiên
    const fetchCourses = async () => {
      if (!isCoursesLoaded) {
        try {
          setIsLoading(true);
          const response = await axios.get("/api/v1/courses");
          const data = response.data;
          dispatch(setCourses(data.courses));
        } catch {
          toast.error("Lỗi khi tải danh sách khóa học");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCourses();
  }, [dispatch, isCoursesLoaded]);

  // cập nhật pagination
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
      totalPages: Math.ceil(filteredCourses.length / prev.pageSize),
      totalItems: filteredCourses.length,
    }));
    setCurrentPage(1);
  }, [filteredCourses.length]);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isLoading, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="heading-1">Khám phá khoá học</h1>
        <p className="text-body">
          Tìm kiếm khoá học phù hợp với mục tiêu của bạn
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
      />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            Đang tải danh sách khóa học...
          </div>
        </div>
      ) : paginatedCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            Không tìm thấy khoá học phù hợp
          </div>
          <p className="text-gray-400 mt-2">
            Hãy thử tìm kiếm với từ khoá khác hoặc điều chỉnh bộ lọc
          </p>
        </div>
      ) : (
        <div className="grid-cards">
          {paginatedCourses.map((course) => (
            <ProductCard key={course.id} product={course} />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && !isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <ProductModal />
    </div>
  );
};

export default Home;
