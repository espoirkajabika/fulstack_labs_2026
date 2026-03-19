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
  getEmployees(): Employee[] {
    return employeeRepo.getEmployees();
  },

  getDepartments(): Department[] {
    return employeeRepo.getDepartments();
  },

  getEmployeesByDepartment(): Record<string, Employee[]> {
    return employeeRepo.getEmployeesByDepartment();
  },

  createEmployee(input: CreateEmployeeInput): { employee?: Employee; validation: ValidationResult } {
    const validation = this.validateEmployee(input);
    if (!validation.success) {
      return { validation };
    }
    const employee = employeeRepo.createEmployee({
      name: `${input.firstName} ${input.lastName}`,
      position: input.position,
      department: input.department,
      email: input.email,
      phone: input.phone,
    });
    return { employee, validation };
  },

  validateEmployee(input: CreateEmployeeInput): ValidationResult {
    const errors: ValidationResult['errors'] = {};
    if (input.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }
    if (!employeeRepo.departmentExists(input.department)) {
      errors.department = 'Department does not exist.';
    }
    return { success: Object.keys(errors).length === 0, errors };
  },
};

export default employeeService;
