const { AsyncWebCrawler } = require('crawl4ai');

class CrawlService {
  constructor() {
    this.crawler = new AsyncWebCrawler();
  }

  async crawlWebsite(url, options = {}) {
    try {
      const defaultOptions = {
        depth: 2,
        maxPages: 100,
        followExternalLinks: false,
        outputFormat: 'json'
      };
      
      const crawlOptions = { ...defaultOptions, ...options };
      const result = await this.crawler.arun(url, crawlOptions);
      
      return {
        status: 'success',
        data: result,
        url,
        options: crawlOptions
      };
    } catch (error) {
      console.error('Crawl error:', error);
      throw new Error(`Failed to crawl ${url}: ${error.message}`);
    }
  }
  
  // Process crawl data with different output formats
  formatCrawlData(data, format = 'json') {
    switch (format.toLowerCase()) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        // Implement CSV conversion logic
        return this.convertToCSV(data);
      case 'markdown':
        // Implement Markdown conversion logic
        return this.convertToMarkdown(data);
      case 'html':
        // Implement HTML conversion logic
        return this.convertToHTML(data);
      default:
        return JSON.stringify(data, null, 2);
    }
  }
  
  convertToCSV(data) {
    // Simple CSV conversion implementation
    if (!data || !data.length) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(val => 
        typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
      ).join(',')
    );
    
    return [headers, ...rows].join('\n');
  }
  
  convertToMarkdown(data) {
    // Simple Markdown conversion implementation
    if (!data || !data.length) return '';
    
    const headers = Object.keys(data[0]);
    const headerRow = '| ' + headers.join(' | ') + ' |';
    const separatorRow = '| ' + headers.map(() => '---').join(' | ') + ' |';
    const dataRows = data.map(item => 
      '| ' + headers.map(header => item[header] || '').join(' | ') + ' |'
    );
    
    return [headerRow, separatorRow, ...dataRows].join('\n');
  }
  
  convertToHTML(data) {
    // Simple HTML conversion implementation
    if (!data || !data.length) return '';
    
    const headers = Object.keys(data[0]);
    const headerRow = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
    const dataRows = data.map(item => 
      '<tr>' + headers.map(header => `<td>${item[header] || ''}</td>`).join('') + '</tr>'
    );
    
    return `<table>
      <thead>${headerRow}</thead>
      <tbody>${dataRows.join('\n')}</tbody>
    </table>`;
  }
}

module.exports = new CrawlService();
