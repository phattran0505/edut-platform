import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaStar, FaUserGraduate } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import { Link, useLocation } from "react-router-dom";
import {
  toggleFavorite,
  setSelectedProduct,
  removeFromViewHistory,
} from "../../store/slices/productSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(product.id);
  const isHistoryPage = location.pathname === "/history";

  const handleRemoveFromHistory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      window.confirm("Bạn có chắc chắn muốn xóa khóa học này khỏi lịch sử xem?")
    ) {
      dispatch(removeFromViewHistory(product.id));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div
          className={`absolute top-4 flex gap-2 ${
            isHistoryPage ? "right-0 w-full justify-between px-4 " : "right-4 "
          }`}
        >
          {isHistoryPage && (
            <button
              onClick={handleRemoveFromHistory}
              className="p-2.5 rounded-full bg-white/90 shadow-lg transform hover:scale-110 transition-all duration-300 hover:bg-slate-100"
            >
              <FaRegTrashCan className="w-5 h-5 text-slate-500 hover:text-slate-700" />
            </button>
          )}
          <button
            onClick={() => dispatch(toggleFavorite(product.id))}
            className="p-2.5 rounded-full bg-white/90 shadow-lg transform hover:scale-110 transition-all duration-300"
          >
            {isFavorite ? (
              <FaHeart className="w-5 h-5 text-red-500" />
            ) : (
              <FaRegHeart className="w-5 h-5 text-slate-400 hover:text-red-500 transition-colors" />
            )}
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100">
            <FaStar className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-700">
              {product.rating}
            </span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100">
            <FaUserGraduate className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              {product.totalRatings}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 line-clamp-2 min-h-[3.5rem] mb-2 group-hover:text-blue-900 transition-colors">
          <Link to="#">{product.name}</Link>
        </h3>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-sm text-slate-500">Học phí</span>
            <span className="text-lg font-bold text-blue-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={() => dispatch(setSelectedProduct(product.id))}
            className="btn-primary flex items-center gap-2"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
