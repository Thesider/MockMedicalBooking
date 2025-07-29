import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, AuthContextType, RegisterFormData } from '../types';
import { patients } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedPatient = localStorage.getItem('patient');
    if (savedPatient) {
      setPatient(JSON.parse(savedPatient));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    const foundPatient = patients.find(p => p.email === email);
    
    if (foundPatient && password === 'password123') { // Mock password check
      setPatient(foundPatient);
      localStorage.setItem('patient', JSON.stringify(foundPatient));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (data: RegisterFormData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists
    const existingPatient = patients.find(p => p.email === data.email);
    if (existingPatient) {
      setIsLoading(false);
      return false;
    }
    
    // Create new patient
    const newPatient: Patient = {
      id: (patients.length + 1).toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      address: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      },
      medicalHistory: [],
      allergies: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setPatient(newPatient);
    localStorage.setItem('patient', JSON.stringify(newPatient));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setPatient(null);
    localStorage.removeItem('patient');
  };

  const value: AuthContextType = {
    patient,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};