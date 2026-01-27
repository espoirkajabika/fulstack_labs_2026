import type { Employee as EmployeeType } from '../types/Employee';

interface EmployeeProps {
  employee: EmployeeType;
}

const Employee: React.FC<EmployeeProps> = ({ employee }) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p className="position">{employee.position}</p>
      <p className="department">{employee.department}</p>
      <p className="email">
        <strong>Email:</strong> <a href={`mailto:${employee.email}`}>{employee.email}</a>
      </p>
      <p className="phone">
        <strong>Phone:</strong> {employee.phone}
      </p>
    </div>
  );
};

export default Employee;
