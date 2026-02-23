import { useState } from 'react';

/**
 * Custom hook to manage a single form input's value and validation message.
 *
 * @param initialValue - The starting value of the input (defaults to '').
 */
export default function useFormInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);
  const [message, setMessage] = useState('');

  /**
   * Handles changes to the input element.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue(e.target.value);
    // Clear the message when the user starts typing again
    if (message) {
      setMessage('');
    }
  };

  /**
   * Validates the current value using a provided callback.
   * The callback receives the current value and should return an error
   * message string (empty string means valid).
   *
   * Updates the message state and returns true if valid, false otherwise.
   */
  const validate = (validationFn: (val: string) => string): boolean => {
    const errorMessage = validationFn(value);
    setMessage(errorMessage);
    return errorMessage === '';
  };

  /**
   * Resets the input value and message back to their defaults.
   */
  const reset = () => {
    setValue(initialValue);
    setMessage('');
  };

  return {
    value,
    setValue,
    message,
    setMessage,
    handleChange,
    validate,
    reset,
  };
}
