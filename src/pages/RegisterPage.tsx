import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { RegisterFormData } from '../types';
import { useFormValidation } from '../hooks/useFormValidation';
import { validateEmail, validatePassword, validateConfirmPassword, validateRequired, validatePhone, validateAge } from '../utils/validation';
import FormField from '../components/FormField';
import styles from '../styles/Components.module.css';

const RegisterPage: React.FC = () => {
  const [registerError, setRegisterError] = React.useState('');
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: ''
  };

  const validationRules = {
    firstName: (value: string) => validateRequired(value, 'First name'),
    lastName: (value: string) => validateRequired(value, 'Last name'),
    email: validateEmail,
    password: validatePassword,
    confirmPassword: (value: string, formData: any) => validateConfirmPassword(formData?.password || '', value),
    phone: validatePhone,
    dateOfBirth: validateAge
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldError,
    isFieldValid,
    isFormValid
  } = useFormValidation({
    initialValues,
    validationRules,
    onSubmit: async (data) => {
      setRegisterError('');
      const success = await registerUser(data as RegisterFormData);
      
      if (success) {
        navigate('/patient/dashboard');
      } else {
        setRegisterError('Email already exists. Please use a different email address.');
      }
    }
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <Heart className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MediCare</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join MediCare for better healthcare</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="First Name"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getFieldError('firstName')}
                isValid={isFieldValid('firstName')}
                placeholder="First name"
                required
              />
              <FormField
                label="Last Name"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getFieldError('lastName')}
                isValid={isFieldValid('lastName')}
                placeholder="Last name"
                required
              />
            </div>

            {/* Email */}
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('email')}
              isValid={isFieldValid('email')}
              placeholder="Enter your email"
              required
            />

            {/* Phone */}
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('phone')}
              isValid={isFieldValid('phone')}
              placeholder="+1 (555) 123-4567"
              required
            />

            {/* Date of Birth */}
            <FormField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('dateOfBirth')}
              isValid={isFieldValid('dateOfBirth')}
              required
            />

            {/* Password */}
            <FormField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('password')}
              isValid={isFieldValid('password')}
              placeholder="Create a password"
              showPasswordToggle
              required
            />

            {/* Confirm Password */}
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('confirmPassword')}
              isValid={isFieldValid('confirmPassword')}
              placeholder="Confirm your password"
              showPasswordToggle
              required
            />

            {/* Error Message */}
            {registerError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{registerError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`${styles.button} ${styles.buttonPrimary} w-full ${
                (isLoading || !isFormValid()) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;