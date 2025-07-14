import { useDispatch, useSelector } from "react-redux";
import {
  FaTimes,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaLanguage,
  FaChalkboardTeacher,
  FaCertificate,
  FaUserGraduate,
  FaCheckCircle,
} from "react-icons/fa";
import {
  toggleFavorite,
  setSelectedProduct,
  updateViewHistory,
  setCourses,
} from "../../store/slices/productSlice";
import { useEffect } from "react";
import axios from "axios";

const ProductModal = () => {
  const dispatch = useDispatch();
  const selectedProductId = useSelector(
    (state) => state.products.selectedProduct
  );
  const favorites = useSelector((state) => state.products.favorites);
  const courses = useSelector((state) => state.products.courses);
  const isCoursesLoaded = useSelector(
    (state) => state.products.isCoursesLoaded
  );

  useEffect(() => {
    const fetchCourses = async () => {
      if (!isCoursesLoaded) {
        try {
          const response = await axios.get("/api/v1/courses");
          dispatch(setCourses(response.data.courses));
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    };

    fetchCourses();
  }, [dispatch, isCoursesLoaded]);

  const product = selectedProductId
    ? courses.find((p) => p.id === selectedProductId)
    : null;

  useEffect(() => {
    if (product) {
      dispatch(updateViewHistory(product));
    }
  }, [product, dispatch]);

  if (!product) return null;

  const isFavorite = favorites.includes(product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-animation">
        <div className="modal-header rounded-2xl">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 pr-2">
            {product.name}
          </h2>
          <button
            onClick={() => dispatch(setSelectedProduct(null))}
            className="modal-close-btn"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 pb-20 sm:pb-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative group rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-video object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="rating-badge">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-500"
                            : "text-yellow-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating}/5</span>
                </div>

                <div className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-sm rounded-full bg-blue-50 border border-blue-100 text-blue-700">
                  <FaUserGraduate className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                  <span className="font-semibold">
                    {product.totalRatings} học viên
                  </span>
                </div>

                <button
                  onClick={() => dispatch(toggleFavorite(product.id))}
                  className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-sm rounded-full transition-all duration-200 ${
                    isFavorite
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : "bg-slate-50 text-slate-600 border border-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100"
                  }`}
                >
                  {isFavorite ? (
                    <FaHeart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  ) : (
                    <FaRegHeart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  )}
                  <span className="font-medium">
                    {isFavorite ? "Đã thích" : "Yêu thích"}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                  Mô tả chi tiết
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                  Thông tin khoá học
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="feature-card">
                    <FaClock className="feature-icon" />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                        Thời lượng
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 truncate">
                        {product.duration}
                      </p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <FaLanguage className="feature-icon" />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                        Ngôn ngữ
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 truncate">
                        {product.language}
                      </p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <FaChalkboardTeacher className="feature-icon" />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                        Trình độ
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 truncate">
                        {product.level}
                      </p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <FaCertificate className="feature-icon" />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                        Chứng chỉ
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 truncate">
                        {product.certificate ? "Có" : "Không"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-slate-100 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Học phí</p>
              <p className="price-tag">{formatPrice(product.price)}</p>
            </div>
            <button className="btn-primary inline-flex items-center gap-1.5 px-4 py-2">
              <FaCheckCircle className="w-3.5 h-3.5" />
              <span className="text-sm">Đăng ký ngay</span>
            </button>
          </div>
        </div>

        {/* tablet and desktop */}
        <div className="hidden sm:block border-t border-slate-100 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Học phí</p>
              <p className="price-tag">{formatPrice(product.price)}</p>
            </div>
            <button className="btn-primary inline-flex items-center gap-1.5 px-6 py-2">
              <FaCheckCircle className="w-3.5 h-3.5" />
              <span className="text-sm">Đăng ký ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
