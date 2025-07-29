import React from 'react';
import { useForm } from 'react-hook-form';
import { BookingFormData, TimeSlot } from '../types';
import { doctors, timeSlots } from '../data/mockData';
import MainLayout from '../layouts/MainLayout';
import styles from '../styles/Components.module.css';

const AppointmentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [availableSlots, setAvailableSlots] = React.useState<TimeSlot[]>([]);
  const [bookingSuccess, setBookingSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<BookingFormData>();

  const selectedDoctorId = watch('doctorId');
  const selectedTimeSlot = watch('timeSlot');

  // Simulate getting available time slots
  React.useEffect(() => {
    if (selectedDate && selectedDoctorId) {
      const slots: TimeSlot[] = timeSlots.map(time => ({
        time,
        available: Math.random() > 0.3 // Simulate availability
      }));
      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, selectedDoctorId]);

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking data:', data);
    // Simulate booking process
    setTimeout(() => {
      setBookingSuccess(true);
    }, 1000);
  };

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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name *</label>
              <input
                type="text"
                {...register('fullName', { required: 'Full name is required' })}
                className={styles.formInput}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className={styles.formError}>{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email *</label>
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

            {/* Doctor Selection */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Doctor *</label>
              <select
                {...register('doctorId', { required: 'Please select a doctor' })}
                className={styles.formSelect}
              >
                <option value="">Select a doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
              {errors.doctorId && (
                <p className={styles.formError}>{errors.doctorId.message}</p>
              )}
            </div>

            {/* Date */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date *</label>
              <input
                type="date"
                {...register('date', { required: 'Please select a date' })}
                className={styles.formInput}
                min={getTomorrowDate()}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {errors.date && (
                <p className={styles.formError}>{errors.date.message}</p>
              )}
            </div>

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
                      onClick={() => setValue('timeSlot', slot.time)}
                      className={`${styles.timeSlot} ${
                        !slot.available 
                          ? styles.timeSlotUnavailable
                          : selectedTimeSlot === slot.time
                          ? styles.timeSlotSelected
                          : styles.timeSlotAvailable
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && (
                  <p className={styles.formError}>Please select a time slot</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedTimeSlot}
              className={`${styles.button} ${styles.buttonPrimary} w-full`}
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