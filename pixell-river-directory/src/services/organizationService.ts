import type { Role } from '../types/Role';
import organizationRepo from '../repositories/organizationRepo';

export interface RoleValidationResult {
  success: boolean;
  errors: {
    firstName?: string;
    role?: string;
  };
}

export interface CreateRoleInput {
  firstName: string;
  lastName: string;
  role: string;
}

const organizationService = {
  /**
   * Validates and creates a new organization role record.
   * Returns the created role on success, or validation errors on failure.
   */
  createRole(
    input: CreateRoleInput
  ): { role?: Role; validation: RoleValidationResult } {
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

  /**
   * Validates the role data before creation.
   *  - First name must be at least 3 characters.
   *  - A person cannot be created for a role that is already occupied.
   */
  validateRole(input: CreateRoleInput): RoleValidationResult {
    const errors: RoleValidationResult['errors'] = {};

    if (input.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    if (organizationRepo.isRoleOccupied(input.role)) {
      errors.role = 'This role is already occupied.';
    }

    return {
      success: Object.keys(errors).length === 0,
      errors,
    };
  },

  /**
   * Retrieves all organization role records from the repository.
   */
  getRoles(): Role[] {
    return organizationRepo.getRoles();
  },
};

export default organizationService;
