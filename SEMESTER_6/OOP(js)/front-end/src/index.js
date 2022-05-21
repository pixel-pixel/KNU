import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';
import { CardsPage } from './pages/CardsPage';
import { ErrorPage } from './pages/ErrorPage';
import './style.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/cards' element={<CardsPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);