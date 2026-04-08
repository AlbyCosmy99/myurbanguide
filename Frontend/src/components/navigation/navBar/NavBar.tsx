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
import useSearchStore from "../../../stores/zustand/SearchStore";
import useStoreTour from '../../../stores/zustand/Store';
import { useEffect } from 'react';


const callsToAction = [
  { name: 'Scopri le destinazioni più vicine', href: '#', icon: MapPinIcon },
];

const NavBar = () => {
  const { toggleModal } = useModalStore();
  const { user } = useAuthStore();
  const { isSearchFocused } = useSearchStore();
  const { tours, getTour } = useStoreTour();

  useEffect(() => {
    if (!tours || !tours.data) {
      getTour(null, 4);
    }
  }, []);

  const topTours = tours?.data?.slice(0, 4) || [];

  return (
    <div className=" w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px] max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-4">
        <div className="flex flex-row items-center justify-between gap-6">
          <ModalLogin />
          <Link to="">
            <img src={logo} width="200" height={100} alt="logo" />
          </Link>
          {
            !isSearchFocused ?
              <PopoverGroup className="hidden xl:flex lg:gap-x-6">
                <Popover className="relative">
                  <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none hover:text-[#E29C00] transition duration-200">
                    Scopri i tour
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
                      {topTours.map(tour => (
                        <div
                          key={tour._id}
                          className="group mb-2 relative flex items-center gap-x-3 rounded-lg px-2 py-2 text-sm leading-6 hover:bg-gray-100"
                        >
                          <img src={import.meta.env.VITE_UPLOAD_URL + tour.featured_image} className="w-12 h-12 rounded-md object-cover" />

                          <div className="flex-auto">
                            <Link
                              to={`/tours/${tour._id}`}
                              className="leading-4 block font-semibold text-gray-900 line-clamp-1 group-hover:text-[#E29C00]"
                            >
                              {tour.title}
                            </Link>
                            <p className="text-gray-600 line-clamp-1">{tour.meeting_point?.address || 'Destinazione in città'}</p>
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

                <Link
                  to="/diventa-partner"
                  className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none hover:text-[#E29C00] transition duration-200"
                >
                  Diventa Partner
                </Link>
                <Link
                  to="/assistenza"
                  className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none hover:text-[#E29C00] transition duration-200"
                >
                  Assistenza
                </Link>
              </PopoverGroup>
              : ''
          }
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
            <Link to="/carrello">
              <div className="flex flex-col items-center hover:cursor-pointer hover:text-[#E29C00]">
                <RiShoppingCartLine size="1.6rem" className="text-gray-700 hover:text-[#E29C00] transition duration-200" />
                <small className="text-gray-900">Carrello</small>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
