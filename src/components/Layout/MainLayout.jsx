import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Common/Sidebar';
import Header from '../Common/Header';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;