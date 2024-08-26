import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FiUser } from "react-icons/fi";
import { TbTransform } from "react-icons/tb";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineKey } from "react-icons/hi2";
import { CiGrid42, CiLogout } from "react-icons/ci";
import { LiaUsersCogSolid } from "react-icons/lia";
import { contextData } from "@/context/AuthContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { logout } = contextData();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={() => setSidebarOpen(false)}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/dashboard/patient/patient">
          <img src={logo} className="h-9 w-auto" alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="block lg:hidden text-2xl"
        >
          <BsArrowLeft />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/dashboard/patient"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  (pathname === "home") &&
                  "bg-graydark dark:bg-meta-4"
                }`}
              >
                <CiGrid42 className="text-xl" />
                Dashboard
              </NavLink>

              <li>
                <NavLink
                  to="/dashboard/patient/book-appointment"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("book-appointment") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <LiaUsersCogSolid className="text-xl" />
                  Book Appointment
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/patient/appointments"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("appointments") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <TbTransform className="text-xl" />
                  Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/patient/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FiUser className="text-xl" />
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/password-reset"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <HiOutlineKey className="text-xl" />
                  Reset Password
                </NavLink>
              </li>
            </ul>

            <NavLink
              to="#"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
              onClick={() => logout()}
            >
              <CiLogout className="text-xl" />
              Sign out
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
