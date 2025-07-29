import React from 'react';
import MainLayout from '../layouts/MainLayout';
import DoctorList from '../components/DoctorList';
import { doctors } from '../data/mockData';
import { Doctor } from '../types';

const DoctorsPage: React.FC = () => {
  const handleDoctorSelect = (doctor: Doctor) => {
    console.log('Selected doctor:', doctor);
    // Could navigate to doctor detail page or open modal
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Medical Team</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our experienced doctors who are dedicated to providing you with the best healthcare services.
          </p>
        </div>

        <DoctorList doctors={doctors} onDoctorSelect={handleDoctorSelect} />
      </div>
    </MainLayout>
  );
};

export default DoctorsPage;