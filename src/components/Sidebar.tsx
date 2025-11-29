import React from 'react';
import { Nav } from 'react-bootstrap';

interface SidebarProps {
  onLogout: () => void;
  currentPage: 'dashboard' | 'settings' | 'expenses';
  onNavigate: (page: 'dashboard' | 'settings' | 'expenses') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, currentPage, onNavigate }) => {
  return (
    <div className="sidebar vh-100" style={{ 
      width: '250px',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: '#f4f6fb',
      padding: '30px 20px',
      borderRight: '1px solid #eee',
      overflowY: 'auto'
    }}>
      <div className="mb-4">
        <h3 style={{ color: '#635bff', fontWeight: 'bold', marginBottom: '30px' }}>
          StudMoney
        </h3>
        
        {/* Avatar */}
        <div className="d-flex align-items-center mb-4 pb-4" style={{ borderBottom: '1px solid #e0e0e0' }}>
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#635bff',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              marginRight: '12px'
            }}
          >
            É
          </div>
          <div>
            <div style={{ fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>
              Étudiant
            </div>
            <div style={{ color: '#999', fontSize: '0.85rem' }}>
              étudiant@email.com
            </div>
          </div>
        </div>
      </div>

      <Nav className="flex-column">
        <Nav.Link 
          className="mb-2"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('dashboard');
          }}
          style={{ 
            color: currentPage === 'dashboard' ? '#fff' : '#333',
            backgroundColor: currentPage === 'dashboard' ? '#635bff' : 'transparent',
            padding: '12px 15px',
            borderRadius: '10px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          📊 Dashboard
        </Nav.Link>
        <Nav.Link 
          className="mb-2"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('expenses');
          }}
          style={{ 
            color: currentPage === 'expenses' ? '#fff' : '#666',
            backgroundColor: currentPage === 'expenses' ? '#635bff' : 'transparent',
            padding: '12px 15px',
            borderRadius: '10px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          💰 Dépenses
        </Nav.Link>
        <Nav.Link 
          className="mb-2"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('settings');
          }}
          style={{ 
            color: currentPage === 'settings' ? '#fff' : '#666',
            backgroundColor: currentPage === 'settings' ? '#635bff' : 'transparent',
            padding: '12px 15px',
            borderRadius: '10px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          ⚙️ Paramètres
        </Nav.Link>
      </Nav>

      <div className="mt-auto pt-4" style={{ position: 'absolute', bottom: '20px', width: '210px' }}>
        <Nav.Link 
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
          style={{ 
            color: '#dc3545',
            padding: '12px 15px',
            borderRadius: '10px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          🚪 Déconnexion
        </Nav.Link>
      </div>
    </div>
  );
};
