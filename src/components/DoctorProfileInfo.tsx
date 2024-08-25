import { contextData } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Btn from "./UI/Btn";

export default function DoctorProfile() {
  const { user: doctor } = contextData();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-8 sm:p-10 dark:bg-gray-800 max-w-3xl mx-auto mt-12">
      <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
        Dr. {doctor.firstName} {doctor.lastName}
      </h2>

      <div className="space-y-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="font-medium text-gray-900 dark:text-gray-100">Specialization:</strong>{" "}
              {doctor.specialization}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="font-medium text-gray-900 dark:text-gray-100">Experience:</strong>{" "}
              {doctor.experienceYears} years
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="font-medium text-gray-900 dark:text-gray-100">Phone:</strong>{" "}
              {doctor.phoneNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="font-medium text-gray-900 dark:text-gray-100">License Number:</strong>{" "}
              {doctor.licenseNumber}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Clinic Address
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {doctor.clinicAddress.street}, {doctor.clinicAddress.city},{" "}
            {doctor.clinicAddress.state}, {doctor.clinicAddress.postalCode},{" "}
            {doctor.clinicAddress.country}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Education
          </h3>
          {doctor.education.length > 0 ? (
            doctor.education.map((edu: any, index: number) => (
              <div key={index} className="mt-4 flex flex-col gap-1.5">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="font-medium text-gray-900 dark:text-gray-100">Degree:</strong> {edu.degree}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="font-medium text-gray-900 dark:text-gray-100">Institution:</strong>{" "}
                  {edu.institution}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="font-medium text-gray-900 dark:text-gray-100">Year of Completion:</strong>{" "}
                  {edu.yearOfCompletion}
                </p>
              </div>
            ))
          ) : (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No education details available.
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Availability
          </h3>
          {doctor.availability.length > 0 ? (
            doctor.availability.map((slot: any, index: number) => (
              <div key={index} className="mt-4 flex flex-col gap-1.5">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="font-medium text-gray-900 dark:text-gray-100">Day:</strong> {slot.day}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="font-medium text-gray-900 dark:text-gray-100">Start Time:</strong>{" "}
                  {slot.startTime}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="font-medium text-gray-900 dark:text-gray-100">End Time:</strong>{" "}
                  {slot.endTime}
                </p>
              </div>
            ))
          ) : (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No availability details available.
            </p>
          )}
        </div>

        <div onClick={() => navigate("/dashboard/doctor/settings")}>
          <Btn type="small" label="Edit Profile" color="blue" />
        </div>
      </div>
    </div>
  );
}
