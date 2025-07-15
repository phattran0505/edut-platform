import { useState, useEffect } from "react";

const useViewHistory = () => {
  const [viewHistory, setViewHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("viewHistory") || "[]");
    setViewHistory(history);
  }, []);

  const addToHistory = (course) => {
    const history = JSON.parse(localStorage.getItem("viewHistory") || "[]");
    // xóa khóa học nếu đã xem
    const filteredHistory = history.filter((item) => item.id !== course.id);
    // thêm khóa học vào đầu danh sách
    const newHistory = [course, ...filteredHistory].slice(0, 8);
    localStorage.setItem("viewHistory", JSON.stringify(newHistory));
    setViewHistory(newHistory);
  };

  return { viewHistory, addToHistory };
};

export default useViewHistory;
