import axios from "axios";
import { Dropdown } from "../../ui";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaChartLine, FaUsers, FaBox, FaList, FaBell } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen, adminName, adminRole, totalProducts, onViewChange }) {

  const navigate = useNavigate();

  const profile = [
    { label: "تنظیمات", value: "settings", icon: <IoSettingsSharp className="text-gray-400 text-lg mt-0" /> },
    { label: "خروج", value: "logout", icon: <FaSignOutAlt className="text-red-500 text-lg" /> },
  ]

  const handleSelect = async (item) => {
    if (item.value === 'logout') {
      try {
        await axios.post('http://localhost:3000/api/admin/logout', {}, { withCredentials: true });

        navigate('/');
      } catch (err) {
        console.error("خطا در خروج:", err);
      }
    }
    if (item.value === 'settings') {
      onViewChange('settings')
    }
  };


  return (
    <section
      className={`${sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 fixed right-0 top-0 z-20 w-64 h-screen bg-[#081b22] text-white transform transition-transform duration-300 shadow-lg`}
    >
      <div className="p-5 border-b border-gray-700 flex flex-col items-center">
        <img
          src="/images/profile.jpg"
          className="w-16 h-16 rounded-full mb-3 border-2 border-gray-700"
          alt="Admin"
        />
        <h3 className="text-lg font-semibold">{adminName}</h3>
        <p className="text-gray-400 text-sm">{adminRole}</p>

        <div className="mt-4 space-y-1 text-sm w-full">
          <Dropdown label="پروفایل" items={profile} icon={<FaUser />} dropdownClassName="font-bold" onSelect={handleSelect} />
        </div>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <button className="relative flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 group"
          onClick={() => onViewChange('dashboard')}  
        >
          <FaChartLine className="text-lg" />
          داشبورد
        </button>
        <button className="relative flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 group">
          <FaUsers className="text-lg" />
          کاربران
        </button>
        <button className="relative flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 group">
          <FaBox className="text-lg" />
          محصولات
          <span className="absolute left-2 top-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 group-hover:bg-emerald-600 transition-colors duration-200">
            {totalProducts.toLocaleString('fa-IR')}
          </span>
        </button>
        <button className="relative flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 group">
          <FaList className="text-lg" />
          دسته‌بندی‌ها
        </button>
        <button className="relative flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 group">
          <FaBell className="text-lg" />
          اعلان‌ها
          <span className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 group-hover:bg-red-600 transition-colors duration-200">
            ۱۰
          </span>
        </button>
      </nav>
    </section>
  );
}