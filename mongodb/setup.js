// This script will run when the MongoDB container initializes
// It sets up indexes and initial data

db = db.getSiblingDB('crawl4ai');

// Create collections if they don't exist
db.createCollection('crawls');
db.createCollection('results');
db.createCollection('settings');

// Create indexes
db.crawls.createIndex({ status: 1 });
db.crawls.createIndex({ createdAt: -1 });
db.results.createIndex({ crawlId: 1 });

// Insert default settings if not exists
if (db.settings.countDocuments({ userId: 'default' }) === 0) {
  db.settings.insertOne({
    userId: 'default',
    llmProviders: {
      openai: true,
      anthropic: true,
      google: true,
      deepseek: true
    },
    defaultCrawlConfig: {
      depth: 2,
      maxPages: 100,
      followExternalLinks: false,
      outputFormat: 'json'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  });
  print('Default settings created');
}

print('MongoDB setup completed successfully');
