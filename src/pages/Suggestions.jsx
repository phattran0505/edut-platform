import { useEffect } from "react";
import ProductSuggestions from "../components/suggestions/ProductSuggestions";
import ProductModal from "../components/products/ProductModal";

const Suggestions = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gợi ý cho bạn</h1>
        <p className="text-gray-600">
          Khám phá các khóa học được cá nhân hóa dựa trên sở thích của bạn
        </p>
      </div>

      <ProductSuggestions />
      <ProductModal />
    </div>
  );
};

export default Suggestions;
