import React from 'react'

export default function Footer() {
  const quickLinks = [
    { title: 'صفحه اصلی', url: '#' },
    { title: 'محصولات', url: '#' },
    { title: 'تخفیف‌ها', url: '#' },
    { title: 'وبلاگ', url: '#' }
  ];

  const customerServices = [
    { title: 'حساب کاربری', url: '#' },
    { title: 'پیگیری سفارش', url: '#' },
    { title: 'راهنمای خرید', url: '#' },
    { title: 'سوالات متداول', url: '#' }
  ];

  const trustBadges = [
    { icon: 'fas fa-shield-alt', title: 'نماد اعتماد' },
    { icon: 'fas fa-certificate', title: 'ساماندهی' },
    { icon: 'fas fa-credit-card', title: 'شاپرک' }
  ];

  const socialLinks = [
    { icon: 'fab fa-telegram-plane', url: '#' },
    { icon: 'fab fa-instagram', url: '#' },
    { icon: 'fab fa-whatsapp', url: '#' },
    { icon: 'fab fa-twitter', url: '#' }
  ];
  return (
    <footer className="bg-gray-100 text-gray-200 pt-16 pb-10">
      <div className="container mx-auto px-2 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="bg-red-600 text-gray-800 p-2 rounded-xl shadow-md">
                <i className="fas fa-store text-xl"></i>
              </div>
              <span className="text-xl font-bold text-gray-800 mr-2">تاپ رایان</span>
            </div>
            <p className="text-gray-900 text-sm leading-relaxed text-justify">
              ارائه‌دهنده بهترین محصولات دیجیتال با تضمین کیفیت و پشتیبانی سریع و تخصصی.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-9 h-9 bg-gray-50 hover:bg-red-600 rounded-full flex items-center justify-center transition"
                  aria-label={social.icon.split('-')[1]}
                >
                  <i className={`${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-700 pb-2 mb-4">دسترسی سریع</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="hover:text-red-400 text-gray-700 transition">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-700 pb-2 mb-4">خدمات مشتریان</h4>
            <ul className="space-y-3 text-sm">
              {customerServices.map((service, index) => (
                <li key={index}>
                  <a href={service.url} className="hover:text-red-400 text-gray-700 transition">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-700 pb-2 mb-4">تماس با ما</h4>
            <ul className="space-y-4 text-sm text-gray-900">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-red-500"></i>
                <span>تهران، خیابان آزادی، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-phone-alt mt-1 text-red-500"></i>
                <div>
                  <div>۰۲۱-۱۲۳۴۵۶۷۸</div>
                  <div>۰۹۱۲-۱۲۳-۴۵۶۷</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope mt-1 text-red-500"></i>
                <span>info@example.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <h4 className="text-center text-base font-semibold mb-6 text-gray-800">نمادهای اعتماد</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 justify-items-center">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="bg-gray-50 hover:bg-gray-700 transition p-4 rounded-lg w-full flex flex-col items-center text-center"
              >
                <i className={`${badge.icon} text-red-500 text-xl mb-2`}></i>
                <span className="text-sm text-gray-800">{badge.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} تاپ رایان - تمام حقوق محفوظ است.
        </div>
      </div>
    </footer>
  )
}
