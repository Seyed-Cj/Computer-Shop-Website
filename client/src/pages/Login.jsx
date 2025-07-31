import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login(phone, password)

      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || 'ورود ناموفق بود.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center py-8 px-4 mt-30">
        <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-12 max-w-3xl w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 border-b border-gray-300 mb-6 pb-6">ورود به حساب کاربری</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">شماره تلفن:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">رمز عبور:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              ورود
            </button>
          </form>

          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

          <p className="mt-4 text-center text-sm text-gray-600">
            حساب کاربری ندارید؟ <a href="/account/register" className="text-red-600 hover:underline">ثبت نام کنید</a>
          </p>
        </div>
      </div>
    </div>
  );
}