import React from 'react';
import { createRoot } from "react-dom/client";
import { App } from './App';

const appRoot = document.getElementById('app-root') as HTMLElement;
createRoot(appRoot).render(<App />);
