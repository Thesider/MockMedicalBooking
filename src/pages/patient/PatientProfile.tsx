import React from "react";
import PatientLayout from "../../layouts/PatientLayout";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Components.module.css";

function getAge(dateOfBirth: string): number {
    if (!dateOfBirth) return 0;

    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime())) return 0;

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return Math.max(0, age);
}

const PatientProfile: React.FC = () => {
    const { patient } = useAuth();

    return (
        <PatientLayout>
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="bg-blue-600 rounded-lg p-8 text-white shadow">
                    <h2 className="text-3xl font-bold mb-2">Patient Profile</h2>
                    <p className="text-blue-100">View and manage your personal information</p>
                </div>
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <span className="font-semibold text-gray-700">Full Name:</span>
                                <div className="text-gray-900">{patient?.firstName} {patient?.lastName}</div>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold text-gray-700">Date of Birth:</span>
                                <div className="text-gray-900">{patient?.dateOfBirth || "—"}</div>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold text-gray-700">Age:</span>
                                <div className="text-gray-900">{patient?.dateOfBirth ? getAge(patient.dateOfBirth) : "—"}</div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <span className="font-semibold text-gray-700">Email:</span>
                                <div className="text-gray-900">{patient?.email || "—"}</div>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold text-gray-700">Phone:</span>
                                <div className="flex justify-end">
                                    <button
                                        className={`${styles.button} ${styles.buttonPrimary}`}
                                        onClick={() => {
                                            // Add navigation to edit page or open modal
                                            console.log('Navigate to edit profile');
                                        }}
                                    >
                                        Edit Profile
                                    </button>
                                </div>                            </div>
                        </div>
                    </div>
                </div>
                {/* Edit Button */}
                <div className="flex justify-end">
                    <button className={`${styles.button} ${styles.buttonPrimary}`}>
                        Edit Profile
                    </button>
                </div>
            </div>
        </PatientLayout>
    );
};

export default PatientProfile;
