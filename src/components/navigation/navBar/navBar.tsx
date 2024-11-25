'use client'
import logo from '../../../assets/svg/logo.svg'

import { RiUserSmileLine } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import img1 from '../../../assets/img/Airbnb-1.webp';
import img2 from '../../../assets/img/Airbnb-2.webp';
import img3 from '../../../assets/img/Airbnb-3.webp';
import img4 from '../../../assets/img/Airbnb-4.webp';

import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon, MapPinIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom";
import ModalLogin from "../../modal/ModalLogin";
import useStoreModal from "../../../stores/zustand/StoreModal";
import { useEffect, useState } from "react";
import useStoreTour from "../../../stores/zustand/Store";
import Tour from "../../../types/Tour";
import LoadingIcon from "../../customIcons/Loading";
import stringContainsAllArray from "../../../utils/stringContainsAllArray";

const products = [
    { name: 'Verona', description: '200 chilometri di distanza', href: '#', src: img1 },
    { name: 'Venezia', description: '200 chilometri di distanza', href: '#', src: img2 },
    { name: 'Bormio', description: '200 chilometri di distanza', href: '#', src: img3 },
    { name: 'Bologna', description: '200 chilometri di distanza', href: '#', src: img4 },
]
const callsToAction = [
    { name: 'Scopri le destinazioni più vicine', href: '#', icon: MapPinIcon },
]

const NavBar = () => {
    const { toggleModal } = useStoreModal()
    const { tours } = useStoreTour()

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredTour, setFilteredTour] = useState<Tour[]>([])
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (searchQuery.length > 0) {
            setLoading(true)
            const timer = setTimeout(() => {
                const searchQueryTerms = searchQuery.toLowerCase().split(" ")

                const filtered = tours.filter((tour) => {
                    return stringContainsAllArray(tour.title, searchQueryTerms)
                });
                console.log(filtered)

                setFilteredTour(filtered)
                setLoading(false)
            }, 500)

            return () => clearTimeout(timer)
        } else {
            setLoading(false);
        }
    }, [searchQuery]);

    return (
        <div className=" w-full bg-white shadow-sm">
            <div className="py-4 border-b-[1px] max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px4">
                <div className="flex flex-row items-center justify-between gap-6">
                    <ModalLogin />
                    <Link to=""><img src={logo} width="200" height={100} alt="logo" /></Link>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-6">
                        <Popover className="relative">
                            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none">
                                Scopri i tuor
                                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-300 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="p-4">
                                    {products.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group mb-2 relative flex items-center gap-x-2 rounded-lg px-2 py-2 text-sm leading-6 hover:bg-gray-100"
                                        >

                                            <img src={item.src} className="w-10 h-10 rounded-md" />

                                            <div className="flex-auto">
                                                <a href={item.href} className="leading-4 block font-semibold text-gray-900">
                                                    {item.name}
                                                </a>
                                                <p className="text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid divide-x divide-gray-900/5 bg-[#E29C00]">
                                    {callsToAction.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-[#E29C00]"
                                        >
                                            <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-white" />
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>

                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none">
                            Diventa Partner
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none">
                            Assistenza
                        </a>
                    </PopoverGroup>
                    <div className="relative flex gap-6 flex-row items-center justify-between">
                        <div className="flex border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 rounded-full"><form className="flex gap-2">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="border-none outline-none bg-transparent box-shadow-none appearance-none pl-4 focus:ring-0 focus-visible:ring-0 focus:outline-none w-64 transition-all duration-300 ease-out focus:w-96"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoComplete="off"
                            />
                            <LoadingIcon loading={loading} isFocused={isFocused} />
                            <input
                                type="submit"
                                className="bg-[#E29C00] py-2 px-6 text-white rounded-full font-bold"
                                value="Cerca" />
                        </form></div>

                        <div className={`absolute top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-300 transition p-4 ${!loading && isFocused ? "visible" : "hidden"}`}>
                            {
                                searchQuery.length === 0 ? (
                                    <p>Inizia a digita per trovare un Tour</p>
                                ) : filteredTour.length === 0 ? (
                                    <p>Nessun risultato</p>
                                ) : (

                                    filteredTour.map((tour, index) => (
                                        <div
                                            key={index}
                                            className="flex mb-1 items-center gap-x-3 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                                        >
                                            <img src={`src/assets/img/${tour.featured_image}`} className="w-11 h-11 rounded-md object-cover" />
                                            <a className="block leading-4 text-gray-900">
                                                {tour.title}
                                            </a>

                                        </div>
                                    ))
                                )
                            }
                        </div>


                        <div onClick={toggleModal} className="flex flex-col items-center"><RiUserSmileLine size="1.6rem" className="text-gray-700" />
                            <small className="text-gray-900">Accedi</small>
                        </div>
                        <div className="flex flex-col items-center"><RiShoppingCartLine size="1.6rem" className="text-gray-700" />
                            <small className="text-gray-900">Carrello</small>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavBar;