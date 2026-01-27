import { useState, useEffect } from 'react';
import Page from './components/Page';
import Main from './components/Main';
import { Employee } from './types/Employee';
import employeesData from './data/employees.json';
import './App.css';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setEmployees(employeesData);
    setFilteredEmployees(employeesData);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(lowercaseQuery) ||
        employee.position.toLowerCase().includes(lowercaseQuery) ||
        employee.department.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <Page onSearch={handleSearch}>
      <Main employees={filteredEmployees} />
    </Page>
  );
}

export default App;
