import { useCallback, useEffect, useMemo, useState } from 'react';
import Page from '../components/Page';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';
import employeeService from '../services/employeeService';
import type { Employee } from '../types/Employee';

export default function DirectoryPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    employeeService.getEmployees().then(setEmployees);
  }, []);

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
    employeeService.getEmployees().then(setEmployees);
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
