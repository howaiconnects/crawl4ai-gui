import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    maxConcurrentRequests: 5,
    requestDelay: 1000, // ms
    respectRobotsTxt: true,
    userAgent: 'Crawl4AI Bot/1.0',
    followRedirects: true,
    maxRedirects: 5,
    timeout: 30000, // ms
    saveScreenshots: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving settings:', settings);
    // API call to save settings
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1>Crawler Settings</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="settings-group">
          <h2>Request Configuration</h2>
          
          <div className="form-group">
            <label htmlFor="maxConcurrentRequests">Max Concurrent Requests</label>
            <input
              type="number"
              id="maxConcurrentRequests"
              name="maxConcurrentRequests"
              value={settings.maxConcurrentRequests}
              onChange={handleChange}
              min="1"
              max="20"
            />
            <p className="help-text">Maximum number of concurrent HTTP requests</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="requestDelay">Request Delay (ms)</label>
            <input
              type="number"
              id="requestDelay"
              name="requestDelay"
              value={settings.requestDelay}
              onChange={handleChange}
              min="0"
              step="100"
            />
            <p className="help-text">Delay between requests in milliseconds</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="timeout">Request Timeout (ms)</label>
            <input
              type="number"
              id="timeout"
              name="timeout"
              value={settings.timeout}
              onChange={handleChange}
              min="1000"
              step="1000"
            />
            <p className="help-text">Maximum time to wait for a response</p>
          </div>
        </div>
        
        <div className="settings-group">
          <h2>Crawler Behavior</h2>
          
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="respectRobotsTxt"
              name="respectRobotsTxt"
              checked={settings.respectRobotsTxt}
              onChange={handleChange}
            />
            <label htmlFor="respectRobotsTxt">Respect robots.txt</label>
            <p className="help-text">Follow rules specified in the site's robots.txt file</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="userAgent">User Agent</label>
            <input
              type="text"
              id="userAgent"
              name="userAgent"
              value={settings.userAgent}
              onChange={handleChange}
            />
            <p className="help-text">User agent string to identify your crawler</p>
          </div>
          
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="followRedirects"
              name="followRedirects"
              checked={settings.followRedirects}
              onChange={handleChange}
            />
            <label htmlFor="followRedirects">Follow Redirects</label>
          </div>
          
          <div className="form-group">
            <label htmlFor="maxRedirects">Max Redirects</label>
            <input
              type="number"
              id="maxRedirects"
              name="maxRedirects"
              value={settings.maxRedirects}
              onChange={handleChange}
              min="0"
              max="10"
              disabled={!settings.followRedirects}
            />
          </div>
          
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="saveScreenshots"
              name="saveScreenshots"
              checked={settings.saveScreenshots}
              onChange={handleChange}
            />
            <label htmlFor="saveScreenshots">Save Page Screenshots</label>
            <p className="help-text">Capture screenshots of crawled pages</p>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary">Save Settings</button>
          <button type="button" className="btn-secondary">Reset to Defaults</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
