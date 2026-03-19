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
  async getRoles(): Promise<Role[]> {
    return organizationRepo.getRoles();
  },

  async createRole(input: CreateRoleInput): Promise<{ role?: Role; validation: RoleValidationResult }> {
    const errors: RoleValidationResult['errors'] = {};

    if (input.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    const occupied = await organizationRepo.isRoleOccupied(input.role);
    if (occupied) {
      errors.role = 'This role is already occupied.';
    }

    if (Object.keys(errors).length > 0) {
      return { validation: { success: false, errors } };
    }

    const role = await organizationRepo.createRole({
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role,
    });

    return { role, validation: { success: true, errors: {} } };
  },
};

export default organizationService;
