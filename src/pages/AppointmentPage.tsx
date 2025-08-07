import React from 'react';
import { BookingFormData, TimeSlot } from '../types';
import { doctors, timeSlots } from '../data/mockData';
import MainLayout from '../layouts/MainLayout';
import { useFormValidation } from '../hooks/useFormValidation';
import { validateEmail, validateRequired, validateFutureDate } from '../utils/validation';
import FormField from '../components/FormField';
import styles from '../styles/Components.module.css';

const AppointmentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [availableSlots, setAvailableSlots] = React.useState<TimeSlot[]>([]);
  const [bookingSuccess, setBookingSuccess] = React.useState(false);

  const initialValues = {
    fullName: '',
    email: '',
    doctorId: '',
    date: '',
    timeSlot: ''
  };

  const validationRules = {
    fullName: (value: string) => validateRequired(value, 'Full name'),
    email: validateEmail,
    doctorId: (value: string) => validateRequired(value, 'Doctor selection'),
    date: validateFutureDate,
    timeSlot: (value: string) => validateRequired(value, 'Time slot')
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
    onSubmit: (data) => {
      console.log('Booking data:', data);
      // Simulate booking process
      setTimeout(() => {
        setBookingSuccess(true);
      }, 1000);
    }
  });


  // Simulate getting available time slots
  React.useEffect(() => {
    if (selectedDate && values.doctorId) {
      const slots: TimeSlot[] = timeSlots.map(time => ({
        time,
        available: Math.random() > 0.3 // Simulate availability
      }));
      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, values.doctorId]);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (bookingSuccess) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Your appointment has been confirmed. You will receive a confirmation email shortly with your reservation code.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Reservation Code</p>
              <p className="text-2xl font-bold text-blue-600">APT{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
            </div>
            <button
              onClick={() => setBookingSuccess(false)}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book an Appointment</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <FormField
              label="Full Name"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('fullName')}
              isValid={isFieldValid('fullName')}
              placeholder="Enter your full name"
              required
            />

            {/* Email */}
            <FormField
              label="Email"
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

            {/* Doctor Selection */}
            <FormField
              label="Doctor"
              name="doctorId"
              type="select"
              value={values.doctorId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('doctorId')}
              isValid={isFieldValid('doctorId')}
              placeholder="Select a doctor"
              options={doctors.map(doctor => ({
                value: doctor.id,
                label: `${doctor.name} - ${doctor.specialization}`
              }))}
              required
            />

            {/* Date */}
            <FormField
              label="Date"
              name="date"
              type="date"
              value={values.date}
              onChange={(name, value) => {
                handleChange(name, value);
                setSelectedDate(value);
              }}
              onBlur={handleBlur}
              error={getFieldError('date')}
              isValid={isFieldValid('date')}
              required
            />

            {/* Time Slots */}
            {availableSlots.length > 0 && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Available Time Slots *</label>
                <div className={styles.timeSlotGrid}>
                  {availableSlots.map(slot => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => handleChange('timeSlot', slot.time)}
                      className={`${styles.timeSlot} ${
                        !slot.available 
                          ? styles.timeSlotUnavailable
                          : values.timeSlot === slot.time
                          ? styles.timeSlotSelected
                          : styles.timeSlotAvailable
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {getFieldError('timeSlot') && (
                  <p className={styles.formError}>{getFieldError('timeSlot')}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`${styles.button} ${styles.buttonPrimary} w-full ${
                !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AppointmentPage;