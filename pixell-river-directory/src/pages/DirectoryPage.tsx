import { useCallback, useMemo, useState } from 'react';
import Page from '../components/Page';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';
import employeeService from '../services/employeeService';

export default function DirectoryPage() {
  const [employees, setEmployees] = useState(employeeService.getEmployees());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employees;

    const q = searchQuery.toLowerCase();
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.position.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
    );
  }, [employees, searchQuery]);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleEmployeeAdded = useCallback(() => {
    setEmployees(employeeService.getEmployees());
  }, []);

  return (
    <Page
      onSearch={handleSearch}
      title="Employee Directory"
      subtitle="Find contact information for all staff members."
    >
      <Main employees={filteredEmployees} />
      <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
    </Page>
  );
}
