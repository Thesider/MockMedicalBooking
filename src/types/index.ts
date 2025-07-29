export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  photo: string;
  availability: string[];
  email: string;
  phone: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  status: 'scheduled' | 'checked-in' | 'completed' | 'cancelled';
  reservationCode: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  doctorId: string;
  date: string;
  timeSlot: string;
}

export interface CheckInData {
  type: 'qr' | 'code';
  value: string;
}

export interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  createdAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
}

export interface AuthContextType {
  patient: Patient | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterFormData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}