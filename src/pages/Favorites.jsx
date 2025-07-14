import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setCourses } from "../store/slices/productSlice";
import ProductCard from "../components/products/ProductCard";
import ProductModal from "../components/products/ProductModal";


const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const courses = useSelector((state) => state.products.courses);
  const isCoursesLoaded = useSelector((state) => state.products.isCoursesLoaded);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!isCoursesLoaded) {
        setLoading(true);
        try {
          const response = await axios.get("/api/v1/courses");
          dispatch(setCourses(response.data.courses));
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch, isCoursesLoaded]);

  useEffect(() => {
    const products = courses.filter((course) => favorites.includes(course.id));
    setFavoriteProducts(products);
  }, [favorites, courses]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="heading-1">Khoá học yêu thích</h1>
          <p className="text-body">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="heading-1">Khoá học yêu thích</h1>
        <p className="text-body">
          Danh sách các khoá học bạn đã đánh dấu yêu thích
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            Bạn chưa có khoá học yêu thích nào
          </div>
          <p className="text-gray-400 mt-2 mb-4">
            Khám phá các khoá học và đánh dấu yêu thích để xem lại sau
          </p>
          <Link to="/" className="btn-primary inline-block px-6 py-3 ">
            Khám phá khoá học
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <ProductModal />
    </div>
  );
};

export default Favorites;
