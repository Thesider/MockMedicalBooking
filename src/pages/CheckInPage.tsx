import React from 'react';
import { QrCode, Hash } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { appointments } from '../data/mockData';
import styles from '../styles/Components.module.css';

const CheckInPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'qr' | 'code'>('code');
  const [inputValue, setInputValue] = React.useState('');
  const [checkInResult, setCheckInResult] = React.useState<{
    status: 'success' | 'error' | null;
    message: string;
  }>({ status: null, message: '' });

  const handleCheckIn = () => {
    if (!inputValue.trim()) {
      setCheckInResult({
        status: 'error',
        message: 'Please enter a reservation code or scan QR code'
      });
      return;
    }

    // Simulate check-in validation
    const appointment = appointments.find(apt => 
      apt.reservationCode.toLowerCase() === inputValue.toLowerCase() ||
      apt.id === inputValue
    );

    if (appointment) {
      if (appointment.status === 'checked-in') {
        setCheckInResult({
          status: 'error',
          message: 'This appointment has already been checked in'
        });
      } else {
        setCheckInResult({
          status: 'success',
          message: `Welcome ${appointment.patientName}! Check-in successful for your appointment.`
        });
      }
    } else {
      setCheckInResult({
        status: 'error',
        message: 'Invalid reservation code. Please check and try again.'
      });
    }
  };

  const handleQRScan = () => {
    // Simulate QR scanning with a mock result
    const mockQRResult = 'APT002';
    setInputValue(mockQRResult);
    setTimeout(() => {
      const appointment = appointments.find(apt => apt.reservationCode === mockQRResult);
      if (appointment) {
        setCheckInResult({
          status: 'success',
          message: `QR Code scanned! Welcome ${appointment.patientName}!`
        });
      }
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Check In for Your Appointment</h1>
          <p className="text-gray-600">Use your reservation code or scan your QR code to check in</p>
        </div>

        <div className={styles.checkInContainer}>
          {/* Tabs */}
          <div className={styles.checkInTabs}>
            <button
              className={`${styles.checkInTab} ${activeTab === 'code' ? styles.active : ''}`}
              onClick={() => {
                setActiveTab('code');
                setCheckInResult({ status: null, message: '' });
                setInputValue('');
              }}
            >
              <Hash className="w-5 h-5 inline mr-2" />
              Reservation Code
            </button>
            <button
              className={`${styles.checkInTab} ${activeTab === 'qr' ? styles.active : ''}`}
              onClick={() => {
                setActiveTab('qr');
                setCheckInResult({ status: null, message: '' });
                setInputValue('');
              }}
            >
              <QrCode className="w-5 h-5 inline mr-2" />
              QR Code
            </button>
          </div>

          {/* Content */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              <div>
                <label className={styles.formLabel}>Enter Reservation Code</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                  placeholder="e.g., APT001"
                  className={styles.formInput}
                />
              </div>
              <button
                onClick={handleCheckIn}
                className={`${styles.button} ${styles.buttonPrimary} w-full`}
              >
                Check In
              </button>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-6 text-center">
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Position your QR code in the scanner area</p>
                <button
                  onClick={handleQRScan}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  Simulate QR Scan
                </button>
              </div>
            </div>
          )}

          {/* Result */}
          {checkInResult.status && (
            <div className={`${styles.checkInResult} ${
              checkInResult.status === 'success' ? styles.checkInSuccess : styles.checkInError
            }`}>
              <p>{checkInResult.message}</p>
            </div>
          )}
        </div>

        {/* Test Codes */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Test Reservation Codes:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded p-3">
              <strong>APT001</strong> - John Doe (Scheduled)
            </div>
            <div className="bg-white rounded p-3">
              <strong>APT002</strong> - Jane Smith (Already checked in)
            </div>
            <div className="bg-white rounded p-3">
              <strong>APT003</strong> - Mike Johnson (Scheduled)
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckInPage;