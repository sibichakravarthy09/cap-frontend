import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Target, 
  DollarSign, 
  CheckSquare, 
  BarChart3,
  Database,
  Activity
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/leads', icon: Target, label: 'Leads' },
    { path: '/deals', icon: DollarSign, label: 'Deals' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/activities', icon: Activity, label: 'Activities' },
    { path: '/reports', icon: BarChart3, label: 'Reports' }
  ];

  return (
    <div className="sidebar bg-dark text-white">
      <div className="sidebar-header p-4 border-bottom border-secondary">
        <h4 className="mb-0 d-flex align-items-center">
          <Database className="me-2" size={24} />
          CRM System
        </h4>
      </div>
      
      <nav className="sidebar-nav p-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link d-flex align-items-center p-3 mb-2 rounded text-decoration-none ${
                isActive ? 'active' : 'text-white'
              }`
            }
          >
            <item.icon size={20} className="me-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;