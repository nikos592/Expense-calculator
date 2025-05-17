import './App.css';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseList from './components/ExpenseList/ExpenseList';
import { ExpenseProvider } from './contexts/ExpenseContext';

function App() {
  return (
    <ExpenseProvider>
      <div className="App">
        <h1>Калькулятор затрат</h1>
        <ExpenseForm />
        <ExpenseList />
      </div>
    </ExpenseProvider>
  );
}

export default App;
