import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearViewHistory } from "../store/slices/productSlice";
import { FaRegTrashCan } from "react-icons/fa6";
import ProductCard from "../components/products/ProductCard";
import ProductModal from "../components/products/ProductModal";

const History = () => {
  const dispatch = useDispatch();
  const viewHistory = useSelector((state) => state.products.viewHistory);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleClearHistory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử xem?")) {
      dispatch(clearViewHistory());
    }
  };

  if (viewHistory.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="heading-1">Lịch sử xem</h1>
        <div className="text-center py-8 sm:py-12">
          <p className="text-body">Bạn chưa xem khóa học nào.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h1 className="heading-1 mb-0">Lịch sử xem</h1>
          <p className="text-body">{viewHistory.length} khóa học đã xem</p>
        </div>
        <button
          onClick={handleClearHistory}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors w-full sm:w-auto"
        >
          <FaRegTrashCan className="w-4 h-4" />
          <span>Xóa lịch sử</span>
        </button>
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
