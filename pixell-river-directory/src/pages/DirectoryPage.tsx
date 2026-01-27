import { useEffect, useMemo, useState } from 'react';
import Page from '../components/Page';
import Main from '../components/Main';
import type { Employee } from '../types/Employee';
import employeesData from '../data/employees.json';

// If you already built Lab 2.1 form, import it here:
// import AddEmployeeForm from '../components/AddEmployeeForm';

export default function DirectoryPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setEmployees(employeesData);
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

  return (
    <Page onSearch={handleSearch}>
      <Main employees={filteredEmployees} />

      {/* Lab 2.1: keep your Add Employee form at the bottom here */}
      {/* <AddEmployeeForm ... /> */}
    </Page>
  );
}
