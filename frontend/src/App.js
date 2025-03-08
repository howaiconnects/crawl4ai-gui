import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import NewCrawl from './pages/NewCrawl';
import CrawlStatus from './pages/CrawlStatus';
import ResultsViewer from './pages/ResultsViewer';
import Settings from './pages/Settings';
import LLMProcessingConfig from './pages/LLMProcessingConfig';
import NotFound from './pages/NotFound';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewCrawl />} />
          <Route path="/status/:id" element={<CrawlStatus />} />
          <Route path="/results/:id" element={<ResultsViewer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/llm-config" element={<LLMProcessingConfig />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
