const express = require('express');
const router = express.Router();

// Import controller (to be implemented later if needed)
// const settingsController = require('../controllers/settings.controller');

// GET /api/settings - Get all settings
router.get('/', (req, res) => {
  res.json({
    message: 'Settings retrieved successfully',
    settings: {
      crawlDefaults: {
        maxDepth: 2,
        maxPages: 100,
        followExternalLinks: false,
        respectRobotsTxt: true,
        userAgent: 'Crawl4AI Bot/1.0',
        requestDelay: 1000,
        timeout: 30000,
      },
      ui: {
        theme: 'light',
        language: 'en',
        showAdvancedOptions: false
      },
      llm: {
        enabled: true,
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        processingSchedule: 'after-crawl'
      }
    }
  });
});

// POST /api/settings - Update settings
router.post('/', (req, res) => {
  const newSettings = req.body;
  // In a real application, you'd validate and save these settings
  // For now, we'll just echo them back
  res.json({
    message: 'Settings updated successfully',
    settings: newSettings
  });
});

// GET /api/settings/defaults - Reset settings to defaults
router.get('/defaults', (req, res) => {
  res.json({
    message: 'Settings reset to defaults',
    settings: {
      crawlDefaults: {
        maxDepth: 2,
        maxPages: 100,
        followExternalLinks: false,
        respectRobotsTxt: true,
        userAgent: 'Crawl4AI Bot/1.0',
        requestDelay: 1000,
        timeout: 30000,
      },
      ui: {
        theme: 'light',
        language: 'en',
        showAdvancedOptions: false
      },
      llm: {
        enabled: true,
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        processingSchedule: 'after-crawl'
      }
    }
  });
});

module.exports = router;
