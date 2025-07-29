import React from 'react';
import { Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import DoctorList from '../../components/DoctorList';
import { doctors } from '../../data/mockData';
import { Doctor } from '../../types';
import styles from '../../styles/Components.module.css';

const DoctorsAdminPage: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
            <p className="text-gray-600 mt-2">Manage your medical team and their information.</p>
          </div>
          <button
            onClick={handleAddDoctor}
            className={`${styles.button} ${styles.buttonPrimary} flex items-center space-x-2`}
          >
            <Plus className="w-5 h-5" />
            <span>Add Doctor</span>
          </button>
        </div>

        {/* Doctor List */}
        <DoctorList doctors={doctors} onDoctorSelect={handleDoctorSelect} />

        {/* Doctor Details Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedDoctor ? 'Doctor Details' : 'Add New Doctor'}
                </h2>
              </div>

              <div className="p-6">
                {selectedDoctor ? (
                  <div className="space-y-6">
                    {/* Doctor Info */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedDoctor.photo}
                        alt={selectedDoctor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedDoctor.name}</h3>
                        <p className="text-blue-600 font-medium">{selectedDoctor.specialization}</p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{selectedDoctor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedDoctor.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Availability</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDoctor.availability.map(day => (
                          <span
                            key={day}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-4 pt-4 border-t border-gray-200">
                      <button className={`${styles.button} ${styles.buttonSecondary} flex items-center space-x-2`}>
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Add Doctor Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Full Name</label>
                        <input type="text" className={styles.formInput} placeholder="Enter doctor's name" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Specialization</label>
                        <input type="text" className={styles.formInput} placeholder="e.g., Cardiology" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email</label>
                        <input type="email" className={styles.formInput} placeholder="doctor@example.com" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phone</label>
                        <input type="tel" className={styles.formInput} placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Photo URL</label>
                      <input type="url" className={styles.formInput} placeholder="https://example.com/photo.jpg" />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  Cancel
                </button>
                {!selectedDoctor && (
                  <button className={`${styles.button} ${styles.buttonPrimary}`}>
                    Add Doctor
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DoctorsAdminPage;