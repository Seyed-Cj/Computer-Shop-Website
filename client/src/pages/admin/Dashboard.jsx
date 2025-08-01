import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/layout/admin/Sidebar';
import HeaderCards from '../../components/layout/admin/HeaderCards';
import RevenueChart from '../../components/layout/admin/RevenueChart';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  const [adminData, setAdminData] = useState({
    adminName: '',
    adminRole: '',
    totalUsers: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/admin/dashboard', {
          withCredentials: true,
        });

        const { totalUsers, totalProducts, adminName, adminRole } = res.data.data;

        setAdminData({
          adminName,
          adminRole,
          totalUsers,
          totalProducts,
        });
      } catch (err) {
        console.error('خطا در دریافت اطلاعات داشبورد:', err.response?.data || err.message);
      }
    };

    getDashboard();
  }, []);

  const sample = [
    { date: '20 تیر', income: 12000000 },
    { date: '21 تیر', income: 15500000 },
    { date: '22 تیر', income: 13200000 },
    { date: '23 تیر', income: 38800000 },
    { date: '24 تیر', income: 14300000 },
    { date: '25 تیر', income: 16500000 },
    { date: '26 تیر', income: 15800000 },
  ];

  return (
    <div>
      <Sidebar
        sidebarOpen={true}
        adminName={adminData.adminName}
        adminRole={adminData.adminRole}
        totalProducts={adminData.totalProducts}
        onViewChange={setCurrentView}
      />


      {/* Views */}
      <main class="p-6 mr-0 lg:mr-64 transition-all duration-300">
        <div class="flex mb-8">
          {currentView === 'dashboard' && 'داشبورد مدیریت :'}
          {currentView === 'settings' && 'تنظیمات :'}
          {currentView === 'users' && 'لیست کاربران :'}
        </div>

        {currentView === 'dashboard' && (
          <>
            <HeaderCards
              products={adminData.totalProducts}
              users={adminData.totalUsers}
            />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <RevenueChart data={sample} />
            </div>
          </>
        )}

        {currentView === 'settings' && (
          <h1>تست داشبورد</h1>
        )}

      </main>
    </div>
  );
}