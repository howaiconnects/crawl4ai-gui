import React, { useState } from 'react';

const LLMProcessingConfig = () => {
  const [config, setConfig] = useState({
    enabled: true,
    model: 'gpt-3.5-turbo',
    apiKey: '',
    taskType: 'summarize',
    customPrompt: '',
    maxTokens: 500,
    temperature: 0.7,
    processingSchedule: 'after-crawl',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving LLM config:', config);
    // API call to save configuration
    alert('LLM configuration saved successfully!');
  };

  const models = [
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'claude-2', name: 'Claude 2' },
    { id: 'llama-2', name: 'Llama 2' },
    { id: 'custom-api', name: 'Custom API Endpoint' }
  ];

  const taskTypes = [
    { id: 'summarize', name: 'Summarize Content' },
    { id: 'extract-data', name: 'Extract Structured Data' },
    { id: 'analyze-sentiment', name: 'Analyze Sentiment' },
    { id: 'classify', name: 'Classify Content' },
    { id: 'custom', name: 'Custom Prompt' }
  ];

  return (
    <div className="llm-config-container">
      <h1>LLM Processing Configuration</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="enabled"
            name="enabled"
            checked={config.enabled}
            onChange={handleChange}
          />
          <label htmlFor="enabled">Enable LLM Processing</label>
          <p className="help-text">Process crawled content with LLM models</p>
        </div>
        
        <div className="config-section" style={{ opacity: config.enabled ? 1 : 0.5 }}>
          <div className="form-group">
            <label htmlFor="model">LLM Model</label>
            <select
              id="model"
              name="model"
              value={config.model}
              onChange={handleChange}
              disabled={!config.enabled}
            >
              {models.map(model => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="apiKey">API Key</label>
            <input
              type="password"
              id="apiKey"
              name="apiKey"
              value={config.apiKey}
              onChange={handleChange}
              placeholder="Enter your API key"
              disabled={!config.enabled}
            />
            <p className="help-text">Your API key will be stored securely</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="taskType">Processing Task</label>
            <select
              id="taskType"
              name="taskType"
              value={config.taskType}
              onChange={handleChange}
              disabled={!config.enabled}
            >
              {taskTypes.map(task => (
                <option key={task.id} value={task.id}>{task.name}</option>
              ))}
            </select>
          </div>
          
          {config.taskType === 'custom' && (
            <div className="form-group">
              <label htmlFor="customPrompt">Custom Prompt</label>
              <textarea
                id="customPrompt"
                name="customPrompt"
                value={config.customPrompt}
                onChange={handleChange}
                rows="5"
                placeholder="Enter your custom prompt here..."
                disabled={!config.enabled}
              ></textarea>
              <p className="help-text">Use {"{content}"} as a placeholder for the crawled content</p>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="maxTokens">Max Output Tokens</label>
            <input
              type="number"
              id="maxTokens"
              name="maxTokens"
              value={config.maxTokens}
              onChange={handleChange}
              min="50"
              max="4000"
              disabled={!config.enabled}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="temperature">Temperature</label>
            <input
              type="range"
              id="temperature"
              name="temperature"
              value={config.temperature}
              onChange={handleChange}
              min="0"
              max="2"
              step="0.1"
              disabled={!config.enabled}
            />
            <div className="range-values">
              <span>0 (Deterministic)</span>
              <span>{config.temperature}</span>
              <span>2 (Creative)</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="processingSchedule">Processing Schedule</label>
            <select
              id="processingSchedule"
              name="processingSchedule"
              value={config.processingSchedule}
              onChange={handleChange}
              disabled={!config.enabled}
            >
              <option value="after-crawl">After Crawl Completion</option>
              <option value="real-time">Real-time (During Crawl)</option>
              <option value="manual">Manual Trigger</option>
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={!config.enabled}>
            Save Configuration
          </button>
          <button type="button" className="btn-secondary">
            Test Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

export default LLMProcessingConfig;
