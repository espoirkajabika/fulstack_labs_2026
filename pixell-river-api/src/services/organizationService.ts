import type { Role } from '../types/Role';
import organizationRepo from '../repositories/organizationRepo';

export interface CreateRoleInput {
  firstName: string;
  lastName: string;
  role: string;
}

export interface RoleValidationResult {
  success: boolean;
  errors: {
    firstName?: string;
    role?: string;
  };
}

const organizationService = {
  getRoles(): Role[] {
    return organizationRepo.getRoles();
  },

  createRole(input: CreateRoleInput): { role?: Role; validation: RoleValidationResult } {
    const validation = this.validateRole(input);
    if (!validation.success) {
      return { validation };
    }
    const role = organizationRepo.createRole({
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role,
    });
    return { role, validation };
  },

  validateRole(input: CreateRoleInput): RoleValidationResult {
    const errors: RoleValidationResult['errors'] = {};
    if (input.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }
    if (organizationRepo.isRoleOccupied(input.role)) {
      errors.role = 'This role is already occupied.';
    }
    return { success: Object.keys(errors).length === 0, errors };
  },
};

export default organizationService;
