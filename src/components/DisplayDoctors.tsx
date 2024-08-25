import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Btn from "./UI/Btn";

export default function DisplayDoctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [doctors, setDoctors] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${url}/doctor`);
      const data = await res.json();

      if (res.ok) {
        setDoctors(data);
        console.log(data);
      } else throw new Error(data.message);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleViewMore = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleBookAppointment = () => {
    // Logic to book the appointment with the selected doctor
  };

  return (
    <section className="relative">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Doctor's Name
              </th>
              <th scope="col" className="px-6 py-3">
                Specialty
              </th>
              <th scope="col" className="px-6 py-3">
                Experience
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 &&
              doctors.map((doctor: any) => (
                <tr key={doctor._id} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {doctor.firstName} {doctor.lastName}
                  </th>
                  <td className="px-6 py-4">{doctor.specialization}</td>
                  <td className="px-6 py-4">{doctor.experienceYears} years</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewMore(doctor)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedDoctor && (
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
                {selectedDoctor.specialization}
              </p>
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
              </h2>
            </div>

            {/* Information Section */}
            <div className="space-y-5 my-14 text-left text-gray-700 dark:text-gray-200">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Experience:</p>
                <p className="text-sm">
                  {selectedDoctor.experienceYears} years
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm font-medium">Contact:</p>
                <p className="text-sm">{selectedDoctor.phoneNumber}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm font-medium">Location:</p>
                <p className="text-sm">
                  {selectedDoctor.clinicAddress.street},{" "}
                  {selectedDoctor.clinicAddress.city},{" "}
                  {selectedDoctor.clinicAddress.state},{" "}
                  {selectedDoctor.clinicAddress.country}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between gap-4">
              <div onClick={handleBookAppointment}>
                <Btn type="small" label="Book Appointment" color="blue" />
              </div>
              <div onClick={() => setShowModal(false)}>
                <Btn type="alt" label="Cancel" color="red" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
