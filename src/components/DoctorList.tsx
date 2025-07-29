import React from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types';
import { specializations } from '../data/mockData';
import DoctorCard from './DoctorCard';
import styles from '../styles/Components.module.css';

interface DoctorListProps {
  doctors: Doctor[];
  onDoctorSelect?: (doctor: Doctor) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, onDoctorSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedSpecialization, setSelectedSpecialization] = React.useState('All Specializations');

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'All Specializations' || 
                                 doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div>
      {/* Search and Filter */}
      <div className={styles.searchContainer}>
        <div className="relative">
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search doctors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.filterContainer}>
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className={styles.filterSelect}
        >
          {specializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onClick={() => onDoctorSelect?.(doctor)}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;