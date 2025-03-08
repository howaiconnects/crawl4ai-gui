import React from 'react';

const CrawlStatus = () => {
  // Mock data - would come from your API
  const crawlData = {
    id: 'mock-id',
    status: 'running',
    url: 'https://example.com',
    pagesProcessed: 24,
    totalLinks: 68,
    startTime: new Date().toISOString(),
    elapsedTime: '00:15:22'
  };

  return (
    <div className="crawl-status-container">
      <h1>Crawl Status</h1>
      
      <div className="status-card">
        <div className="status-header">
          <h2>Crawl #{crawlData.id}</h2>
          <span className={`status-badge ${crawlData.status}`}>
            {crawlData.status.toUpperCase()}
          </span>
        </div>
        
        <div className="status-details">
          <div className="detail-item">
            <span className="label">Target URL:</span>
            <span className="value">{crawlData.url}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Pages Processed:</span>
            <span className="value">{crawlData.pagesProcessed}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Total Links:</span>
            <span className="value">{crawlData.totalLinks}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Start Time:</span>
            <span className="value">{new Date(crawlData.startTime).toLocaleString()}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Elapsed Time:</span>
            <span className="value">{crawlData.elapsedTime}</span>
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-label">
            <span>Progress</span>
            <span>{Math.round((crawlData.pagesProcessed / crawlData.totalLinks) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(crawlData.pagesProcessed / crawlData.totalLinks) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="btn-danger">Cancel Crawl</button>
          <button className="btn-secondary">View Partial Results</button>
        </div>
      </div>
    </div>
  );
};

export default CrawlStatus;
