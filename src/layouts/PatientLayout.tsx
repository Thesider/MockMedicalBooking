import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  LayoutDashboard,
  Calendar,
  User,
  FileText,
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/AdminLayout.module.css';

interface PatientLayoutProps {
  children: React.ReactNode;
}

const PatientLayout: React.FC<PatientLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'My Appointments', href: '/patient/appointments', icon: Calendar },
    { name: 'Medical Records', href: '/patient/records', icon: FileText },
    { name: 'Profile', href: '/patient/profile', icon: User }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed} lg:translate-x-0`}>
        <div className={styles.sidebarHeader}>
          <Link to="/patient/dashboard" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Patient Portal</span>
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

          <button
            onClick={handleLogout}
            className={`${styles.sidebarNavItem} w-full text-left mt-8 border-t border-gray-200 pt-4`}
          >
            <LogOut className={styles.sidebarNavIcon} />
            Sign Out
          </button>
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
            <button
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {patient?.firstName} {patient?.lastName}
                </p>
                <p className="text-xs text-gray-500">{patient?.email}</p>
              </div>
              <div className="relative">
                <button
                  className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center focus:outline-none"
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen ? "true" : "false"}
                  aria-label="User menu"
                  title="User menu"
                  tabIndex={0}
                >
                  <User className="w-4 h-4 text-blue-600" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      to="/patient/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
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

export default PatientLayout;
