import { useState, useCallback } from 'react';
import { FormErrors, ValidationResult } from '../utils/validation';

interface UseFormValidationProps {
  initialValues: Record<string, any>;
  validationRules: Record<string, (value: any, formData?: Record<string, any>) => ValidationResult>;
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
}

export const useFormValidation = ({ initialValues, validationRules, onSubmit }: UseFormValidationProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validate a single field
   */
  const validateField = useCallback((fieldName: string, value: any, currentFormData?: Record<string, any>) => {
    const validator = validationRules[fieldName];
    if (!validator) return { isValid: true, message: '' };
    
    return validator(value, currentFormData || values);
  }, [validationRules, values]);

  /**
   * Handle input change with real-time validation
   */
  const handleChange = useCallback((fieldName: string, value: any) => {
    const newValues = { ...values, [fieldName]: value };
    setValues(newValues);

    // Real-time validation for touched fields
    if (touched[fieldName]) {
      const validation = validateField(fieldName, value, newValues);
      setErrors(prev => ({
        ...prev,
        [fieldName]: validation.isValid ? '' : validation.message
      }));
    }
  }, [values, touched, validateField]);

  /**
   * Handle field blur - mark as touched and validate
   */
  const handleBlur = useCallback((fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const validation = validateField(fieldName, values[fieldName]);
    setErrors(prev => ({
      ...prev,
      [fieldName]: validation.isValid ? '' : validation.message
    }));
  }, [values, validateField]);

  /**
   * Validate entire form
   */
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const validation = validateField(fieldName, values[fieldName], values);
      if (!validation.isValid) {
        newErrors[fieldName] = validation.message;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return isValid;
  }, [validationRules, validateField, values]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitting(true);
    
    try {
      const isValid = validateForm();
      
      if (isValid) {
        await onSubmit(values);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, onSubmit, values]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Check if field has error and is touched
   */
  const getFieldError = useCallback((fieldName: string) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : '';
  }, [touched, errors]);

  /**
   * Check if field is valid
   */
  const isFieldValid = useCallback((fieldName: string) => {
    return touched[fieldName] && !errors[fieldName];
  }, [touched, errors]);

  /**
   * Check if form is valid
   */
  const isFormValid = useCallback(() => {
    return Object.keys(validationRules).every(fieldName => {
      const validation = validateField(fieldName, values[fieldName], values);
      return validation.isValid;
    });
  }, [validationRules, validateField, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldError,
    isFieldValid,
    isFormValid,
    validateForm
  };
};