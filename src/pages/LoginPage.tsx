import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoginFormData } from '../types';
import styles from '../styles/Components.module.css';

const ADMIN_EMAIL = "admin@medicare.com";
const ADMIN_PASSWORD = "admin123";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [mode, setMode] = React.useState<'patient' | 'admin'>('patient');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/patient/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');
    if (mode === 'admin') {
      if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
        localStorage.setItem('admin', 'true');
        navigate('/admin/dashboard');
      } else {
        setLoginError('Invalid admin credentials. Please try again.');
      }
    } else {
      const success = await login(data.email, data.password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setLoginError('Invalid email or password. Please try again.');
      }
    }
  };

  const handleModeSwitch = (newMode: 'patient' | 'admin') => {
    setMode(newMode);
    setLoginError('');
    reset();
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
          <div className="flex justify-center mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-lg border ${mode === 'patient' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => handleModeSwitch('patient')}
            >
              Patient
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-lg border-t border-b border-r ${mode === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => handleModeSwitch('admin')}
            >
              Admin
            </button>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">
            {mode === 'admin' ? 'Sign in to your admin account' : 'Sign in to your patient account'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  className={styles.formInput}
                  placeholder="Enter your password"
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

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{loginError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`${styles.button} ${styles.buttonPrimary} w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              {mode === 'admin' ? (
                <>
                  <p><strong>Email:</strong> admin@medicare.com</p>
                  <p><strong>Password:</strong> admin123</p>
                </>
              ) : (
                <>
                  <p><strong>Email:</strong> john.doe@email.com</p>
                  <p><strong>Password:</strong> password123</p>
                </>
              )}
            </div>
          </div>

          {/* Register Link */}
          {mode === 'patient' && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          )}

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

export default LoginPage;
