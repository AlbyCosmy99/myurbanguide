import {
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { MdTour, MdAlternateEmail } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import useAuthStore from '../../stores/zustand/AuthStore';
import { Link, useNavigate } from 'react-router-dom';

interface HeadersDashboardProps {
  username: string;
  userEmail: string;
  userTourLength: number;
}

const HeadersDashboard: React.FC<HeadersDashboardProps> = ({
  username,
  userEmail,
  userTourLength,
}) => {
  const { updateUser } = useAuthStore();

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('token');
    updateUser(null);
    navigate('/');
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-800 sm:truncate sm:text-3xl sm:tracking-tight">
          Benvenuto, {username}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MdAlternateEmail
              aria-hidden="true"
              className="mr-1.5 size-5 shrink-0 text-gray-400"
            />
            {userEmail}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MdTour
              aria-hidden="true"
              className="mr-1.5 size-5 shrink-0 text-gray-400"
            />
            Tour inseriti: {userTourLength}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">


        <span className="ml-3 hidden sm:block">
          <button
            onClick={logoutUser}
            type="button"
            className="inline-flex items-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <LinkIcon
              aria-hidden="true"
              className="-ml-0.5 mr-1.5 size-4 text-gray-400"
            />
            Logout
          </button>
        </span>

        <span className="sm:ml-3">
          <Link to="/dashboard/nuovo-tour/">
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-[#E29C00] px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <FaPlus aria-hidden="true" className="-ml-0.5 mr-1.5 size-4" />
              Aggiungi Tour
            </button>
          </Link>
        </span>

        {/* Dropdown */}
        <Menu as="div" className="relative ml-3 sm:hidden">
          <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
            More
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 ml-1.5 size-5 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                Edit
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                View
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default HeadersDashboard;
