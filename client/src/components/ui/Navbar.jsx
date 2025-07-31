import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString('fa-IR'));
  const [productCount] = useState(56);
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };
  return (
    <header className="fixed top-0 left-0 z-40 w-full shadow-sm bg-white pt-32">
      <div className="flex items-center justify-between px-6 py-2 lg:container lg:mx-auto">
        <div className="flex items-center space-x-2 space-x-reverse">
          <a href="#"><img src="/images/logo-full-150.png" alt="logo" /></a>
        </div>
        <div className="hidden md:block w-1/2 relative">
          <input
            className="w-full border border-gray-300 text-right rounded-xl py-2 px-4 focus:outline-none bg-gray-200 text-gray-500"
            type="text"
            placeholder="جستجو در تاپ رایان …"
          />
          <button
            type="submit"
            className="group absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors rounded-r-none duration-200 hover:bg-red-500"
          >
            <svg
              className="h-6 w-10 text-gray-600 group-hover:text-white transition-colors duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            id="hamburger-button"
            className="outline-none"
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <div className="w-6 flex flex-col space-y-1.5">
              <span
                className={`h-0.5 w-6 bg-gray-600 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`h-0.5 w-6 bg-gray-600 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`h-0.5 w-6 bg-gray-600 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </div>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-5 h-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">دسته بندی محصولات</h2>
            </div>

            <div className="flex-grow space-y-3">
              <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={closeMenu}>لپ تاپ</a>
              <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={closeMenu}>قطعات کامپیوتر</a>
              <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={closeMenu}>لوازم جانبی کامپیوتر</a>
              <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={closeMenu}>کامپیوتر آماده</a>
              <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={closeMenu}>وسایل الکترونیک</a>
              <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={closeMenu}>کنسول بازی</a>
              <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={closeMenu}>تجهیزات شبکه</a>
              <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition" onClick={closeMenu}>ماشین‌های اداری</a>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-200 text-gray-500 text-sm">
              <div className="flex justify-between">
                <span>{time}</span>
                <span>{productCount} محصول</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center space-x-4 space-x-reverse text-xs lg:text-sm">
            <li className="">
              <a href="#" className="hidden lg:flex items-center text-gray-700 pr-4 border-r border-gray-300 h-8">
                ۰۲۱-۹۱۰۰۷۳۷۴
              </a>
            </li>
            <li>
              {user ? (
                <a
                  href="/account/profile"
                  className="flex items-center gap-2 border-r border-gray-300 px-4 py-1 text-gray-700"
                >
                  <div
                    className="w-[29px] h-[35px] bg-cover shrink-0 translate-y-[2px]"
                    style={{ backgroundImage: "url('/images/icons.png')", backgroundPosition: "-1px -4px" }}
                  ></div>
                  <span className="text-xs lg:text-sm leading-none">پروفایل</span>
                </a>
              ) : (
                <a
                  href="/account/profile"
                  className="flex items-center gap-2 border-r border-gray-300 px-4 py-1 text-gray-700"
                >
                  <div
                    className="w-[29px] h-[35px] bg-cover shrink-0 translate-y-[2px]"
                    style={{ backgroundImage: "url('/images/icons.png')", backgroundPosition: "-1px -4px" }}
                  ></div>
                  <span className="text-xs lg:text-sm leading-none">ورود | ثبت نام</span>
                </a>
              )}
            </li>
            <li className="border-r border-gray-300 pl-4 pr-4">
              <a href="#" className="flex items-center space-x-1 space-x-reverse text-gray-700 h-8">
                <div
                  className="w-[29px] h-[35px] m-auto bg-cover"
                  style={{ backgroundImage: "url('/images/icons.png')", backgroundPosition: "-36px -2px" }}
                ></div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex gap-3 lg:gap-6 text-xs lg:text-sm text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600">لپ تاپ</a>
            <a href="#" className="hover:text-blue-600">قطعات کامپیوتر</a>
            <a href="#" className="hover:text-blue-600">لوازم جانبی کامپیوتر</a>
            <a href="#" className="hover:text-blue-600">کامپیوتر آماده</a>
            <a href="#" className="hover:text-blue-600">وسایل گیمینگ</a>
            <a href="#" className="hover:text-blue-600">کنسول بازی</a>
            <a href="#" className="hover:text-blue-600">تجهیزات شبکه</a>
            <a href="#" className="hover:text-blue-600">ماشین‌های اداری</a>
          </div>
          <div className="md:hidden w-screen relative">
            <input
              className="w-full border border-gray-300 text-right rounded-xl py-2 px-4 focus:outline-none bg-gray-200 text-gray-500"
              type="text"
              placeholder="جستجو در تاپ رایان …"
            />
            <button
              type="submit"
              className="group absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors rounded-r-none duration-200 hover:bg-red-500"
            >
              <svg
                className="h-6 w-10 text-gray-600 group-hover:text-white transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
