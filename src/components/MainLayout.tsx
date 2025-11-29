import React from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  currentPage: 'dashboard' | 'settings' | 'expenses';
  onNavigate: (page: 'dashboard' | 'settings' | 'expenses') => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onLogout, currentPage, onNavigate }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} currentPage={currentPage} onNavigate={onNavigate} />
      <div className="content-area" style={{ flex: 1, marginLeft: '250px' }}>
        {children}
      </div>
    </div>
  );
};
