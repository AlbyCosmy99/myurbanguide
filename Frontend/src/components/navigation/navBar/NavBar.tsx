'use client';
import logo from '../../../assets/svg/logo.svg';
import { RiUserSmileLine } from 'react-icons/ri';
import { RiShoppingCartLine } from 'react-icons/ri';
import img1 from '../../../assets/img/Airbnb-1.webp';
import img2 from '../../../assets/img/Airbnb-2.webp';
import img3 from '../../../assets/img/Airbnb-3.webp';
import img4 from '../../../assets/img/Airbnb-4.webp';
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { ChevronDownIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import ModalLogin from '../../modal/ModalLogin';
import useModalStore from '../../../stores/zustand/ModalStore';
import SearchBar from '../../ui/searchBar/SearchBar';
import useAuthStore from '../../../stores/zustand/AuthStore';

const products = [
  {
    name: 'Verona',
    description: '200 chilometri di distanza',
    href: '#',
    src: img1,
  },
  {
    name: 'Venezia',
    description: '200 chilometri di distanza',
    href: '#',
    src: img2,
  },
  {
    name: 'Bormio',
    description: '200 chilometri di distanza',
    href: '#',
    src: img3,
  },
  {
    name: 'Bologna',
    description: '200 chilometri di distanza',
    href: '#',
    src: img4,
  },
];
const callsToAction = [
  { name: 'Scopri le destinazioni più vicine', href: '#', icon: MapPinIcon },
];

const NavBar = () => {
  const { toggleModal } = useModalStore();
  const { user } = useAuthStore();

  return (
    <div className=" w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px] max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px4">
        <div className="flex flex-row items-center justify-between gap-6">
          <ModalLogin />
          <Link to="">
            <img src={logo} width="200" height={100} alt="logo" />
          </Link>
          <PopoverGroup className="hidden lg:flex lg:gap-x-6">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none">
                Scopri i tuor
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-300 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {products.map(item => (
                    <div
                      key={item.name}
                      className="group mb-2 relative flex items-center gap-x-2 rounded-lg px-2 py-2 text-sm leading-6 hover:bg-gray-100"
                    >
                      <img src={item.src} className="w-10 h-10 rounded-md" />

                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="leading-4 block font-semibold text-gray-900"
                        >
                          {item.name}
                        </a>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid divide-x divide-gray-900/5 bg-[#E29C00]">
                  {callsToAction.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-[#E29C00]"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-white"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none"
            >
              Diventa Partner
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none"
            >
              Assistenza
            </a>
          </PopoverGroup>
          <div className="relative flex gap-6 flex-row items-center justify-between">
            <SearchBar />

            {!user ? (
              <div onClick={toggleModal} className="flex flex-col items-center">
                <RiUserSmileLine size="1.6rem" className="text-gray-700" />
                <small className="text-gray-900">Accedi</small>
              </div>
            ) : (
              <Link to="/dashboard">
                <div className="flex flex-col items-center">
                  <RiUserSmileLine size="1.6rem" className="text-gray-700" />
                  <small className="text-gray-900">Benvenuto</small>
                </div>
              </Link>
            )}
            <div className="flex flex-col items-center">
              <RiShoppingCartLine size="1.6rem" className="text-gray-700" />
              <small className="text-gray-900">Carrello</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
