import { FaMicrochip, FaCartShopping, FaUsers, FaWallet } from "react-icons/fa6";

export default function HeaderCards({ products, users }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-6">
      {/* Card 1: Products */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-blue-100/50 dark:border-blue-900/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-transparent dark:from-blue-900/20 dark:to-gray-900/50 rounded-2xl pointer-events-none" />
        <div className="relative flex items-start justify-between">
          <div className="p-3 rounded-full bg-blue-100/70 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-all">
            <FaMicrochip className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-900/40 px-3 py-1.5 rounded-full transition-colors duration-200">
            +۲.۴٪ از دیروز
          </span>
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">تعداد محصولات</p>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
            {products.toLocaleString('fa-IR')}
          </p>
        </div>
      </div>

      {/* Card 2: Orders */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-green-100/50 dark:border-green-900/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 to-transparent dark:from-emerald-900/20 dark:to-gray-900/50 rounded-2xl pointer-events-none" />
        <div className="relative flex items-start justify-between">
          <div className="p-3 rounded-full bg-emerald-100/70 dark:bg-emerald-900/30 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-all">
            <FaCartShopping className="text-2xl text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-900/40 px-3 py-1.5 rounded-full transition-colors duration-200">
            +۵ مورد جدید
          </span>
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">سفارشات امروز</p>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">۱۲</p>
        </div>
      </div>

      {/* Card 3: Users */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-purple-100/50 dark:border-purple-900/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 to-transparent dark:from-purple-900/20 dark:to-gray-900/50 rounded-2xl pointer-events-none" />
        <div className="relative flex items-start justify-between">
          <div className="p-3 rounded-full bg-purple-100/70 dark:bg-purple-900/30 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-all">
            <FaUsers className="text-2xl text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-300 bg-purple-50/70 dark:bg-purple-900/40 px-3 py-1.5 rounded-full transition-colors duration-200">
            +۱۲ کاربر جدید
          </span>
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">تعداد کاربران</p>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
            {users.toLocaleString('fa-IR')}
          </p>
        </div>
      </div>

      {/* Card 4: Revenue */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-amber-900/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 to-transparent dark:from-amber-900/20 dark:to-gray-900/50 rounded-2xl pointer-events-none" />
        <div className="relative flex items-start justify-between">
          <div className="p-3 rounded-full bg-amber-100/70 dark:bg-amber-900/30 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 transition-all">
            <FaWallet className="text-2xl text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-900/40 px-3 py-1.5 rounded-full transition-colors duration-200">
            +۳.۲٪ از دیروز
          </span>
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">درآمد امروز</p>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
            {(12000000).toLocaleString('fa-IR')} تومان
          </p>
        </div>
      </div>
    </div>
  );
}