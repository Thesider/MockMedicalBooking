import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Plus, MapPin, Phone } from 'lucide-react';
import PatientLayout from '../../layouts/PatientLayout';
import { useAuth } from '../../contexts/AuthContext';
import { appointments, doctors } from '../../data/mockData';
import styles from '../../styles/Components.module.css';

const PatientAppointments: React.FC = () => {
  const { patient } = useAuth();
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'past'>('upcoming');

  // Get patient's appointments
  const patientAppointments = appointments.filter(apt => 
    apt.email === patient?.email
  );

  const upcomingAppointments = patientAppointments.filter(apt => 
    apt.status === 'scheduled' || apt.status === 'checked-in'
  );

  const pastAppointments = patientAppointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'checked-in':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const AppointmentCard: React.FC<{ appointment: any }> = ({ appointment }) => {
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={doctor?.photo}
              alt={doctor?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{doctor?.name}</h3>
              <p className="text-blue-600 font-medium">{doctor?.specialization}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {appointment.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {appointment.timeSlot}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
              {appointment.status.replace('-', ' ')}
            </span>
            <p className="text-xs text-gray-500 mt-2">
              Code: {appointment.reservationCode}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {doctor?.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                MediCare Clinic
              </div>
            </div>
            
            {appointment.status === 'scheduled' && (
              <div className="flex space-x-2">
                <Link
                  to="/check-in"
                  className={`${styles.button} ${styles.buttonPrimary} text-sm px-4 py-2`}
                >
                  Check In
                </Link>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <PatientLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="text-gray-600 mt-2">Manage your healthcare appointments</p>
          </div>
          <Link
            to="/appointment"
            className={`${styles.button} ${styles.buttonPrimary} flex items-center space-x-2`}
          >
            <Plus className="w-5 h-5" />
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming ({upcomingAppointments.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past ({pastAppointments.length})
            </button>
          </nav>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {activeTab === 'upcoming' ? (
            upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                <p className="text-gray-600 mb-6">Schedule your next appointment to get started</p>
                <Link
                  to="/appointment"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  Book Appointment
                </Link>
              </div>
            )
          ) : (
            pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No past appointments</h3>
                <p className="text-gray-600">Your appointment history will appear here</p>
              </div>
            )
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientAppointments;