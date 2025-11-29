import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { ExpensesPage } from './components/ExpensesPage';
import type { Expense, Budget } from './types';
import { loadExpenses, loadBudget, saveBudget, saveExpenses } from './utils/localStorage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget>({ totalBudget: 500000, alertThreshold: 80 });
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'settings' | 'expenses'>('dashboard');

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedExpenses = loadExpenses();
    const loadedBudget = loadBudget();
    
    setExpenses(loadedExpenses);
    if (loadedBudget) {
      setBudget(loadedBudget);
    } else {
      // Initialize default budget if none exists (500,000 FCFA)
      const defaultBudget: Budget = { totalBudget: 500000, alertThreshold: 80 };
      setBudget(defaultBudget);
      saveBudget(defaultBudget);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddExpense = (expense: Expense) => {
    const newExpenses = [expense, ...expenses];
    setExpenses(newExpenses);
    saveExpenses(newExpenses);
  };

  const handleUpdateBudget = (newBudget: Budget) => {
    setBudget(newBudget);
    saveBudget(newBudget);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <MainLayout onLogout={handleLogout} currentPage={currentPage} onNavigate={setCurrentPage}>
          {currentPage === 'dashboard' ? (
            <Dashboard 
              expenses={expenses}
              budget={budget}
              onAddExpense={handleAddExpense}
              onUpdateBudget={handleUpdateBudget}
            />
          ) : currentPage === 'expenses' ? (
            <ExpensesPage expenses={expenses} />
          ) : (
            <Settings
              budget={budget}
              onUpdateBudget={handleUpdateBudget}
            />
          )}
        </MainLayout>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
