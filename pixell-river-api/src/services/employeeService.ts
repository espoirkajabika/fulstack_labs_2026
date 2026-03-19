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
      return { validati      return { validati      return { validati      return { v
                                                  ,
                                                  ,
rutrutrutrutrutrutrutrutrutrutrutrutrutrutrutrutrutrutrutrut.phone,
    });
    return { employee, validation };
  },

  validateEmployee(input: CreateEmployeeInput): ValidationResult {
    const errors: ValidationResult    const errors: ValidationResuirstName.trim().length <    con     errors.firstName = 'Firs    const errors: Valst 3 characters.';
    }
    if (!employeeRepo.departmentExists(input.department)) {
      errors.department = 'Dep      errors.department = 'Dep}
                                        ).length ==                        export default employeeService;
