import type { Employee } from '../types/Employee';
import type { Department } from '../types/Department';

const API_BASE = 'http://localhost:3001/api';

const employeeRepo = {
  async getEmployees(): Promise<Employee[]> {
    const res = await fetch(`${API_BASE}/employees`);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
  },

  async getDepartments(): Promise<Department[]> {
    const res = await fetch(`${API_BASE}/employees/departments`);
    if (!res.ok) throw new Error('Failed to fetch departments');
    return res.json();
  },

  async createEmployee(data: Omit<Employee, 'id'>): Promise<Employee> {
    const nameParts = data.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    const res = await fetch(`${API_BASE}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, position: data.position, department: data.department, email: data.email, phone: data.phone }),
    });
    if (!res.ok) throw new Error('Failed to create employee');
    return res.json();
  },

  async departmentExists(departmentName: string): Promise<boolean> {
    const departments = await this.getDepartments();
    return departments.some(
      (d) => d.name.toLowerCase() === departmentName.toLowerCase()
    );
  },
};

export default employeeRepo;
