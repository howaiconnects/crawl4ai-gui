import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Active Crawls</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Completed Crawls</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Pages Crawled</h3>
          <p className="stat-value">0</p>
        </div>
      </div>
      <div className="recent-crawls">
        <h2>Recent Crawls</h2>
        <p>No recent crawls found.</p>
      </div>
    </div>
  );
};

export default Dashboard;
