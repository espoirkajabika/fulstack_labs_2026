import { useCallback, useEffect, useState } from 'react';
import Page from '../components/Page';
import RoleCard from '../components/RoleCard';
import AddRoleForm from '../components/AddRoleForm';
import organizationService from '../services/organizationService';
import type { Role } from '../types/Role';

export default function OrganizationPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    organizationService.getRoles().then(setRoles);
  }, []);

  const handleRoleAdded = useCallback(() => {
    organizationService.getRoles().then(setRoles);
  }, []);

  return (
    <Page
      onSearch={() => {}}
      title="Organization"
      subtitle="View and manage roles across the company."
    >
      <main id="employee-list">
        {roles.length === 0 ? (
          <p className="no-results">No roles found.</p>
        ) : (
          roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))
        )}
      </main>
      <AddRoleForm onRoleAdded={handleRoleAdded} />
    </Page>
  );
}
