import { useCallback, useState } from 'react';
import Page from '../components/Page';
import RoleCard from '../components/RoleCard';
import AddRoleForm from '../components/AddRoleForm';
import organizationService from '../services/organizationService';

export default function OrganizationPage() {
  const [roles, setRoles] = useState(organizationService.getRoles());

  const handleRoleAdded = useCallback(() => {
    setRoles(organizationService.getRoles());
  }, []);

  return (
    <Page onSearch={() => {}}>
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
