import React from "react";

export interface ClinicAddressType {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface EducationType {
  degree: string;
  institution: string;
  yearOfCompletion: string;
}

export interface AvailabilityType {
  day: string;
  startTime: string;
  endTime: string;
}

export interface DoctorProfileType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  licenseNumber?: string;
  specialization: string;
  experienceYears: number;
  clinicAddress: ClinicAddressType;
  education: EducationType[];
  availability: AvailabilityType[];
}


export interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}


export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface EducationFormProps {
  education: EducationType[];
  addEducation: () => void;
  updateEducation: (index: number, field: string, value: string) => void;
}


export interface MedicalHistoryType {
  condition: string;
  dateDiagnosed: string;
  treatment: string;
}

export interface AllergyType {
  name: string;
  severity: "Mild" | "Moderate" | "Severe" | "";
}

export interface MedicationType {
  name: string;
  dosage: string;
  frequency: string;
}

export interface EmergencyContactType {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface PatientProfileType {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: {
    street: string;
    state: string;
    city: string;
    postalCode: string;
    country: string;
  };
  emergencyContact: EmergencyContactType;
  medicalHistory: MedicalHistoryType[];
  allergies: AllergyType[];
  currentMedications: MedicationType[];
}


export interface MedicalHistoryFormProps {
  medicalHistory: MedicalHistoryType[];
  setMedicalHistory: React.Dispatch<React.SetStateAction<MedicalHistoryType[]>>;
}

export interface AllergiesFormProps {
  allergies: AllergyType[];
  setAllergies: React.Dispatch<React.SetStateAction<AllergyType[]>>;
}


export interface MedicationsFormProps {
  currentMedications: MedicationType[];
  setCurrentMedications: React.Dispatch<React.SetStateAction<MedicationType[]>>;
}