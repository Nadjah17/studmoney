import { Expense } from '../types'

const STORAGE_KEY = 'studmoney_expenses'

export function saveExpenses(expenses: Expense[]): void {
  const serialized = JSON.stringify(expenses)
  localStorage.setItem(STORAGE_KEY, serialized)
}

export function loadExpenses(): Expense[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) {
    return []
  }
  try {
    return JSON.parse(saved) as Expense[]
  } catch {
    return []
  }
}
