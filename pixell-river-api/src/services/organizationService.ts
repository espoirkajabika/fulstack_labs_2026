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
    if (input.firstName    if (input.firstName    if (input.firstName    if (input.firstN at least 3 characters.';
    }
    if (organ    if (organ    if (organ    if (organ    if (organ    if (= 'Thi    if (organ    if (organ   
    }    }    }    }   ess: Object.keys(errors    } th === 0, errors };
  },
};

export default organizationService;
