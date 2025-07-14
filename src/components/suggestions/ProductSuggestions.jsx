import React, { useState } from "react";
import axios from "axios";
import ProductCard from "../products/ProductCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import { toast } from "react-toastify";

const ProductSuggestions = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/suggestions", {
        params: { userId: "123" },
      });
      const data = response.data;
      setSuggestions(data);
    } catch (error) {
      toast.error("Không thể lấy gợi ý lúc này");
    } finally {
      setLoading(false);
    }
  };

  if (!suggestions && !loading) {
    return (
      <button
        onClick={fetchSuggestions}
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Đang tải gợi ý..." : "Gợi ý sản phẩm phù hợp"}
      </button>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <button
          disabled
          className="w-full px-4 py-2 text-white bg-blue-400 rounded mb-4 cursor-not-allowed"
        >
          Đang tải gợi ý...
        </button>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Đã xem gần đây</h3>
            <div className="grid-cards">
              {[...Array(4)].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              Dựa trên sở thích của bạn
            </h3>
            <div className="grid-cards">
              {[...Array(4)].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Xu hướng</h3>
            <div className="grid-cards">
              {[...Array(4)].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={fetchSuggestions}
        disabled={loading}
        className="btn-primary w-full mb-4"
      >
        {loading ? "Đang tải gợi ý..." : "Làm mới gợi ý"}
      </button>

      <div className="space-y-6">
        {suggestions.recentlyViewed.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Đã xem gần đây</h3>
            <div className="grid-cards">
              {suggestions.recentlyViewed.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {suggestions.basedOnLikes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Dựa trên sở thích của bạn
            </h3>
            <div className="grid-cards">
              {suggestions.basedOnLikes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {suggestions.trending.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Xu hướng</h3>
            <div className="grid-cards">
              {suggestions.trending.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSuggestions;
