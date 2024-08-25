import { contextData } from "@/context/AuthContext";

export default function PatientProfileInfo() {
  const { user } = contextData();

  return (
    <div className="px-4 pb-6 pt-20 text-center lg:pb-8 xl:pb-11.5">
      <div className="mx-auto max-w-180 mt-12">
        <div className="relative overflow-x-auto rounded-[6px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  Profile
                </th>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Full Name
                </th>
                <td className="px-6 py-4">
                  {user.firstName} {user.lastName}
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Username
                </th>
                <td className="px-6 py-4">{user.username}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Email
                </th>
                <td className="px-6 py-4">{user.email}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Street Address
                </th>
                <td className="px-6 py-4">{user.address.street}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  State
                </th>
                <td className="px-6 py-4">{user.address.state}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Country
                </th>
                <td className="px-6 py-4">{user.address.country}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Zip Code
                </th>
                <td className="px-6 py-4">{user.address.postalCode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
