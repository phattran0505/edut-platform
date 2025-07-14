import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
}) => {
  return (
    <div className="card mb-6">
      <div className="card-body flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm khoá học..."
              className="form-input pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="md:w-48">
          <select
            value={priceFilter}
            onChange={(e) => onPriceFilterChange(e.target.value)}
            className="form-select"
          >
            <option value="all">Tất cả giá</option>
            <option value="0-500000">Dưới 500K</option>
            <option value="500000-1000000">500K - 1 triệu</option>
            <option value="1000000">Trên 1 triệu</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
