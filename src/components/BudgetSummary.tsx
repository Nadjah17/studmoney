import React from 'react';
import { Card, Row, Col, Alert, Badge } from 'react-bootstrap';
import type { Expense, Budget } from '../types';
import { formatCurrency } from '../utils/currency';

interface BudgetSummaryProps {
  expenses: Expense[];
  budget: Budget;
  onUpdateBudget: (budget: Budget) => void;
}

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({ expenses, budget }) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const filterExpensesByDate = (startDate: Date): Expense[] => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate;
    });
  };

  const todayExpenses = filterExpensesByDate(today);
  const weekExpenses = filterExpensesByDate(weekStart);
  const monthExpenses = filterExpensesByDate(monthStart);

  const calculateTotal = (expenseList: Expense[]): number => {
    return expenseList.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const todayTotal = calculateTotal(todayExpenses);
  const weekTotal = calculateTotal(weekExpenses);
  const monthTotal = calculateTotal(monthExpenses);
  const remainingBudget = budget.totalBudget - monthTotal;
  const budgetUsagePercent = (monthTotal / budget.totalBudget) * 100;

  const getBudgetAlert = (): { variant: string; message: string } | null => {
    if (budgetUsagePercent >= 100) {
      return {
        variant: 'danger',
        message: '⚠️ Budget dépassé! Vous avez dépensé plus que prévu ce mois-ci.',
      };
    } else if (budgetUsagePercent >= budget.alertThreshold) {
      return {
        variant: 'warning',
        message: `⚠️ Attention: Vous avez utilisé ${budgetUsagePercent.toFixed(1)}% de votre budget ce mois-ci.`,
      };
    }
    return null;
  };

  const getBudgetTip = (): string => {
    if (budgetUsagePercent >= 100) {
      return 'Essayez de réduire vos dépenses non essentielles ce mois-ci.';
    } else if (budgetUsagePercent >= budget.alertThreshold) {
      return 'Vous approchez de votre limite. Surveillez vos dépenses.';
    } else if (budgetUsagePercent >= 50) {
      return 'Vous êtes à mi-parcours. Continuez à bien gérer votre budget!';
    } else {
      return 'Excellent! Vous gérez bien votre budget. Continuez ainsi!';
    }
  };

  const budgetAlert = getBudgetAlert();

  return (
    <>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="mb-3" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <Card.Body className="p-4">
              <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '8px' }}>
                Aujourd'hui
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                {formatCurrency(todayTotal)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <Card.Body className="p-4">
              <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '8px' }}>
                Cette semaine
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                {formatCurrency(weekTotal)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <Card.Body className="p-4">
              <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '8px' }}>
                Ce mois
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                {formatCurrency(monthTotal)}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 style={{ fontWeight: '600', color: '#333', margin: 0 }}>
              Budget restant
            </h4>
            <Badge
              bg={budgetUsagePercent >= 100 ? 'danger' : budgetUsagePercent >= budget.alertThreshold ? 'warning' : 'success'}
              style={{ fontSize: '0.9rem', padding: '6px 12px' }}
            >
              {budgetUsagePercent.toFixed(1)}% utilisé
            </Badge>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: remainingBudget < 0 ? '#dc3545' : '#635bff', marginBottom: '10px' }}>
            {formatCurrency(remainingBudget)}
          </div>
          <div style={{ color: '#999', fontSize: '0.9rem' }}>
            Budget total: {formatCurrency(budget.totalBudget)}
          </div>

          {budgetAlert && (
            <Alert variant={budgetAlert.variant} className="mt-3 mb-0" style={{ borderRadius: '8px' }}>
              {budgetAlert.message}
            </Alert>
          )}

          <div className="mt-3 p-3" style={{ backgroundColor: '#f4f6fb', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              💡 <strong>Conseil:</strong> {getBudgetTip()}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
