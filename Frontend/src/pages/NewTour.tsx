import { useState } from "react";
//import MultiSelectDropdown from "../components/ui/inputs/MultiSelectDropdown";
import useAuthStore from "../stores/zustand/AuthStore";
import SectionContainer from "../components/SectionContainer";
import { useNavigate } from "react-router-dom";


import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import ReactGoogleAutocomplete from "react-google-autocomplete";

export default function Example() {
    return (
        <SectionContainer>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h3 className="text-2xl font-semibold text-gray-800">Inserisci nuovo Tour</h3>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Inserisci tutte le informazioni obbligatorie per inserire un nuovo Tour
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Titolo
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        autoComplete="given-name"
                                        className="input-style"
                                    />

                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                    Descrizione
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="input-style"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-600">Scrivi una breve descrizione del Tour</p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                    Galleria foto
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-[#E29C00] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-[#E29C00]"
                                            >
                                                <span>Carica foto</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                            </label>
                                            <p className="pl-1">Oppure trascina qui</p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, TIFF sotto i 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Informazioni sul Tour</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Inserisci informazioni utili sul Tour su cosa è incluso/escluso e il punto di incontro</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                    Punto di incontro
                                </label>
                                <div className="mt-2">
                                    <ReactGoogleAutocomplete className="input-style mt-2"
                                        apiKey='AIzaSyBMpWoqgN_s313JgoG5YLC3dJZxnsHmJdc'
                                        onPlaceSelected={(place) => {
                                            console.log(place);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                    Prezzo
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        className="input-style"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="duration" className="block text-sm/6 font-medium text-gray-900">
                                    Durata
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="duration"
                                        name="duration"
                                        type="text"
                                        className="input-style"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="street-address"
                                        name="street-address"
                                        type="text"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="region"
                                        name="region"
                                        type="text"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="postal-code"
                                        name="postal-code"
                                        type="text"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </SectionContainer>
    )
}


// const NewTour = () => {
//     const [tourTitle, setTourTitle] = useState<String>('')
//     //const [includesList, setIncludesList] = useState([])

//     const { user } = useAuthStore()

//     const navigate = useNavigate()

//     /*
//     useEffect(() => {
//         const getIncludesListing = async () => {
//             const res = await fetch('http://localhost:3030/tours/includes/default')

//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             const data = await res.json()
//             setIncludesList(data)
//         }

//         getIncludesListing()
//     }, [])
//     */

//     const createNewTour = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault()
//         if (user) {
//             try {
//                 await fetch(import.meta.env.VITE_BACKEND_URL + 'tours/', {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         user: user.id,
//                         title: tourTitle
//                     })
//                 });

//                 navigate('/dashboard')

//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         else {
//             alert('devi essere loggato per inserire un nuovo tour')
//         }
//     }

//     if (user) {
//         return (
//             <>
//                 <SectionContainer>
//                     <form onSubmit={createNewTour} className="mt-5 w-[400px]">
//                         <input
//                             name="tour-title"
//                             type="text"
//                             required
//                             className="input-style"
//                             onChange={(event) => setTourTitle(event.target.value)}
//                         />
//                         {/* <div>
//                         <MultiSelectDropdown
//                             formFieldName={"includes"}
//                             options={includesList}
//                         />
//                     </div> */}
//                         <input
//                             type="submit"
//                             className="bg-[#E29C00] py-2 px-6 text-white rounded-full font-bold w-full flex justify-center items-center gap-3 mt-3"
//                         />
//                     </form>
//                 </SectionContainer>
//             </>
//         )
//     };
// }

// export default NewTour;