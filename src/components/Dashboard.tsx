import React from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import type { Expense, Budget } from '../types';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { ExpenseChart } from './ExpenseChart';
import { BudgetSummary } from './BudgetSummary';
import { exportExpensesToJSON, exportReportToPDF } from '../utils/localStorage';

interface DashboardProps {
  expenses: Expense[];
  budget: Budget;
  onAddExpense: (expense: Expense) => void;
  onUpdateBudget: (budget: Budget) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  expenses,
  budget,
  onAddExpense,
  onUpdateBudget,
}) => {
  const handleExportJSON = () => {
    exportExpensesToJSON(expenses);
  };

  const handleExportPDF = () => {
    exportReportToPDF(expenses, budget);
  };

  return (
    <div className="dashboard" style={{ minHeight: '100vh', backgroundColor: '#f4f6fb' }}>
      <Container fluid className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ fontWeight: 'bold', color: '#333', fontSize: '2.5rem', margin: 0 }}>
            Tableau de bord
          </h1>
          <ButtonGroup>
            <Button
              variant="outline-primary"
              onClick={handleExportJSON}
              style={{
                borderRadius: '8px 0 0 8px',
                borderColor: '#635bff',
                color: '#635bff'
              }}
            >
              📥 Exporter JSON
            </Button>
            <Button
              variant="outline-primary"
              onClick={handleExportPDF}
              style={{
                borderRadius: '0 8px 8px 0',
                borderColor: '#635bff',
                color: '#635bff'
              }}
            >
              📄 Exporter Rapport
            </Button>
          </ButtonGroup>
        </div>

        <Row>
          {/* Left Column - Budget Summary and Chart */}
          <Col lg={8}>
            <BudgetSummary
              expenses={expenses}
              budget={budget}
              onUpdateBudget={onUpdateBudget}
            />
            <ExpenseChart expenses={expenses} />
          </Col>

          {/* Right Column - Expense Form and Recent Expenses */}
          <Col lg={4}>
            <ExpenseForm onAddExpense={onAddExpense} />
            <ExpenseList expenses={expenses} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
