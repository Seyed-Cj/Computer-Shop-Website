import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

export default function CheckAccount() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://localhost:3000/api/auth/check-login', { phone }, { withCredentials: true });

    if (res.data.success) {
      navigate('/account/login')
    } else {
      navigate('/account/signup')
    }
  };

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-12 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 border-b border-gray-300 mb-6 pb-6">
          ورود / ثبت نام سریع
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              شماره موبایل
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              maxLength={11}
              required
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,11}$/.test(value)) {
                  setPhone(value);
                }
              }}
              inputMode="numeric"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            ادامه
          </button>
        </form>
      </div>
    </div>
  );
}