import type { Employee } from '../types/Employee';
import employeeRepo from '../repositories/employeeRepo';
import type { Department } from '../types/Department';

export interface ValidationResult {
  success: boolean;
  errors: {
    firstName?: string;
    department?: string;
  };
}

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

const employeeService = {
  /**
   * Validates and creates a new employee.
   * Returns the created employee on success, or validation errors on failure.
   */
  createEmployee(
    input: CreateEmployeeInput
  ): { employee?: Employee; validation: ValidationResult } {
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

  /**
   * Validates the employee data before creation.
   *  - First name must be at least 3 characters.
   *  - Department must exist in the repository.
   */
  validateEmployee(input: CreateEmployeeInput): ValidationResult {
    const errors: ValidationResult['errors'] = {};

    if (input.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    if (!employeeRepo.departmentExists(input.department)) {
      errors.department = 'Department does not exist.';
    }

    return {
      success: Object.keys(errors).length === 0,
      errors,
    };
  },

  /**
   * Retrieves all employees from the repository.
   */
  getEmployees(): Employee[] {
    return employeeRepo.getEmployees();
  },

  /**
   * Retrieves employees grouped by department from the repository.
   */
  getEmployeesByDepartment(): Record<string, Employee[]> {
    return employeeRepo.getEmployeesByDepartment();
  },

  /**
   * Retrieves all departments from the repository.
   */
  getDepartments(): Department[] {
    return employeeRepo.getDepartments();
  },

};

export default employeeService;
