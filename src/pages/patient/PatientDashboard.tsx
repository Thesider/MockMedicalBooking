import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, FileText, User, Plus, AlertCircle } from 'lucide-react';
import PatientLayout from '../../layouts/PatientLayout';
import { useAuth } from '../../contexts/AuthContext';
import { appointments, doctors } from '../../data/mockData';
import styles from '../../styles/Components.module.css';

const PatientDashboard: React.FC = () => {
  const { patient } = useAuth();

  // Get patient's appointments
  const patientAppointments = appointments.filter(apt => 
    apt.email === patient?.email
  );

  const upcomingAppointments = patientAppointments.filter(apt => 
    apt.status === 'scheduled' || apt.status === 'checked-in'
  );

  const recentAppointments = patientAppointments
    .filter(apt => apt.status === 'completed')
    .slice(0, 3);

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule a new appointment',
      icon: Plus,
      href: '/appointment',
      color: 'bg-blue-500'
    },
    {
      title: 'View Records',
      description: 'Access medical records',
      icon: FileText,
      href: '/patient/records',
      color: 'bg-green-500'
    },
    {
      title: 'Update Profile',
      description: 'Manage your information',
      icon: User,
      href: '/patient/profile',
      color: 'bg-purple-500'
    }
  ];

  return (
    <PatientLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {patient?.firstName}!
          </h1>
          <p className="text-blue-100">
            Manage your healthcare journey from your personal dashboard
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.href}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600">{action.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            <Link 
              to="/patient/appointments"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </Link>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map(appointment => {
                const doctor = doctors.find(d => d.id === appointment.doctorId);
                return (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {doctor?.name}
                          </h4>
                          <p className="text-gray-600">{doctor?.specialization}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>{appointment.date}</span>
                            <span>{appointment.timeSlot}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'scheduled' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {appointment.status === 'scheduled' ? 'Scheduled' : 'Checked In'}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Code: {appointment.reservationCode}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming appointments</p>
              <Link 
                to="/appointment"
                className={`${styles.button} ${styles.buttonPrimary} mt-4 inline-block`}
              >
                Book Your First Appointment
              </Link>
            </div>
          )}
        </div>

        {/* Health Summary & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Health Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Summary</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Medical History</h4>
                {patient?.medicalHistory && patient.medicalHistory.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.map((condition, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No medical history recorded</p>
                )}
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Allergies</h4>
                {patient?.allergies && patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center"
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No known allergies</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
            {recentAppointments.length > 0 ? (
              <div className="space-y-3">
                {recentAppointments.map(appointment => {
                  const doctor = doctors.find(d => d.id === appointment.doctorId);
                  return (
                    <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{doctor?.name}</p>
                        <p className="text-sm text-gray-600">{appointment.date}</p>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Completed</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4">
                <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No recent appointments</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;