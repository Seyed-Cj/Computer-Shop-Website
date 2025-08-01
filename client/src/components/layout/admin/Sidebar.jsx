

export default function Sidebar({ sidebarOpen, adminName, adminRole, totalProducts }) {
  return (
    <section
      className={`${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      } lg:translate-x-0 fixed right-0 top-0 z-20 w-64 h-screen bg-gray-900 text-white transform transition-transform duration-300 shadow-lg`}
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
          <a
            href="/admin/profile"
            className="flex items-center px-3 py-1.5 rounded hover:bg-gray-800"
          >
            <i className="fas fa-user ml-2 text-gray-400 w-4"></i> پروفایل
          </a>
          <a
            href="/admin/settings"
            className="flex items-center px-3 py-1.5 rounded hover:bg-gray-800"
          >
            <i className="fas fa-cog ml-2 text-gray-400 w-4"></i> تنظیمات
          </a>
          <form
            action="/admin/logout"
            method="POST"
            className="flex items-center px-3 py-1.5 rounded hover:bg-red-600 text-red-400"
          >
            <i className="fas fa-sign-out-alt ml-2 w-4"></i>{" "}
            <button type="submit">خروج</button>
          </form>
        </div>
      </div>

      <nav className="mt-6 space-y-2 px-4 text-sm">
        <a
          href="/admin/users"
          className="flex items-center p-2 rounded hover:bg-gray-800 transition"
        >
          <i className="fas fa-users w-5 text-gray-400 ml-2"></i>
          کاربران
        </a>
        <a
          href="/admin/products"
          className="flex items-center p-2 rounded hover:bg-gray-800 transition relative"
        >
          <i className="fas fa-microchip w-5 text-gray-400 ml-2"></i>
          محصولات
          <span className="absolute left-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
            {totalProducts}
          </span>
        </a>
        <a
          href="/admin/categories"
          className="flex items-center p-2 rounded hover:bg-gray-800 transition"
        >
          <i className="fas fa-list w-5 text-gray-400 ml-2"></i>
          دسته‌بندی‌ها
        </a>
        <a
          href="/admin/orders"
          className="flex items-center p-2 rounded hover:bg-gray-800 transition relative"
        >
          <i className="fas fa-shopping-cart w-5 text-gray-400 ml-2"></i>
          سفارشات
          <span className="absolute left-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            10
          </span>
        </a>
      </nav>
    </section>
  );
}