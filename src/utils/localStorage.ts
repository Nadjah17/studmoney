import type { Expense, Budget } from '../types';
import { formatCurrency } from './currency';

const EXPENSES_KEY = 'studmoney_expenses';
const BUDGET_KEY = 'studmoney_budget';

export const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
};

export const loadExpenses = (): Expense[] => {
  const storedExpenses = localStorage.getItem(EXPENSES_KEY);
  return storedExpenses ? JSON.parse(storedExpenses) : [];
};

export const saveBudget = (budget: Budget) => {
  localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
};

export const loadBudget = (): Budget | null => {
  const storedBudget = localStorage.getItem(BUDGET_KEY);
  return storedBudget ? JSON.parse(storedBudget) : null;
};

export const exportExpensesToJSON = (expenses: Expense[]): void => {
  const dataStr = JSON.stringify(expenses, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `studmoney-expenses-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportReportToPDF = (expenses: Expense[], budget: Budget): void => {
  // Mock PDF export - creates a text-based report that can be printed
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthExpenses = expenses.filter((exp) => new Date(exp.date) >= monthStart);
  const totalSpent = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = budget.totalBudget - totalSpent;

  const report = `
STUDMONEY - RAPPORT BUDGÉTAIRE
Date: ${now.toLocaleDateString('fr-FR')}

BUDGET
Budget total: ${formatCurrency(budget.totalBudget)}
Dépensé ce mois: ${formatCurrency(totalSpent)}
Budget restant: ${formatCurrency(remaining)}
Pourcentage utilisé: ${((totalSpent / budget.totalBudget) * 100).toFixed(1)}%

DÉPENSES DU MOIS (${monthExpenses.length} transactions)
${monthExpenses.map((exp, idx) => `
${idx + 1}. ${exp.title}
   Montant: ${formatCurrency(exp.amount)}
   Catégorie: ${exp.category}
   Date: ${new Date(exp.date).toLocaleDateString('fr-FR')}
   ${exp.description ? `Description: ${exp.description}` : ''}
`).join('')}

---
Généré par StudMoney
  `.trim();

  const dataBlob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `studmoney-report-${now.toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};