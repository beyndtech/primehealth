import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = contextData();

  useEffect(() => {
    // Fetch appointments for the logged-in patient
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments/${user._id}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
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
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 &&
            appointments.map((appointment: any) => (
              <tr key={appointment._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {appointment.doctor.firstName} {appointment.doctor.lastName}
                </th>
                <td className="px-6 py-4">
                  {appointment.doctor.specialization}
                </td>
                <td className="px-6 py-4">
                  {new Date(appointment.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{appointment.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientAppointments;
