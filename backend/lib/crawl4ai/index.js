/**
 * crawl4ai - Asynchronous Web Crawler implementation
 */
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

class AsyncWebCrawler {
  constructor(options = {}) {
    this.options = {
      depth: 2,
      maxPages: 100,
      followExternalLinks: false,
      outputFormat: 'json',
      userAgent: 'Crawl4AI Bot/1.0',
      requestDelay: 1000,
      timeout: 30000,
      ...options
    };
    
    this.visited = new Set();
    this.queue = [];
    this.results = [];
    this.running = false;
    this.stats = {
      pagesProcessed: 0,
      totalLinks: 0,
      startTime: null,
      endTime: null
    };
  }

  async arun(startUrl, options = {}) {
    this.options = { ...this.options, ...options };
    this.queue = [{ url: startUrl, depth: 0 }];
    this.visited = new Set();
    this.results = [];
    this.running = true;
    this.stats = {
      pagesProcessed: 0,
      totalLinks: 0,
      startTime: new Date(),
      endTime: null
    };

    console.log(`Starting crawl from ${startUrl} with depth ${this.options.depth}`);
    
    const pages = [];
    const urlData = new Map();
    
    // Crawling process
    while (this.queue.length > 0 && pages.length < this.options.maxPages && this.running) {
      const { url: currentUrl, depth } = this.queue.shift();
      
      if (this.visited.has(currentUrl) || depth > this.options.depth) {
        continue;
      }
      
      this.visited.add(currentUrl);
      
      try {
        console.log(`Crawling: ${currentUrl} (depth ${depth})`);
        const page = await this.fetchPage(currentUrl);
        pages.push(page);
        urlData.set(currentUrl, page);
        this.stats.pagesProcessed++;
        
        if (depth < this.options.depth) {
          const links = this.extractLinks(page.content, page.url, this.options.followExternalLinks);
          this.stats.totalLinks += links.length;
          
          for (const link of links) {
            if (!this.visited.has(link)) {
              this.queue.push({ url: link, depth: depth + 1 });
            }
          }
        }
        
        // Apply delay between requests
        if (this.options.requestDelay > 0) {
          await new Promise(resolve => setTimeout(resolve, this.options.requestDelay));
        }
      } catch (error) {
        console.error(`Error crawling ${currentUrl}:`, error.message);
        urlData.set(currentUrl, {
          url: currentUrl,
          error: error.message,
          crawlTime: new Date().toISOString()
        });
      }
    }
    
    this.running = false;
    this.stats.endTime = new Date();
    
    // Return data in the expected format
    return {
      stats: {
        pagesProcessed: this.stats.pagesProcessed,
        totalLinks: this.stats.totalLinks,
        crawlTime: (this.stats.endTime - this.stats.startTime) / 1000,
        startTime: this.stats.startTime.toISOString(),
        endTime: this.stats.endTime.toISOString()
      },
      pages: pages,
      urlMap: Object.fromEntries(urlData)
    };
  }
  
  async fetchPage(pageUrl) {
    try {
      const response = await axios.get(pageUrl, {
        headers: {
          'User-Agent': this.options.userAgent
        },
        timeout: this.options.timeout
      });
      
      const $ = cheerio.load(response.data);
      const links = this.extractLinks(response.data, pageUrl, this.options.followExternalLinks);
      
      return {
        url: pageUrl,
        title: $('title').text().trim(),
        content: response.data,
        textContent: $('body').text().trim(),
        metaDescription: $('meta[name="description"]').attr('content') || '',
        headers: response.headers,
        crawlTime: new Date().toISOString(),
        links: links,
        statusCode: response.status
      };
    } catch (error) {
      console.error(`Error fetching ${pageUrl}:`, error.message);
      return {
        url: pageUrl,
        error: error.message,
        crawlTime: new Date().toISOString(),
        statusCode: error.response?.status || 0
      };
    }
  }
  
  extractLinks(html, baseUrl, followExternalLinks = false) {
    try {
      const $ = cheerio.load(html);
      const links = new Set();
      const baseUrlObj = new URL(baseUrl);
      const baseDomain = baseUrlObj.hostname;
      
      $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        if (href) {
          // Skip anchor links and javascript: links
          if (href.startsWith('#') || href.startsWith('javascript:')) {
            return;
          }
          
          // Resolve relative URLs
          const resolvedUrl = url.resolve(baseUrl, href);
          
          try {
            const linkUrlObj = new URL(resolvedUrl);
            const linkDomain = linkUrlObj.hostname;
            
            // Check if we should follow external links
            if (followExternalLinks || linkDomain === baseDomain) {
              links.add(resolvedUrl);
            }
          } catch (e) {
            // Invalid URL, skip it
          }
        }
      });
      
      return [...links];
    } catch (error) {
      console.error('Error extracting links:', error.message);
      return [];
    }
  }
  
  stop() {
    this.running = false;
    return {
      pagesProcessed: this.stats.pagesProcessed,
      message: 'Crawling stopped'
    };
  }
  
  getStatus() {
    return {
      running: this.running,
      ...this.stats,
      visitedUrls: this.visited.size,
      queueSize: this.queue.length,
      elapsedTime: this.stats.startTime 
        ? Math.round((this.stats.endTime || new Date()) - this.stats.startTime) / 1000
        : 0
    };
  }
}

module.exports = {
  AsyncWebCrawler,
  version: '1.0.0'
};