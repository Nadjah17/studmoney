import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import type { Expense } from '../types';
import { expenseCategories } from '../utils/categories';
import { saveExpenses, loadExpenses } from '../utils/localStorage';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!amount) {
      newErrors.amount = 'Le montant est requis';
    } else {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        newErrors.amount = 'Le montant doit être supérieur à 0';
      }
    }

    if (!category) {
      newErrors.category = 'La catégorie est requise';
    }

    if (!date) {
      newErrors.date = 'La date est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
      description: description.trim() || undefined,
    };

    // Save to localStorage
    const existingExpenses = loadExpenses();
    const updatedExpenses = [newExpense, ...existingExpenses];
    saveExpenses(updatedExpenses);

    // Notify parent
    onAddExpense(newExpense);

    // Reset form
    setTitle('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Card className="mb-4" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
      <Card.Body className="p-4">
        <h4 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>
          Ajouter une dépense
        </h4>

        {success && (
          <Alert variant="success" className="mb-3" style={{ borderRadius: '8px' }}>
            Dépense ajoutée avec succès!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '500', color: '#333' }}>Titre *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Déjeuner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!errors.title}
              style={{ borderRadius: '8px', padding: '10px' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Montant (FCFA) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  isInvalid={!!errors.amount}
                  style={{ borderRadius: '8px', padding: '10px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Catégorie *</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  isInvalid={!!errors.category}
                  style={{ borderRadius: '8px', padding: '10px' }}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '500', color: '#333' }}>Date *</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              isInvalid={!!errors.date}
              style={{ borderRadius: '8px', padding: '10px' }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '500', color: '#333' }}>Description (optionnel)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ajouter une note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ borderRadius: '8px', padding: '10px' }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              backgroundColor: '#635bff',
              borderColor: '#635bff',
              borderRadius: '8px',
              padding: '12px',
              fontWeight: '500'
            }}
          >
            Ajouter la dépense
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
