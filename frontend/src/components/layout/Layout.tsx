import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <Sidebar />
      <main
        style={{
          marginLeft: '220px',
          paddingTop: '56px',
          minHeight: '100vh',
        }}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
