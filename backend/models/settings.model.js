const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'default',
    index: true
  },
  llmProviders: {
    openai: {
      type: Boolean,
      default: true
    },
    anthropic: {
      type: Boolean,
      default: true
    },
    google: {
      type: Boolean, 
      default: true
    },
    deepseek: {
      type: Boolean,
      default: true
    }
  },
  defaultCrawlConfig: {
    depth: {
      type: Number,
      default: 2
    },
    maxPages: {
      type: Number,
      default: 100
    },
    followExternalLinks: {
      type: Boolean,
      default: false
    },
    outputFormat: {
      type: String,
      default: 'json'
    }
  }
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
