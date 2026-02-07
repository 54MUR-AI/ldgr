import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const user = { name: 'John Doe', email: 'john.doe@example.com' }; // Mock user data
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <button onClick={() => handleNavigation('/profile')}>Profile</button>
        <button onClick={() => handleNavigation('/settings')}>Settings</button>
        <button onClick={() => handleNavigation('/logout')}>Logout</button>
      </nav>
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Welcome, {user.name}!</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
