const mongoose = require('mongoose');

const crawlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'failed'],
    default: 'pending'
  },
  config: {
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
    },
    selectors: {
      type: Object,
      default: {
        title: 'title',
        content: 'body',
        links: 'a'
      }
    }
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  error: {
    type: String
  },
  stats: {
    pagesCrawled: {
      type: Number,
      default: 0
    },
    dataSize: {
      type: Number,
      default: 0
    }
  },
  resultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  }
}, {
  timestamps: true
});

const Crawl = mongoose.model('Crawl', crawlSchema);

module.exports = Crawl;
