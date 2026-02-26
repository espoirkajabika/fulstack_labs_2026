import useFormInput from '../hooks/useFormInput';
import organizationService from '../services/organizationService';

interface AddRoleFormProps {
  onRoleAdded: () => void;
}

const AddRoleForm: React.FC<AddRoleFormProps> = ({ onRoleAdded }) => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const role = useFormInput('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { role: createdRole, validation } = organizationService.createRole({
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });

    if (!validation.success) {
      if (validation.errors.firstName) {
        firstName.setMessage(validation.errors.firstName);
      }
      if (validation.errors.role) {
        role.setMessage(validation.errors.role);
      }
      return;
    }

    if (createdRole) {
      firstName.reset();
      lastName.reset();
      role.reset();

      onRoleAdded();
    }
  };

  return (
    <section className="add-employee-form">
      <h2>Add New Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roleFirstName">First Name</label>
          <input
            type="text"
            id="roleFirstName"
            value={firstName.value}
            onChange={firstName.handleChange}
            placeholder="First name (min. 3 characters)"
          />
          {firstName.message && (
            <span className="field-error">{firstName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="roleLastName">Last Name</label>
          <input
            type="text"
            id="roleLastName"
            value={lastName.value}
            onChange={lastName.handleChange}
            placeholder="Last name"
          />
          {lastName.message && (
            <span className="field-error">{lastName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="roleName">Role</label>
          <input
            type="text"
            id="roleName"
            value={role.value}
            onChange={role.handleChange}
            placeholder="Role title"
          />
          {role.message && (
            <span className="field-error">{role.message}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Add Role
        </button>
      </form>
    </section>
  );
};

export default AddRoleForm;
