import React, { useState } from 'react';

const ResultsViewer = () => {
  const [activeTab, setActiveTab] = useState('pages');
  
  // Mock data - would come from your API
  const mockResults = {
    pages: [
      { url: 'https://example.com', title: 'Example Domain', crawlTime: '2023-08-01T14:30:00Z' },
      { url: 'https://example.com/about', title: 'About Us', crawlTime: '2023-08-01T14:31:00Z' },
    ],
    data: { /* JSON data representation */ },
    stats: {
      totalPages: 25,
      totalLinks: 120,
      avgPageSize: '45KB',
      crawlTime: '00:32:15',
    }
  };

  return (
    <div className="results-viewer-container">
      <h1>Crawl Results</h1>
      
      <div className="tabs-container">
        <div className="tabs-header">
          <button 
            className={`tab ${activeTab === 'pages' ? 'active' : ''}`}
            onClick={() => setActiveTab('pages')}
          >
            Pages
          </button>
          <button 
            className={`tab ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            Extracted Data
          </button>
          <button 
            className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'pages' && (
            <div className="pages-tab">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Title</th>
                    <th>Crawl Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResults.pages.map((page, index) => (
                    <tr key={index}>
                      <td>{page.url}</td>
                      <td>{page.title}</td>
                      <td>{new Date(page.crawlTime).toLocaleString()}</td>
                      <td>
                        <button className="btn-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="data-tab">
              <div className="json-viewer">
                <pre>{JSON.stringify(mockResults.data, null, 2)}</pre>
              </div>
              <div className="data-actions">
                <button className="btn-secondary">Export JSON</button>
                <button className="btn-secondary">Export CSV</button>
              </div>
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="stats-tab">
              <div className="stats-grid">
                <div className="stat-item">
                  <h3>Total Pages</h3>
                  <p className="stat-value">{mockResults.stats.totalPages}</p>
                </div>
                <div className="stat-item">
                  <h3>Total Links</h3>
                  <p className="stat-value">{mockResults.stats.totalLinks}</p>
                </div>
                <div className="stat-item">
                  <h3>Avg. Page Size</h3>
                  <p className="stat-value">{mockResults.stats.avgPageSize}</p>
                </div>
                <div className="stat-item">
                  <h3>Crawl Time</h3>
                  <p className="stat-value">{mockResults.stats.crawlTime}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsViewer;
