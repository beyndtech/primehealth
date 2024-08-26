import { MdClose } from "react-icons/md";
import Btn from "./UI/Btn";

export default function DisplayDrModal({
  doctor,
  setShowModal,
  setShowReasonModal,
}: any) {
  return (
    <div className="fixed w-full h-screen inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl dark:bg-gray-900 dark:border-gray-700">
        {/* Close Icon */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-label="Close"
        >
          <MdClose className="text-gray-600 dark:text-gray-300" size={24} />
        </button>

        {/* Header Section */}
        <div className="mb-6">
          <p className="capitalize mt-2 text-base text-gray-600 dark:text-gray-400">
            {doctor.specialization}
          </p>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Dr. {doctor.firstName} {doctor.lastName}
          </h2>
        </div>

        {/* Information Section */}
        <div className="space-y-5 my-14 text-left text-gray-700 dark:text-gray-200">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Experience:</p>
            <p className="text-sm">{doctor.experienceYears} years</p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-medium">Contact:</p>
            <p className="text-sm">{doctor.phoneNumber}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-medium">Location:</p>
            <p className="text-sm">
              {doctor.clinicAddress.street}, {doctor.clinicAddress.city},{" "}
              {doctor.clinicAddress.state}, {doctor.clinicAddress.country}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between gap-4">
          <div onClick={()=> setShowReasonModal(true)}>
            <Btn type="small" label="Book Appointment" color="blue" />
          </div>
          <div onClick={() => setShowModal(false)}>
            <Btn type="alt" label="Cancel" color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}
