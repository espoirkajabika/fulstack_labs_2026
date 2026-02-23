import { useCallback, useMemo, useState } from 'react';
import Page from '../components/Page';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';
import employeeService from '../services/employeeService';

export default function DirectoryPage() {
  // State is only for presentation: the list we render and the search filter.
  // The actual data lives in the repository; we pull it through the service.
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

  /**
   * Called by the form after a successful creation.
   * Re-fetches the employee list from the service/repo to keep state in sync.
   */
  const handleEmployeeAdded = useCallback(() => {
    setEmployees(employeeService.getEmployees());
  }, []);

  return (
    <Page onSearch={handleSearch}>
      <Main employees={filteredEmployees} />
      <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
    </Page>
  );
}
