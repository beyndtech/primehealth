
import { MdClose } from "react-icons/md";
import Btn from "./UI/Btn";
import Alert from "./UI/Alert";

export default function ReasonModal({
  setShowModal,
  handleSubmit,
  setReason, error, success, loading
}: any) {

  console.log(error)
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
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Reason for appointment?
          </h2>
        </div>

        <input onChange={(e) => setReason(e.target.value)} className="editUserInput" type="text" placeholder="Enter reason for appointment"/>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between gap-4">
          <div onClick={()=> handleSubmit()}>
            <Btn type="small" label="Book Appointment" color="blue" disabled={loading} />
          </div>
          <div onClick={() => setShowModal(false)}>
            <Btn type="alt" label="Cancel" color="red" />
          </div>
        </div>

        {error && <Alert type="danger" message={error} />}
        {success && <Alert type="success" message={success} />}
      </div>
    </div>
  );
}
