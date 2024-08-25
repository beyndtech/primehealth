import EditPatientModal from "@/components/EditPatientModal";
import PageLoader from "@/components/PageLoader";
import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const tableTitles = ["Patient", "Phone", "Country", "Balance", "Action"];

export default function Patients() {
  const { user: doctor } = contextData();
  const [patients, setPatients] = useState<any>(null);
  const [filteredPatients, setFilteredPatients] = useState<any>(null);
  const [patientData, setPatientData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [reFetch, setReFetch] = useState(true);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${url}/patients`);
      const data = await res.json();

      if (res.ok) {
        setPatients(data.filter((user: any) => user._id !== doctor._id));
        setFilteredPatients(patients);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [reFetch]);

  const handlePatientData = (userObj: any) => {
    setPatientData(userObj);
    setReFetch(!reFetch);
  };

  // const handleSearch = (search: string) => {
  //   let filtered = patients.filter(
  //     (user: any) =>
  //       user.email.toLowerCase().includes(search) ||
  //       user.firstName.toLowerCase().includes(search) ||
  //       user.lastName.toLowerCase().includes(search) ||
  //       user.username.toLowerCase().includes(search),
  //   );
  //   setFilteredPatients(filtered);
  // };

  if (fetching) return <PageLoader />;

  return (
    <>
      <div className="w-full relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700/50 dark:text-gray-400">
            <tr>
              {tableTitles.map((title) => (
                <th key={title} scope="col" className="px-6 py-3">
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredPatients &&
              filteredPatients.map((user: any) => (
                <tr
                  key={user._id}
                  className="min-w-[150px] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-5 py-3 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full bg-[#E2FFD7]/10"
                      src={`https://robohash.org/${user?._id}`}
                      alt="Avatar"
                    />
                    <div className="ps-3">
                      <div className="text-xs font-semibold">
                        {user.fullName.length > 17 &&
                          user.fullName.slice(0, 15) + "..."}
                        {user.fullName.length < 17 && user.fullName}
                      </div>
                      <div className="text-xs font-medium text-gray-500">
                        {user.email.length > 17 &&
                          user.email.slice(0, 15) + "..."}
                        {user.email.length < 17 && user.email}
                      </div>
                    </div>
                  </th>

                  <td className="min-w-[150px] px-5 py-3 text-xs">
                    {user.phone}
                  </td>

                  <td className="min-w-[150px] px-5 py-3 text-xs">
                    {user.country.length > 14 &&
                      user.country.slice(0, 11) + "..."}
                    {user.country.length < 14 && user.country}
                  </td>

                  <td>
                    <div className="min-w-[150px] ps-4 text-xs font-semibold"></div>
                  </td>

                  <td className="min-w-[150px] px-5 py-3">
                    <button
                      onClick={() => handlePatientData(user)}
                      className="font-medium text-blue-600 dark:text-blue-500"
                    >
                      Edit user
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {patientData && (
          <EditPatientModal
            patientData={patientData}
            handlePatientData={handlePatientData}
          />
        )}
      </div>
    </>
  );
}
