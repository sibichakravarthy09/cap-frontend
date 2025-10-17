import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Bell, Settings, LogOut, User, Search } from 'lucide-react';
import authService from '../../services/authService';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="header bg-white border-bottom shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center py-3">
          <div className="col-md-6">
            <form onSubmit={handleSearch} className="search-form">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search customers, leads, deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
          
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-end gap-3">
              {/* Notifications */}
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="link" 
                  className="btn-icon p-0 text-dark position-relative"
                  id="notifications-dropdown"
                >
                  <Bell size={20} />
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                    3
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="notification-dropdown">
                  <Dropdown.Header>Notifications</Dropdown.Header>
                  <Dropdown.Item>New lead assigned to you</Dropdown.Item>
                  <Dropdown.Item>Deal "Acme Corp" updated</Dropdown.Item>
                  <Dropdown.Item>Task due tomorrow</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-center text-primary">
                    View All
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* User Profile */}
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="link" 
                  className="btn-icon p-0 text-dark d-flex align-items-center text-decoration-none"
                  id="user-dropdown"
                >
                  <div className="user-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-start d-none d-md-block">
                    <div className="fw-semibold small">{user?.name || 'User'}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {user?.role || 'User'}
                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/profile')}>
                    <User size={16} className="me-2" />
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/settings')}>
                    <Settings size={16} className="me-2" />
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <LogOut size={16} className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;