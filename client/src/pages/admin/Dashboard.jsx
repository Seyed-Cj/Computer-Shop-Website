import Sidebar from '../../components/layout/admin/Sidebar'

export default function Dashboard() {
  return (
    <div>
      <Sidebar
        sidebarOpen={true}
        adminName="نام ادمین"
        adminRole="نقش"
        totalProducts={25} 
      />
    </div>
  )
}
