import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contextData } from "@/context/AuthContext";
import Btn from "@/components/UI/Btn";
import logo from "../assets/smallLogo.svg";
import logo2 from "../assets/smallLogo2.svg";
import Alert from "@/components/UI/Alert";
import FormSection from "@/components/UI/FormSection";
import InputField from "@/components/UI/InputField";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import AllergiesForm from "@/components/AllergiesForm";
import MedicationsForm from "@/components/MedicationsForm";
import { countries } from "@/lib/countries";
import { EmergencyContactType, PatientProfileType } from "@/types/types";

export default function ProfileUpdate() {
  const { login, user, logout } = contextData();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [selectedCountry, setSelectedCountry] = useState(user?.country || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [streetAddress, setStreetAddress] = useState(
    user?.address.street || "",
  );
  const [state, setState] = useState(user?.address.state || "");
  const [city, setCity] = useState(user?.address.city || "");
  const [zipCode, setZipCode] = useState(user?.address.postalCode || "");
  const [emergencyContact, setEmergencyContact] =
    useState<EmergencyContactType>({
      name: "",
      relationship: "",
      phoneNumber: "",
    });
  const [medicalHistory, setMedicalHistory] = useState(
    user?.medicalHistory || [],
  );
  const [allergies, setAllergies] = useState(user?.allergies || []);
  const [currentMedications, setCurrentMedications] = useState(
    user?.currentMedications || [],
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const profileData: PatientProfileType = {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      address: {
        street: streetAddress,
        state,
        city,
        postalCode: zipCode,
        country: selectedCountry,
      },
      emergencyContact,
      medicalHistory,
      allergies,
      currentMedications,
    };

    try {
      const res = await fetch(`${url}/patient/profile/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();

      if (res.ok) {
        await login(data);
        navigate("/dashboard/patient/");
      } else throw new Error(data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow p-4 sm:p-7 dark:bg-gray-800">
      <div className="max-w-[600px] mx-auto">
        <div className="flex flex-col items-center gap-5 mb-8">
          {user.firstName.length < 1 ? (
            <>
              <img className="h-10 w-auto hidden dark:block" alt="logo" src={logo} />
              <img className="h-10 w-auto dark:hidden" alt="logo" src={logo2} />
            </>
          ) : (
            ""
          )}
          <h2 className="text-2xl font-normal text-center text-gray-800 dark:text-gray-100">
            {user.firstName !== ""
              ? "Update Your Profile"
              : "Create Your Profile"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <FormSection title="Personal Information">
            <InputField
              label="First Name"
              value={firstName}
              onChange={setFirstName}
              required
            />
            <InputField
              label="Last Name"
              value={lastName}
              onChange={setLastName}
              required
            />
            <InputField
              label="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              type="tel"
              required
            />
            <InputField
              label="Date of Birth"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              type="date"
              required
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="editUserInput mt-6"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </FormSection>

          <FormSection title="Address Information">
            <InputField
              label="Street Address"
              value={streetAddress}
              onChange={setStreetAddress}
              required
            />
            <InputField
              label="State"
              value={state}
              onChange={setState}
              required
            />
            <InputField label="City" value={city} onChange={setCity} required />
            <InputField
              label="Zip Code"
              value={zipCode}
              onChange={setZipCode}
              required
            />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="editUserInput mt-6"
              required
            >
              <option value="none">Country</option>
              {countries.map((country, i) => (
                <option key={i} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </FormSection>

          <FormSection title="Emergency Contact (Optional)">
            <InputField
              label="Contact Name"
              value={emergencyContact.name}
              onChange={(value) =>
                setEmergencyContact({ ...emergencyContact, name: value })
              }
            />
            <InputField
              label="Relationship"
              value={emergencyContact.relationship}
              onChange={(value) =>
                setEmergencyContact({
                  ...emergencyContact,
                  relationship: value,
                })
              }
            />
            <InputField
              label="Phone Number"
              value={emergencyContact.phoneNumber}
              onChange={(value) =>
                setEmergencyContact({ ...emergencyContact, phoneNumber: value })
              }
              type="tel"
            />
          </FormSection>

          <MedicalHistoryForm
            medicalHistory={medicalHistory}
            setMedicalHistory={setMedicalHistory}
          />

          <AllergiesForm allergies={allergies} setAllergies={setAllergies} />

          <MedicationsForm
            currentMedications={currentMedications}
            setCurrentMedications={setCurrentMedications}
          />

          {error && <Alert type="danger" message={error} />}

          <div className="mt-5 flex justify-end gap-x-2">
            <div onClick={() => logout()}>
              <Btn type="alt" label="Logout" color="gray" />
            </div>
            <div onClick={handleSubmit}>
              <Btn
                type="small"
                label={loading ? "Updating..." : "Update Profile"}
                color="blue"
                disabled={loading}
                form
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
