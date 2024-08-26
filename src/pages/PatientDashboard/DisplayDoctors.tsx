import { useEffect, useState } from "react";
import DisplayDrModal from "../../components/DisplayDrModal";
import ReasonModal from "../../components/ReasonModal";
import { contextData } from "@/context/AuthContext";

export default function DisplayDoctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [doctors, setDoctors] = useState<any>([]);
  const [reason, setReason] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${url}/doctor`);
      const data = await res.json();

      if (res.ok) {
        setDoctors(data);
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

  const handleSubmit = async () => {
    setSuccess(null);
    setError(null);

    if (reason.length < 5)
      return setError("invalid reason, please enter a valid reason");

    console.log({
      reason,
      doctorId: selectedDoctor._id,
      patientId: user._id,
    });

    try {
      setLoading(true);
      const res = await fetch(`${url}/appointment/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          doctorId: selectedDoctor._id,
          patientId: user._id,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
      } else throw new Error(data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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

      {showModal && selectedDoctor && !showReasonModal && (
        <DisplayDrModal
          doctor={selectedDoctor}
          setShowModal={setShowModal}
          setShowReasonModal={setShowReasonModal}
        />
      )}

      {showModal && showReasonModal && (
        <ReasonModal
          setShowModal={setShowReasonModal}
          handleSubmit={handleSubmit}
          setReason={setReason}
          error={error}
          success={success}
          loading={loading}
        />
      )}
    </section>
  );
}
