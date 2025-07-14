import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaHeart, FaHistory, FaRobot } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  const location = useLocation();
  const favorites = useSelector((state) => state.products.favorites);
  const viewHistory = useSelector((state) => state.products.viewHistory);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ to, icon: Icon, label, count }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`nav-link group ${
          isActive ? "nav-link-active" : "nav-link-inactive"
        }`}
      >
        <div className="relative">
          <Icon className="nav-icon" />
          {count > 0 && <span className="nav-badge">{count}</span>}
        </div>
        <span className="ml-2 font-medium md:block hidden">{label}</span>
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 header-gradient
        ${
          isScrolled
            ? "shadow-xl shadow-black/20 backdrop-blur-sm bg-opacity-90"
            : ""
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col md:flex-row items-center justify-center md:justify-between flex-wrap gap-4 md:gap-0">
          <Link to="/" className="flex items-center space-x-2 group">
            <FaGraduationCap className="w-10 h-10 text-white" />
            <span className="text-2xl font-bold text-white group-hover:opacity-90 transition-opacity">
              Edu Platform
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            <NavLink to="/" icon={FaHome} label="Trang chủ" count={0} />
            <NavLink
              to="/favorites"
              icon={FaHeart}
              label="Yêu thích"
              count={favorites.length}
            />
            <NavLink
              to="/history"
              icon={FaHistory}
              label="Lịch sử"
              count={viewHistory.length}
            />
            <NavLink
              to="/suggestions"
              icon={FaRobot}
              label="Gợi ý AI"
              count={0}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
