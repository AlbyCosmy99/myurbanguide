import { useEffect, useState } from "react";
import useStoreTour from "../../../stores/zustand/Store";
import stringContainsAllArray from "../../../utils/stringContainsAllArray";
import { Tour } from "../../../types/Tour";
import LoadingIcon from "../customIcons/Loading";

const SearchBar = () => {
    const { tours } = useStoreTour();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTour, setFilteredTour] = useState<Tour[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setLoading(true);
            const timer = setTimeout(() => {
                const searchQueryTerms = searchQuery.toLowerCase().split(' ');

                const filtered = tours.filter(tour => {
                    return stringContainsAllArray(tour.title, searchQueryTerms);
                });

                setFilteredTour(filtered);
                setLoading(false);
            }, 500);

            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [searchQuery]);


    return (
        <>
            <div className="flex border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 rounded-full">
                <form className="flex gap-2">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="border-none outline-none bg-transparent box-shadow-none appearance-none pl-4 focus:ring-0 focus-visible:ring-0 focus:outline-none w-64 transition-all duration-300 ease-out focus:w-96"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={e => setSearchQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <LoadingIcon loading={loading} isFocused={isFocused} width="24" height="24" />
                    <input
                        type="submit"
                        className="bg-[#E29C00] py-2 px-6 text-white rounded-full font-bold"
                        value="Cerca"
                    />
                </form>
            </div>

            <div
                className={`absolute top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-300 transition p-4 ${!loading && isFocused ? 'visible' : 'hidden'}`}
            >
                {searchQuery.length === 0 ? (
                    <p>Inizia a digita per trovare un Tour</p>
                ) : filteredTour.length === 0 ? (
                    <p>Nessun risultato</p>
                ) : (
                    filteredTour.map((tour, index) => (
                        <div
                            key={index}
                            className="flex mb-1 items-center gap-x-3 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                        >
                            <img
                                src={`${import.meta.env.VITE_UPLOAD_URL + tour.featured_image}`}
                                className="w-11 h-11 rounded-md object-cover"
                            />
                            <a className="block leading-4 text-gray-900">
                                {tour.title}
                            </a>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default SearchBar