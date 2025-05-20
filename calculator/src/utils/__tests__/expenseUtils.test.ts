import { getSortedExpenses, getFilteredExpenses } from './expenseUtils';

const expenses = [
  { id: '1', description: 'A', amount: 100, category: 'food', date: '2024-05-01' },
  { id: '2', description: 'B', amount: 200, category: 'food', date: '2024-05-02' },
  { id: '3', description: 'C', amount: 50, category: 'transport', date: '2024-05-03' },
];

describe('getSortedExpenses', () => {
  it('sorts by date descending', () => {
    const sorted = getSortedExpenses(expenses, 'date_desc');
    expect(sorted[0].id).toBe('3');
    expect(sorted[2].id).toBe('1');
  });

  it('sorts by date ascending', () => {
    const sorted = getSortedExpenses(expenses, 'date_asc');
    expect(sorted[0].id).toBe('1');
    expect(sorted[2].id).toBe('3');
  });

  it('sorts by amount descending', () => {
    const sorted = getSortedExpenses(expenses, 'amount_desc');
    expect(sorted[0].id).toBe('2');
    expect(sorted[2].id).toBe('3');
  });

  it('sorts by amount ascending', () => {
    const sorted = getSortedExpenses(expenses, 'amount_asc');
    expect(sorted[0].id).toBe('3');
    expect(sorted[2].id).toBe('2');
  });
});

describe('getFilteredExpenses', () => {
  it('filters by category', () => {
    const filtered = getFilteredExpenses(expenses, 'food');
    expect(filtered.length).toBe(2);
    expect(filtered.every(e => e.category === 'food')).toBe(true);
  });

  it('returns all if category is all', () => {
    const filtered = getFilteredExpenses(expenses, 'all');
    expect(filtered.length).toBe(3);
  });

  it('returns all if category is empty', () => {
    const filtered = getFilteredExpenses(expenses, '');
    expect(filtered.length).toBe(3);
  });
}); 