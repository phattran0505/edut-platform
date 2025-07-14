import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300 text-sm">
            © 2024 EduPlatform. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link to="/" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
