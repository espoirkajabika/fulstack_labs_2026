import useFormInput from '../hooks/useFormInput';
import organizationService from '../services/organizationService';

interface AddRoleFormProps {
  onRoleAdded: () => void;
}

const AddRoleForm: React.FC<AddRoleFormProps> = ({ onRoleAdded }) => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const role = useFormInput('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await organizationService.createRole({
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });

    if (!result.validation.success) {
      if (result.validation.errors.firstName) {
        firstName.setMessage(result.validation.errors.firstName);
      }
      if (result.validation.errors.role) {
        role.setMessage(result.validation.errors.role);
      }
      return;
    }

    if (result.role) {
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
