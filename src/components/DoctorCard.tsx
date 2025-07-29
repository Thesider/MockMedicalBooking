import React from 'react';
import { Doctor } from '../types';
import styles from '../styles/Components.module.css';

interface DoctorCardProps {
  doctor: Doctor;
  onClick?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <div className={`${styles.doctorCard} ${styles.fadeIn}`} onClick={onClick}>
      <img
        src={doctor.photo}
        alt={doctor.name}
        className={styles.doctorPhoto}
      />
      <h3 className={styles.doctorName}>{doctor.name}</h3>
      <p className={styles.doctorSpecialization}>{doctor.specialization}</p>
      <p className={styles.doctorAvailability}>
        Available: {doctor.availability.length} days/week
      </p>
    </div>
  );
};

export default DoctorCard;