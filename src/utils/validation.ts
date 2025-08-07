// Form Validation Utilities
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

/**
 * Email validation - checks for proper email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email.trim()) {
    return { isValid: false, message: 'Email address is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address (e.g., user@domain.com)' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Password validation - minimum 8 characters, uppercase, lowercase, number
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Confirm password validation - must match original password
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Required field validation - cannot be empty or whitespace only
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || !value.trim()) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Phone number validation - supports multiple formats
 */
export const validatePhone = (phone: string): ValidationResult => {
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (!phone.trim()) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  // US phone number format (10 digits)
  if (digitsOnly.length !== 10) {
    return { isValid: false, message: 'Please enter a valid 10-digit phone number' };
  }
  
  // Check for valid US phone number patterns
  const phoneRegex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Please enter a valid phone number (e.g., (555) 123-4567)' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Date validation - no past dates allowed
 */
export const validateFutureDate = (date: string): ValidationResult => {
  if (!date) {
    return { isValid: false, message: 'Date is required' };
  }
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  
  if (selectedDate < today) {
    return { isValid: false, message: 'Please select a future date' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Age validation - must be 18 or older
 */
export const validateAge = (dateOfBirth: string): ValidationResult => {
  if (!dateOfBirth) {
    return { isValid: false, message: 'Date of birth is required' };
  }
  
  const dob = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    // Haven't had birthday this year yet
    if (age - 1 < 18) {
      return { isValid: false, message: 'You must be at least 18 years old' };
    }
  } else if (age < 18) {
    return { isValid: false, message: 'You must be at least 18 years old' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Generic form validator that applies validation rules to form data
 */
export const validateForm = (formData: Record<string, any>, validationRules: Record<string, (value: any) => ValidationResult>): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};
  let isValid = true;
  
  Object.keys(validationRules).forEach(field => {
    const validation = validationRules[field](formData[field]);
    if (!validation.isValid) {
      errors[field] = validation.message;
      isValid = false;
    }
  });
  
  return { isValid, errors };
};