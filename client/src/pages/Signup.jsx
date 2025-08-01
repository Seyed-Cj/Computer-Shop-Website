import React from 'react'

export default function Signup() {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-12 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 border-b border-gray-300 mb-6 pb-6">ثبت نام </h2>
        <form action="/account/register" method="POST" className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" for="name">نام:</label>
            <input type="text" id="name" name="name" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" for="family">نام خانوادگی:</label>
            <input type="text" id="family" name="family" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" for="email">ایمیل:</label>
            <input type="email" id="email" name="email" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" for="phone">شماره تلفن:</label>
            <input type="text" id="phone" name="phone" value="<%= phone || '' %>" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" for="password">رمز عبور:</label>
            <input type="password" id="password" name="password" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" for="confirmPassword">تکرار رمز عبور:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>


          <button type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200">
            ادامه
          </button>
        </form>
      </div>
    </div>
  )
}
