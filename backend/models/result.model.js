const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  crawlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crawl',
    required: true
  },
  format: {
    type: String,
    enum: ['json', 'csv', 'markdown', 'html'],
    default: 'json'
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  processingResults: [{
    provider: {
      type: String
    },
    model: {
      type: String
    },
    prompt: {
      type: String
    },
    result: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
