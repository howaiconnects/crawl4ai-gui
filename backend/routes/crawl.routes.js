const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Crawl = require('../models/crawl.model');
const Result = require('../models/result.model');
const crawlService = require('../services/crawl.service');

// Get all crawls
router.get('/', async (req, res) => {
  try {
    const crawls = await Crawl.find().sort({ createdAt: -1 });
    res.json(crawls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific crawl
router.get('/:id', async (req, res) => {
  try {
    const crawl = await Crawl.findById(req.params.id);
    if (!crawl) {
      return res.status(404).json({ message: 'Crawl not found' });
    }
    res.json(crawl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get crawl status
router.get('/:id/status', async (req, res) => {
  try {
    const crawl = await Crawl.findById(req.params.id, 'status stats error');
    if (!crawl) {
      return res.status(404).json({ message: 'Crawl not found' });
    }
    res.json(crawl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get crawl results
router.get('/:id/results', async (req, res) => {
  try {
    const crawl = await Crawl.findById(req.params.id);
    if (!crawl) {
      return res.status(404).json({ message: 'Crawl not found' });
    }
    
    if (!crawl.resultId) {
      return res.status(404).json({ message: 'No results available for this crawl' });
    }
    
    const result = await Result.findById(crawl.resultId);
    if (!result) {
      return res.status(404).json({ message: 'Results not found' });
    }
    
    const format = req.query.format || result.format || 'json';
    let formattedData;
    
    if (format === result.format) {
      formattedData = result.data;
    } else {
      formattedData = crawlService.formatCrawlData(result.data, format);
    }
    
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start a new crawl
router.post('/', [
  body('url').isURL().withMessage('Please provide a valid URL'),
  body('config.depth').optional().isInt({ min: 1, max: 10 }).withMessage('Depth must be between 1 and 10'),
  body('config.maxPages').optional().isInt({ min: 1, max: 1000 }).withMessage('Max pages must be between 1 and 1000'),
  body('config.followExternalLinks').optional().isBoolean(),
  body('config.outputFormat').optional().isIn(['json', 'csv', 'markdown', 'html'])
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { url, config } = req.body;
    
    // Create a new crawl record
    const crawl = new Crawl({
      url,
      config,
      status: 'pending',
      startedAt: new Date()
    });
    await crawl.save();
    
    // Start the crawl asynchronously
    (async () => {
      try {
        // Update status to in_progress
        crawl.status = 'in_progress';
        await crawl.save();
        
        // Perform the crawl
        const crawlResult = await crawlService.crawlWebsite(url, config);
        
        // Create a result document
        const result = new Result({
          crawlId: crawl._id,
          format: config?.outputFormat || 'json',
          data: crawlResult.data
        });
        await result.save();
        
       // Update the crawl record
        crawl.status = 'completed';
        crawl.completedAt = new Date();
        crawl.stats = {
          pagesCrawled: Array.isArray(crawlResult.data) ? crawlResult.data.length : 1,
          dataSize: JSON.stringify(crawlResult.data).length
        };
        crawl.resultId = result._id;
        await crawl.save();
      } catch (error) {
        // Update crawl with error
        crawl.status = 'failed';
        crawl.error = error.message;
        await crawl.save();
        console.error('Crawl failed:', error);
      }
    })();
    
    // Respond immediately
    res.status(202).json({
      message: 'Crawl job started',
      id: crawl._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Process crawl results with LLM
router.post('/:id/process', [
  body('provider').isString().notEmpty(),
  body('model').isString().notEmpty(),
  body('systemPrompt').isString(),
  body('userPrompt').isString().notEmpty()
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { id } = req.params;
    const { provider, model, systemPrompt, userPrompt } = req.body;
    
    // Find the crawl
    const crawl = await Crawl.findById(id);
    if (!crawl) {
      return res.status(404).json({ message: 'Crawl not found' });
    }
    
    if (crawl.status !== 'completed') {
      return res.status(400).json({ message: 'Crawl must be completed before processing' });
    }
    
    if (!crawl.resultId) {
      return res.status(404).json({ message: 'No results available for this crawl' });
    }
    
    // Get the result data
    const result = await Result.findById(crawl.resultId);
    if (!result) {
      return res.status(404).json({ message: 'Results not found' });
    }
    
    // Here you would integrate with your LLM processing service
    // This is a placeholder - you'll need to implement the actual LLM integration
    const llmResult = {
      provider,
      model,
      prompt: userPrompt,
      result: `This is a placeholder result for processing with ${provider} ${model}. In a real implementation, you would send the crawled data to the LLM API.`
    };
    
    // Add the processing result to the result document
    result.processingResults.push(llmResult);
    await result.save();
    
    res.json(llmResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
