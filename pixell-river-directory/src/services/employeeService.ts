import type { Employee } from '../types/Employee';
import type { Department } from '../types/Department';
import employeeRepo from '../repositories/employeeRepo';

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

export interface ValidationResult {
  success: boolean;
  errors: {
    firstName?: string;
    department?: string;
  };
}

const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    return employeeRepo.getEmployees();
  },

  async getDepartments(): Promise<Department[]> {
    return employeeRepo.getDepartments();
  },

  async createEmployee(input: CreateEmployeeInput): Promise<{ employee?: Employee; validation: ValidationResult }> {
    const errors: ValidationResult['errors'] = {};

    if (input.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    const deptExists = await employeeRepo.departmentExists(input.department);
    if (!deptExists) {
      errors.department = 'Department does not exist.';
    }

    if (Object.keys(errors).length > 0) {
      return { validation: { success: false, errors } };
    }

    const employee = await employeeRepo.createEmployee({
      name: `${input.firstName} ${input.lastName}`,
      position: input.position,
      department: input.department,
      email: input.email,
      phone: input.phone,
    });

    return { employee, validation: { success: true, errors: {} } };
  },
};

export default employeeService;
