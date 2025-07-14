import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

function FooterInfo() {
  return (
    <section className="bg-transparent py-12 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Về EduPlatform</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nền tảng học tập trực tuyến hàng đầu Việt Nam, mang đến trải
              nghiệm học tập chất lượng và hiệu quả cho mọi người.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {["Khóa học", "Giảng viên", "Học viên tiêu biểu", "Blog"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to="/"
                      className="text-slate-600 hover:text-blue-600 text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Hỗ trợ</h3>
            <ul className="space-y-2">
              {[
                "Trung tâm hỗ trợ",
                "Điều khoản",
                "Chính sách bảo mật",
                "Liên hệ",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to="/"
                    className="text-slate-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Liên hệ</h3>
            <p className="text-slate-600 text-sm">
              Email: phattran052004@gmail.com
            </p>
            <p className="text-slate-600 text-sm">Hotline: 1900 0000</p>
            <div className="flex space-x-4 pt-2">
              {[FaFacebook, FaTwitter, FaYoutube, FaLinkedin].map(
                (Icon, index) => (
                  <Link
                    key={index}
                    to="/"
                    className={`text-slate-500 hover:text-blue-600 transition-colors`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FooterInfo;
