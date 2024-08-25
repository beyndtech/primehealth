import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contextData } from "@/context/AuthContext";
import Btn from "@/components/UI/Btn";
import logo from "../assets/smallLogo.svg";
import logo2 from "../assets/smallLogo2.svg";
import Alert from "@/components/UI/Alert";
import FormSection from "./UI/FormSection";
import InputField from "./UI/InputField";
import EducationForm from "./EducationForm";
import AvailabilityForm from "./AvailabilityForm";
import {
  DoctorProfileType,
  ClinicAddressType,
  EducationType,
  AvailabilityType,
} from "@/types/types";

export default function DrProfileUpdate() {
  const { login, user, logout } = contextData();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || "",
  );
  const [licenseNumber, setLicenseNumber] = useState<string>(
    user?.licenseNumber || "",
  );
  const [specialization, setSpecialization] = useState<string>(
    user?.specialization || "",
  );
  const [experienceYears, setExperienceYears] = useState<number>(
    user?.experienceYears || 0,
  );
  const [clinicAddress, setClinicAddress] = useState<ClinicAddressType>({
    street: user?.clinicAddress.street || "",
    city: user?.clinicAddress.city || "",
    state: user?.clinicAddress.state || "",
    postalCode: user?.clinicAddress.postalCode || "",
    country: user?.clinicAddress.country || "",
  });
  const [education, setEducation] = useState<EducationType[]>([
    { degree: "", institution: "", yearOfCompletion: "" },
  ]);
  const [availability, setAvailability] = useState<AvailabilityType[]>([
    { day: "", startTime: "", endTime: "" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  //update education fields
  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  //add education
  const addEducation = () => {
    education.forEach((ed) => {
      if (
        ed.degree !== "" ||
        ed.institution !== "" ||
        ed.yearOfCompletion !== ""
      ) {
        setEducation([
          ...education,
          { degree: "", institution: "", yearOfCompletion: "" },
        ]);
      }
    });
  };

  //update availability fields
  const updateAvailability = (index: number, field: string, value: string) => {
    const newAvailability = [...availability];
    newAvailability[index] = { ...newAvailability[index], [field]: value };
    setAvailability(newAvailability);
  };

  //add available time fields
  const addAvailability = () => {
    availability.forEach((av) => {
      if (av.day !== "" || av.startTime !== "" || av.endTime !== "") {
        setAvailability([
          ...availability,
          { day: "", startTime: "", endTime: "" },
        ]);
      }
    });
  };

  //update doctor information
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const profileData: DoctorProfileType = {
      firstName,
      lastName,
      phoneNumber,
      specialization,
      licenseNumber,
      experienceYears,
      clinicAddress,
      education,
      availability,
    };

    try {
      const res = await fetch(`${url}/doctor/profile/${user?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();

      if (res.ok) {
        if (user.firstName === "") {
          await login(data);
          navigate("/dashboard/doctor/");
        } else setSuccess(data.message);
      } else throw new Error(data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-gray-800 max-w-[600px] mx-auto">
      <div className="flex flex-col items-center gap-5 mb-8">
        {user.firstName.length < 1 ? (
          <>
            <img
              className="h-10 w-auto hidden dark:block"
              alt="logo"
              src={logo}
            />
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
        {/* Personal Information */}
        <FormSection title="Personal Information">
          <div className="mt-2 space-y-4">
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
              label="Specialization"
              value={specialization}
              onChange={setSpecialization}
              required
            />
            <InputField
              label="Years of Experience"
              value={experienceYears}
              onChange={(value) => setExperienceYears(Number(value))}
              type="number"
              required
            />
            <InputField
              label="License Number (Optional)"
              value={licenseNumber}
              onChange={setLicenseNumber}
            />
          </div>
        </FormSection>

        {/* Clinic Address */}
        <FormSection title="Clinic Address">
          <div className="mt-2 space-y-4">
            {Object.keys(clinicAddress).map((field) => (
              <InputField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={clinicAddress[field as keyof ClinicAddressType]}
                onChange={(value) =>
                  setClinicAddress({ ...clinicAddress, [field]: value })
                }
                required
              />
            ))}
          </div>
        </FormSection>

        <EducationForm
          education={education}
          addEducation={addEducation}
          updateEducation={updateEducation}
        />

        <AvailabilityForm
          availability={availability}
          addAvailability={addAvailability}
          updateAvailability={updateAvailability}
        />

        {error && <Alert type="danger" message={error} />}
        {success && <Alert type="success" message={success} />}

        {/* Form Actions */}
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
  );
}
