import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  priceFilter: "all",
  selectedProduct: null,
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  viewHistory: JSON.parse(localStorage.getItem("viewHistory") || "[]"),
  courses: [],
  isCoursesLoaded: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);
      if (index === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(index, 1);
      }
      // Lưu vào localStorage
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    updateViewHistory: (state, action) => {
      const course = action.payload;
      state.viewHistory = state.viewHistory.filter(
        (item) => item.id !== course.id
      );
      state.viewHistory = [course, ...state.viewHistory].slice(0, 8);
      localStorage.setItem("viewHistory", JSON.stringify(state.viewHistory));
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
      state.isCoursesLoaded = true;
    },
  },
});

export const {
  toggleFavorite,
  setSearchTerm,
  setPriceFilter,
  setSelectedProduct,
  updateViewHistory,
  setCourses,
} = productSlice.actions;

export default productSlice.reducer;
