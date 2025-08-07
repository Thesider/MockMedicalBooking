import React from 'react';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import styles from '../styles/Components.module.css';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'select';
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  error?: string;
  isValid?: boolean;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  showPasswordToggle?: boolean;
  disabled?: boolean;
  'aria-describedby'?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  isValid,
  placeholder,
  required = false,
  options = [],
  showPasswordToggle = false,
  disabled = false,
  'aria-describedby': ariaDescribedBy
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const hasError = Boolean(error);
  const showValidIcon = isValid && !hasError && value;

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const inputClasses = `
    ${styles.formInput}
    ${hasError ? styles.formInputError : ''}
    ${showValidIcon ? styles.formInputValid : ''}
    ${showPasswordToggle ? 'pr-12' : ''}
  `.trim();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(name, e.target.value);
  };

  const handleInputBlur = () => {
    onBlur(name);
  };

  return (
    <div className={styles.formGroup}>
      <label 
        htmlFor={fieldId} 
        className={styles.formLabel}
        aria-label={`${label}${required ? ' (required)' : ''}`}
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>

      <div className="relative">
        {type === 'select' ? (
          <select
            id={fieldId}
            name={name}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : ariaDescribedBy}
            required={required}
          >
            <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fieldId}
            name={name}
            type={inputType}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : ariaDescribedBy}
            required={required}
            autoComplete={type === 'password' ? 'current-password' : 'on'}
          />
        )}

        {/* Password toggle button */}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={0}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {/* Valid indicator */}
        {showValidIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Check className="w-5 h-5 text-green-500" aria-label="Valid input" />
          </div>
        )}

        {/* Error indicator */}
        {hasError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" aria-label="Invalid input" />
          </div>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <div
          id={errorId}
          className={styles.formError}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;