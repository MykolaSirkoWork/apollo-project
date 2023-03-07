import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AppContext } from './context/AppContext';
import { HomePage } from './pages/Home';
import { ItemPage } from './pages/ItemPage';
import { Login } from './pages/Login';

export const App: React.FC = () => {
  const {
    accessToken,
    role,
  } = useContext(AppContext);

  return (
    <div className="app">
      <Routes>
        {accessToken && role ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="item/:id" element={<ItemPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
};
