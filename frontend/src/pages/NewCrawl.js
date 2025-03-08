import React, { useState } from 'react';

const NewCrawl = () => {
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState(2);
  const [maxPages, setMaxPages] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Starting new crawl with:', { url, depth, maxPages });
    // Add API call here
  };

  return (
    <div className="new-crawl-container">
      <h1>Start New Crawl</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Starting URL</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="depth">Crawl Depth</label>
          <input
            type="number"
            id="depth"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            min="1"
            max="10"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="maxPages">Max Pages</label>
          <input
            type="number"
            id="maxPages"
            value={maxPages}
            onChange={(e) => setMaxPages(parseInt(e.target.value))}
            min="1"
          />
        </div>
        
        <button type="submit" className="btn-primary">Start Crawl</button>
      </form>
    </div>
  );
};

export default NewCrawl;
