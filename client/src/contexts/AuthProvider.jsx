import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/me', {}, { withCredentials: true });
        setUser(res.data.success ? res.data.user : null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (phone, password) => {
    const res = await axios.post('http://localhost:3000/api/auth/login', { phone, password }, { withCredentials: true });
    if (res.data.success) setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;