import type { Employee } from '../types/Employee';
import type { Department } from '../types/Department';
import employeesData from '../data/employees.json';
import departmentsData from '../data/departments.json';

// In-memory data store — the single source of truth
let employees: Employee[] = [...employeesData];
let departments: Department[] = [...departmentsData];
let nextId: number = employees.length > 0
  ? Math.max(...employees.map((e) => e.id)) + 1
  : 1;

const employeeRepo = {
  /**
   * Returns all employees.
   */
  getEmployees(): Employee[] {
    return [...employees];
  },

  /**
   * Returns all departments.
   */
  getDepartments(): Department[] {
    return [...departments];
  },

  /**
   * Returns employees grouped by their department.
   */
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

  /**
   * Creates a new employee and adds it to the in-memory store.
   * Returns the newly created employee with an assigned id.
   */
  createEmployee(employeeData: Omit<Employee, 'id'>): Employee {
    const newEmployee: Employee = {
      id: nextId++,
      ...employeeData,
    };

    employees = [...employees, newEmployee];
    return { ...newEmployee };
  },

  /**
   * Checks whether a department with the given name exists.
   */
  departmentExists(departmentName: string): boolean {
    return departments.some(
      (d) => d.name.toLowerCase() === departmentName.toLowerCase()
    );
  },
};

export default employeeRepo;
