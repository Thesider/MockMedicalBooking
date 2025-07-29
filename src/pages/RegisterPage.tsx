import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { RegisterFormData } from '../types';
import styles from '../styles/Components.module.css';

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [registerError, setRegisterError] = React.useState('');
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setRegisterError('');
    const success = await registerUser(data);
    
    if (success) {
      navigate('/patient/dashboard');
    } else {
      setRegisterError('Email already exists. Please use a different email address.');
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First Name</label>
                <input
                  type="text"
                  {...register('firstName', { required: 'First name is required' })}
                  className={styles.formInput}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className={styles.formError}>{errors.firstName.message}</p>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Name</label>
                <input
                  type="text"
                  {...register('lastName', { required: 'Last name is required' })}
                  className={styles.formInput}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className={styles.formError}>{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={styles.formInput}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className={styles.formError}>{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone Number</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                className={styles.formInput}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className={styles.formError}>{errors.phone.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date of Birth</label>
              <input
                type="date"
                {...register('dateOfBirth', { required: 'Date of birth is required' })}
                className={styles.formInput}
              />
              {errors.dateOfBirth && (
                <p className={styles.formError}>{errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className={styles.formInput}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className={styles.formError}>{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  className={styles.formInput}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={styles.formError}>{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Error Message */}
            {registerError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{registerError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`${styles.button} ${styles.buttonPrimary} w-full ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
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