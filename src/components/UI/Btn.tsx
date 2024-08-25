import { CgSpinner } from "react-icons/cg";

type dataProp = {
  type: "big" | "small" | "alt";
  label: string;
  color: string;
  disabled?: boolean;
  form?: boolean;
};

export default function Btn({ type, label, color, disabled, form }: dataProp) {
  switch (type) {
    case "big":
      return (
        <button
          disabled={disabled}
          type={form ? "submit" : "button"}
          className={`w-full flex justify-center gap-3 text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center me-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800 inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {disabled && <CgSpinner className="w-4 h-4 text-white spin mr-2"/>}
          {disabled ? 'Loading...': label}
        </button>
      );

    case "small":
      return (
        <button
          disabled={disabled}
          type="button"
          className={`text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800 inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {disabled && <CgSpinner className="w-4 h-4 text-white spin mr-2"/>}
          {disabled ? 'Loading...': label}
        </button>
      );

    case "alt":
      return (
        <button
          disabled={disabled}
          type="button"
          className={`py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-${color}-200 hover:bg-gray-100 hover:text-${color}-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-${color}-700 focus:text-${color}-700 dark:bg-gray-800 dark:text-gray-400 dark:border-${color}-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center`}
        >
          {disabled && <CgSpinner className="w-4 h-4 text-${color}-700 spin mr-2"/>}
          {disabled ? 'Loading...': label}
        </button>
      );

    default:
      return;
  }
}
