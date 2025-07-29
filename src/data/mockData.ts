import { Doctor, Appointment } from '../types';
import { Patient } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    photo: 'https://images.pexels.com/photos/559831/pexels-photo-559831.jpeg?auto=compress&cs=tinysrgb&w=300',
    availability: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    photo: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300',
    availability: ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    email: 'michael.chen@hospital.com',
    phone: '+1 (555) 234-5678'
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    specialization: 'Dermatology',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    availability: ['monday', 'wednesday', 'thursday', 'friday'],
    email: 'emily.davis@hospital.com',
    phone: '+1 (555) 345-6789'
  },
  {
    id: '4',
    name: 'Dr. Robert Wilson',
    specialization: 'Orthopedics',
    photo: 'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=300',
    availability: ['monday', 'tuesday', 'thursday', 'friday'],
    email: 'robert.wilson@hospital.com',
    phone: '+1 (555) 456-7890'
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Pediatrics',
    photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
    availability: ['monday', 'tuesday', 'wednesday', 'friday', 'saturday'],
    email: 'lisa.thompson@hospital.com',
    phone: '+1 (555) 567-8901'
  }
];

export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    email: 'john@example.com',
    doctorId: '1',
    date: '2025-01-15',
    timeSlot: '09:00',
    status: 'scheduled',
    reservationCode: 'APT001'
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    email: 'jane@example.com',
    doctorId: '2',
    date: '2025-01-15',
    timeSlot: '10:00',
    status: 'checked-in',
    reservationCode: 'APT002'
  },
  {
    id: '3',
    patientName: 'Mike Johnson',
    email: 'mike@example.com',
    doctorId: '3',
    date: '2025-01-14',
    timeSlot: '14:30',
    status: 'completed',
    reservationCode: 'APT003'
  }
];

export const specializations = [
  'All Specializations',
  'Cardiology',
  'Neurology',
  'Dermatology',
  'Orthopedics',
  'Pediatrics'
];

export const patients: Patient[] = [
  {
    id: '1',
    email: 'john.doe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    address: '123 Main St, City, State 12345',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    },
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    allergies: ['Penicillin', 'Shellfish'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    email: 'jane.smith@email.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1990-03-22',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: {
      name: 'Robert Smith',
      phone: '+1 (555) 876-5432',
      relationship: 'Father'
    },
    medicalHistory: ['Asthma'],
    allergies: ['Pollen'],
    createdAt: '2024-02-10'
  },
  {
    id: '3',
    email: 'mike.johnson@email.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1978-11-08',
    address: '789 Pine St, City, State 12345',
    emergencyContact: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 765-4321',
      relationship: 'Sister'
    },
    medicalHistory: ['High Cholesterol'],
    allergies: [],
    createdAt: '2024-01-20'
  }
];