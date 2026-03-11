import { log } from './utils/logger';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

log('info', "Initializing application...");

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {log('info', "Rendering App component")}<App />
    </StrictMode>,
);
