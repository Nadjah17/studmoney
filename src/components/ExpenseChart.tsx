import React from 'react';
import { Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { Expense } from '../types';
import { expenseCategories } from '../utils/categories';
import { formatCurrency } from '../utils/currency';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseChartProps {
  expenses: Expense[];
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Calculate totals by category
  const categoryTotals: { [key: string]: number } = {};
  
  expenseCategories.forEach((category) => {
    categoryTotals[category] = 0;
  });

  expenses.forEach((expense) => {
    if (categoryTotals.hasOwnProperty(expense.category)) {
      categoryTotals[expense.category] += expense.amount;
    }
  });

  // Filter out categories with 0 spending
  const categoriesWithSpending = expenseCategories.filter(
    (cat) => categoryTotals[cat] > 0
  );

  if (categoriesWithSpending.length === 0) {
    return (
      <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
        <Card.Body className="p-4">
          <h4 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>
            Répartition des dépenses
          </h4>
          <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
            Aucune donnée à afficher
          </p>
        </Card.Body>
      </Card>
    );
  }

  // Color palette
  const colors = [
    '#635bff',
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#f9ca24',
    '#f0932b',
    '#eb4d4b',
  ];

  const data = {
    labels: categoriesWithSpending,
    datasets: [
      {
        label: 'Montant (FCFA)',
        data: categoriesWithSpending.map((cat) => categoryTotals[cat]),
        backgroundColor: categoriesWithSpending.map((_, index) => colors[index % colors.length]),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { label: string; parsed: number }) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = categoriesWithSpending.reduce(
              (sum, cat) => sum + categoryTotals[cat],
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
      <Card.Body className="p-4">
        <h4 className="mb-4" style={{ fontWeight: '600', color: '#333' }}>
          Répartition des dépenses
        </h4>
        <div style={{ height: '300px', position: 'relative' }}>
          <Pie data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};
