import type { Employee as EmployeeType } from '../types/Employee';
import Employee from './Employee';

interface MainProps {
  employees: EmployeeType[];
}

const Main: React.FC<MainProps> = ({ employees }) => {
  return (
    <main id="employee-list">
      {employees.length === 0 ? (
        <p className="no-results">No employees found.</p>
      ) : (
        employees.map((employee) => (
          <Employee key={employee.id} employee={employee} />
        ))
      )}
    </main>
  );
};

export default Main;
