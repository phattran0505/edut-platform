import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import ProductModal from "../components/products/ProductModal";

const History = () => {
  const viewHistory = useSelector((state) => state.products.viewHistory);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (viewHistory.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-1">Lịch sử xem</h1>
        <div className="text-center py-12">
          <p className="text-body">Bạn chưa xem khóa học nào.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-1">Lịch sử xem</h1>
        <p className="text-body">{viewHistory.length} khóa học đã xem</p>
      </div>

      <div className="grid-cards">
        {viewHistory.map((course) => (
          <ProductCard key={course.id} product={course} />
        ))}
      </div>

      <ProductModal />
    </div>
  );
};

export default History;
