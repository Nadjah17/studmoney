import React, { useState } from 'react';
import { Card, Table, Form, InputGroup } from 'react-bootstrap';
import type { Expense } from '../types';
import { formatCurrency } from '../utils/currency';
import { expenseCategories } from '../utils/categories';

interface ExpensesPageProps {
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
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

export const ExpensesPage: React.FC<ExpensesPageProps> = ({ expenses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesCategory = !selectedCategory || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (expenses.length === 0) {
    return (
      <div className="dashboard" style={{ minHeight: '100vh', backgroundColor: '#f4f6fb' }}>
        <div className="container-fluid py-4">
          <h1 className="mb-4" style={{ fontWeight: 'bold', color: '#333', fontSize: '2.5rem' }}>
            Toutes les dépenses
          </h1>
          <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <Card.Body className="p-5 text-center">
              <p style={{ color: '#999', fontSize: '1.1rem' }}>
                Aucune dépense enregistrée
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard" style={{ minHeight: '100vh', backgroundColor: '#f4f6fb' }}>
      <div className="container-fluid py-4">
        <h1 className="mb-4" style={{ fontWeight: 'bold', color: '#333', fontSize: '2.5rem' }}>
          Toutes les dépenses
        </h1>

        <Card className="mb-4" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
          <Card.Body className="p-4">
            <div className="row mb-3">
              <div className="col-md-6">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Rechercher par titre ou description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </InputGroup>
              </div>
              <div className="col-md-6">
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ borderRadius: '8px' }}
                >
                  <option value="">Toutes les catégories</option>
                  {expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{filteredExpenses.length}</strong> dépense{filteredExpenses.length > 1 ? 's' : ''} trouvée{filteredExpenses.length > 1 ? 's' : ''}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#635bff' }}>
                Total: {formatCurrency(totalAmount)}
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
          <Card.Body className="p-0">
            <div style={{ overflowX: 'auto' }}>
              <Table hover className="mb-0">
                <thead style={{ backgroundColor: '#f4f6fb' }}>
                  <tr>
                    <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Date</th>
                    <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Titre</th>
                    <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Catégorie</th>
                    <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Montant</th>
                    <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                        {formatDate(expense.date)}
                      </td>
                      <td style={{ padding: '15px', verticalAlign: 'middle', fontWeight: '500' }}>
                        {expense.title}
                      </td>
                      <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                        <span className="d-flex align-items-center">
                          <span className="me-2">{getCategoryIcon(expense.category)}</span>
                          {expense.category}
                        </span>
                      </td>
                      <td style={{ padding: '15px', verticalAlign: 'middle', fontWeight: '600', color: '#dc3545' }}>
                        -{formatCurrency(expense.amount)}
                      </td>
                      <td style={{ padding: '15px', verticalAlign: 'middle', color: '#999' }}>
                        {expense.description || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

