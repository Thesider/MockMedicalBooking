import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  Menu, 
  X,
  Bell,
  User
} from 'lucide-react';
import styles from '../styles/AdminLayout.module.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Doctors', href: '/admin/doctors', icon: Users },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { name: 'Settings', href: '/admin/settings', icon: Settings }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed} lg:translate-x-0`}>
        <div className={styles.sidebarHeader}>
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MediCare Admin</span>
          </Link>
        </div>

        <nav className={styles.sidebarNav}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${styles.sidebarNavItem} ${isActive(item.href) ? styles.active : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={styles.sidebarNavIcon} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              className={styles.menuToggle}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className={styles.topbarRight}>
            <button className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;