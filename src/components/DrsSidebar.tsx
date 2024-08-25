import  { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg'
import { CiGrid42 } from "react-icons/ci";
import { PiPresentationChart } from "react-icons/pi";
import { HiOutlineKey } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { contextData } from '@/context/AuthContext';
import { BsArrowLeft } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const DrsSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { logout } = contextData()
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });



  return (
    <aside
      ref={sidebar}
      className={`text-sm absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/dashboard/doctor/home">
          <img src={logo} className='h-9 w-auto' alt="Logo" />
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
            <>
              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                <NavLink
                    to="/dashboard/doctor/home"
                    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      (pathname.includes('home')) &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                  <CiGrid42 className='text-xl' />
                  Dashboard
                </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/doctor/profile"
                    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4${
                      (pathname.includes('profile')) &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <FiUser className='text-xl'/>
                    Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/doctor/manage-patients"
                    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4${
                      (pathname.includes('manage-patients')) &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <PiPresentationChart className='text-xl'/>
                    Manage Patients
                  </NavLink>
                </li>
              </ul>
              </>
            </div>
            <div>

            {
            <>
            <ul className="mb-6 flex flex-col gap-1.5">

              <li>
                <NavLink
                  to="/dashboard/doctor/settings"
                  className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('settings') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <HiOutlineKey className='text-xl'/>
                  Settings
                </NavLink>
              </li>
            </ul>
            </>
            }

          <NavLink
            to="#"
            className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
            onClick={() => logout()}
          >
            <CiLogout className='text-xl'/>
            Sign out
          </NavLink>
        </div>
        </nav>
      </div>
    </aside>
  );
};

export default DrsSidebar;