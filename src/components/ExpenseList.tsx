import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import type { Expense } from '../types';
import { formatCurrency } from '../utils/currency';

interface ExpenseListProps {
  expenses: Expense[];
}

const getCategoryIcon = (category: string): string => {
  const icons: { [key: string]: string } = {
    'Nourriture': '🍔',
    'Transport': '🚗',
    'Logement': '🏠',
    'Études': '📚',
    'Santé': '🏥',
    'Loisirs': '🎮',
    'Autres': '📦',
  };
  return icons[category] || '📦';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Hier';
  } else {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
};

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const recentExpenses = expenses.slice(0, 5);

  if (recentExpenses.length === 0) {
    return (
      <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
        <Card.Body className="p-4">
          <h4 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>
            Dépenses récentes
          </h4>
          <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
            Aucune dépense enregistrée
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
      <Card.Body className="p-4">
        <h4 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>
          Dépenses récentes
        </h4>
        <ListGroup variant="flush">
          {recentExpenses.map((expense) => (
            <ListGroup.Item
              key={expense.id}
              className="px-0 py-3 border-bottom"
              style={{ borderColor: '#f0f0f0 !important' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '45px',
                      height: '45px',
                      backgroundColor: '#f4f6fb',
                      fontSize: '1.2rem'
                    }}
                  >
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>
                      {expense.title}
                    </div>
                    <div style={{ color: '#999', fontSize: '0.85rem' }}>
                      {expense.category} • {formatDate(expense.date)}
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>
                  -{formatCurrency(expense.amount)}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
