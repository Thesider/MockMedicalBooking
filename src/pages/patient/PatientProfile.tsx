import React from "react";
import PatientLayout from "../../layouts/PatientLayout";
import { useAuth } from "../../contexts/AuthContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validateEmail, validateRequired, validatePhone } from "../../utils/validation";
import FormField from "../../components/FormField";
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
    const [isEditing, setIsEditing] = React.useState(false);

    const initialValues = {
        firstName: patient?.firstName || '',
        lastName: patient?.lastName || '',
        email: patient?.email || '',
        phone: patient?.phone || '',
        address: patient?.address || '',
        emergencyContactName: patient?.emergencyContact?.name || '',
        emergencyContactPhone: patient?.emergencyContact?.phone || '',
        emergencyContactRelationship: patient?.emergencyContact?.relationship || ''
    };

    const validationRules = {
        firstName: (value: string) => validateRequired(value, 'First name'),
        lastName: (value: string) => validateRequired(value, 'Last name'),
        email: validateEmail,
        phone: validatePhone,
        address: (value: string) => validateRequired(value, 'Address'),
        emergencyContactName: (value: string) => validateRequired(value, 'Emergency contact name'),
        emergencyContactPhone: validatePhone,
        emergencyContactRelationship: (value: string) => validateRequired(value, 'Relationship')
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        getFieldError,
        isFieldValid,
        isFormValid
    } = useFormValidation({
        initialValues,
        validationRules,
        onSubmit: async (data) => {
            // Simulate API call to update profile
            console.log('Updating profile:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsEditing(false);
            // In real app, update the patient context with new data
        }
    });

    const handleEditToggle = () => {
        if (isEditing) {
            resetForm();
        }
        setIsEditing(!isEditing);
    };

    return (
        <PatientLayout>
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="bg-blue-600 rounded-lg p-8 text-white shadow">
                    <h2 className="text-3xl font-bold mb-2">Patient Profile</h2>
                    <p className="text-blue-100">View and manage your personal information</p>
                </div>
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={getFieldError('firstName')}
                                    isValid={isFieldValid('firstName')}
                                    required
                                />
                                <FormField
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={getFieldError('lastName')}
                                    isValid={isFieldValid('lastName')}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={getFieldError('email')}
                                    isValid={isFieldValid('email')}
                                    required
                                />
                                <FormField
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={getFieldError('phone')}
                                    isValid={isFieldValid('phone')}
                                    required
                                />
                            </div>

                            <FormField
                                label="Address"
                                name="address"
                                type="text"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={getFieldError('address')}
                                isValid={isFieldValid('address')}
                                placeholder="Enter your full address"
                                required
                            />

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        label="Contact Name"
                                        name="emergencyContactName"
                                        type="text"
                                        value={values.emergencyContactName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={getFieldError('emergencyContactName')}
                                        isValid={isFieldValid('emergencyContactName')}
                                        required
                                    />
                                    <FormField
                                        label="Contact Phone"
                                        name="emergencyContactPhone"
                                        type="tel"
                                        value={values.emergencyContactPhone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={getFieldError('emergencyContactPhone')}
                                        isValid={isFieldValid('emergencyContactPhone')}
                                        required
                                    />
                                </div>
                                <FormField
                                    label="Relationship"
                                    name="emergencyContactRelationship"
                                    type="text"
                                    value={values.emergencyContactRelationship}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={getFieldError('emergencyContactRelationship')}
                                    isValid={isFieldValid('emergencyContactRelationship')}
                                    placeholder="e.g., Spouse, Parent, Sibling"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleEditToggle}
                                    className={`${styles.button} ${styles.buttonSecondary}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isFormValid()}
                                    className={`${styles.button} ${styles.buttonPrimary} ${
                                        !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
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
                                        <div className="text-gray-900">{patient?.phone || "—"}</div>
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-semibold text-gray-700">Address:</span>
                                        <div className="text-gray-900">{patient?.address || "—"}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="font-semibold text-gray-700">Name:</span>
                                        <div className="text-gray-900">{patient?.emergencyContact?.name || "—"}</div>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Phone:</span>
                                        <div className="text-gray-900">{patient?.emergencyContact?.phone || "—"}</div>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Relationship:</span>
                                        <div className="text-gray-900">{patient?.emergencyContact?.relationship || "—"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Edit Button */}
                {!isEditing && (
                    <div className="flex justify-end">
                        <button 
                            onClick={handleEditToggle}
                            className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </PatientLayout>
    );
};

export default PatientProfile;
