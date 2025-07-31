import React from 'react'

export default function CheckAccount() {
  return (
    <div class="flex items-center justify-center py-8 px-4">
      <div class="bg-white shadow-xl border border-gray-200 rounded-2xl p-12 max-w-3xl w-full">
        <h2 class="text-2xl font-bold text-center text-gray-800 border-b border-gray-300 mb-6 pb-6">ورود / ثبت نام سریع
        </h2>

        <form method="POST" action="/account/check-login" class="space-y-5">
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
            <input type="text" name="phone" id="phone" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <button type="submit"
            class="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200">
            ادامه
          </button>
        </form>
      </div>
    </div>
  )
}
