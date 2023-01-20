import React from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './component/App.jsx'
import Home from './component/Home.jsx'
import ManageSub from './component/ManageSub.jsx'
import Settings from './component/Settings.jsx'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<App />} />
        <Route index element={<Home />} />
        <Route path="managesub" element={<ManageSub />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
