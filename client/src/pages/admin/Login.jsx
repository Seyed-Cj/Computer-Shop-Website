import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../../components/ui';


export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/api/admin/login', { email, password }, { withCredentials: true });

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
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">ایمیل:</label>
              <Input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">رمز عبور:</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              ورود
            </button>
          </form>

          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}