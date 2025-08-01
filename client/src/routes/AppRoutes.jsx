import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/admin/Dashboard';
import Login from '../pages/Login';
import Layout from '../components/layout/Layout';
import AdminLayout from '../components/layout/admin/Layout';
import CheckAccount from '../pages/CheckAccount';
import Signup from '../pages/Signup';
import AdminLogin from '../pages/admin/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/account/login" element={<Login />} />
        <Route path="/account/check" element={<CheckAccount />} />
        <Route path="/account/signup" element={<Signup />} />
        
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
