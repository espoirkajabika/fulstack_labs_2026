import { Routes, Route, Navigate } from 'react-router-dom';
import DirectoryPage from './pages/DirectoryPage';
import OrganizationPage from './pages/OrganizationPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/directory" replace />} />
      <Route path="/directory" element={<DirectoryPage />} />
      <Route path="/organization" element={<OrganizationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
