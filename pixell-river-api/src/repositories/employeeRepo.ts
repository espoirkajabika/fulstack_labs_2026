import type { Employee } from '../types/Employee';
import type { Department } from '../types/Department';
import employeesData from '../data/employees.json';
import departmentsData from '../data/departments.json';

let employees: Employee[] = [...employeesData];
let departments: Department[] = [...departmentsData];
let nextId: number =
  employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;

const employeeRepo = {
  getEmployees(): Employee[] {
    return [...employees];
  },

  getDepartments(): Department[] {
    return [...departments];
  },

  getEmployeesByDepartment(): Record<string, Employee[]> {
    const grouped: Record<string, Employee[]> = {};
    for (const dept of departments) {
      grouped[dept.name] = [];
    }
    for (const emp of employees) {
      if (!grouped[emp.department]) {
        grouped[emp.department] = [];
      }
      grouped[emp.department].push({ ...emp });
    }
    return grouped;
  },

  createEmployee(data: Omit<Employee, 'id'>): Employee {
    const newEmployee: Employee = { id: nextId++, ...data };
    employees = [...employees, newEmployee];
    return { ...newEmployee };
  },

  departmentExists(departmentName: string): boolean {
    return departments.some(
      (d) => d.name.toLowerCase() === departmentName.toLowerCase()
    );
  },
};

export default employeeRepo;
