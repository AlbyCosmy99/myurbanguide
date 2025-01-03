import { useState } from "react";
import useAuthStore from "../stores/zustand/AuthStore";
import SectionContainer from "../components/SectionContainer";
import { useNavigate, useOutletContext } from "react-router-dom";
import { PhotoIcon } from '@heroicons/react/24/solid'
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { TbTrash } from "react-icons/tb"
import capitalizeFirstLetter from "../utils/CapitalizeFirstLetter";

type DashboardOutletContext = {
    fetchTours: () => Promise<void>;
};

type FileType = {
    filename: string;
};

export default function NewTour() {
    const { fetchTours } = useOutletContext<DashboardOutletContext>();

    const [tourTitle, setTourTitle] = useState<string>('')
    const [tourDescription, setTourDescription] = useState<string>('')

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string>("");

    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [address, setAddress] = useState<string | undefined>(undefined)

    const [tourPrice, setTourPrice] = useState<number | null>(null)
    const [tourDuration, setTourDuration] = useState<string>('')

    //const [includesListDefault, setIncludesListDefault] = useState([])
    const [includesValue, setIncludesValue] = useState<string>("");
    const [includesList, setIncludesList] = useState<string[]>([])
    const [exclusesValue, setExclusesValue] = useState<string>("");
    const [exclusesList, setExclusesList] = useState<string[]>([])

    const { user } = useAuthStore()

    const navigate = useNavigate()

    // useEffect(() => {
    //     const getIncludesListing = async () => {
    //         const res = await fetch(import.meta.env.VITE_BACKEND_URL + 'tours/includes/default')

    //         if (!res.ok) {
    //             throw new Error(`HTTP error! Status: ${res.status}`);
    //         }
    //         const data = await res.json()
    //         setIncludesListDefault(data)
    //     }

    //     getIncludesListing()
    // }, [])


    /* INCLUDES */
    const addToIncludes = () => {
        const capitalizedValue = capitalizeFirstLetter(includesValue.trim());

        if (capitalizedValue && !includesList.includes(capitalizedValue)) {
            setIncludesList([...includesList, capitalizedValue])
            setIncludesValue("");
        }
    }

    const removeFromIncludes = (itemToRemove: string) => {
        setIncludesList(includesList.filter((item) => item !== itemToRemove))
    };


    /* EXCLUDES */
    const addToExcluses = () => {
        const capitalizedValue = capitalizeFirstLetter(exclusesValue.trim());

        if (capitalizedValue && !exclusesList.includes(capitalizedValue)) {
            setExclusesList([...exclusesList, capitalizedValue])
            setExclusesValue("");
        }
    }

    const removeFromExcluses = (itemToRemove: string) => {
        setExclusesList(exclusesList.filter((item) => item !== itemToRemove))
    };


    /* FILES */
    const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedFiles || selectedFiles.length === 0) {
            setUploadMessage("Please select files to upload!");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("photos", selectedFiles[i]);
        }

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'upload', {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const filenames = data.files.map((file: FileType) => file.filename);

                setUploadMessage("File caricati");

                const includesIds = await createIncludes(includesList);
                await createNewTour(filenames, includesIds);
            } else {
                setUploadMessage("Errore nel caricamento del file");
            }
        } catch (error) {
            setUploadMessage("Errore nel caricamento del file");
        }
    };

    const createIncludes = async (includesList: string[]) => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'tours/includes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    includes: includesList,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.includes.map((include: { _id: string }) => include._id);
            } else {
                console.error("Errore nella creazione degli includes");
                return [];
            }
        } catch (error) {
            console.error("Errore nella richiesta degli includes", error);
            return [];
        }
    };

    const createNewTour = async (filenames: FileType[], includesIds: string[]) => {
        if (user) {
            try {
                await fetch(import.meta.env.VITE_BACKEND_URL + 'tours/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: user.id,
                        title: tourTitle,
                        description: tourDescription,
                        meeting_point: {
                            latitude: latitude,
                            longitude: longitude,
                            address: address,
                        },
                        price: tourPrice,
                        duration: tourDuration,
                        gallery: filenames,
                        featured_image: filenames[0],
                        includes: includesIds,
                    }),
                });

                navigate('/dashboard');
                await fetchTours();
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Devi essere loggato per inserire un nuovo tour');
        }
    };



    return (
        <SectionContainer>
            <form onSubmit={handleUpload}>
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
                                        onChange={(e) => setTourTitle(e.target.value)}
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
                                        onChange={(e) => setTourDescription(e.target.value)}
                                    />
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-600">Scrivi una breve descrizione del Tour</p>
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
                                    <ReactGoogleAutocomplete
                                        className="input-style mt-2"
                                        apiKey="AIzaSyBMpWoqgN_s313JgoG5YLC3dJZxnsHmJdc"
                                        onPlaceSelected={(place) => {
                                            if (place.geometry && place.geometry.location) {
                                                setLatitude(place.geometry.location.lat())
                                                setLongitude(place.geometry.location.lng())
                                                setAddress(place.formatted_address)
                                            } else {
                                                console.error("Latitudine e longitudine non disponibili per il luogo selezionato.");
                                            }
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
                                        onChange={(e) => setTourPrice(parseFloat(e.target.value))}
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
                                        onChange={(e) => setTourDuration(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="text-sm/6 font-medium text-gray-900 flex gap-1 items-center">
                                    <RiCheckFill size="1.6rem" className="text-green-500" /> Lista degli optional INCLUSI nel Tour
                                </label>
                                <div className="mt-2 relative">
                                    <button type="button" onClick={addToIncludes} className="absolute right-1 top-1 bg-[#E29C00] px-4 py-1 rounded-xl text-white flex gap-2 items-center">
                                        Aggiungi<FaPlus aria-hidden="true" className="size-4" />
                                    </button>
                                    <input
                                        id="includes"
                                        name="includes"
                                        type="text"
                                        className="input-style"
                                        value={includesValue}
                                        onChange={(e) => setIncludesValue(e.target.value)}
                                    />
                                </div>
                                <ul className="flex gap-2 flex-wrap mt-2">
                                    {
                                        includesList.map((elem, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    onClick={() => removeFromIncludes(elem)}
                                                    className="bg-[#FAD076] rounded-full px-4 py-1 text-gray-800 text-sm flex items-center gap-1 ">{elem}<TbTrash /></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="text-sm/6 font-medium text-gray-900 flex gap-1 items-center">
                                    <RiCloseFill size="1.6rem" className="text-red-600" /> Lista degli optional ESCLUSI dal Tour
                                </label>
                                <div className="mt-2 relative">
                                    <button type="button" onClick={addToExcluses} className="absolute right-1 top-1 bg-[#E29C00] px-4 py-1 rounded-xl text-white flex gap-2 items-center">
                                        Aggiungi<FaPlus aria-hidden="true" className="size-4" />
                                    </button>
                                    <input
                                        id="excluses"
                                        name="excluses"
                                        type="text"
                                        className="input-style"
                                        value={exclusesValue}
                                        onChange={(e) => setExclusesValue(e.target.value)}
                                    />
                                </div>
                                <ul className="flex gap-2 flex-wrap mt-2">
                                    {
                                        exclusesList.map((elem, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    onClick={() => removeFromExcluses(elem)}
                                                    className="bg-[#FAD076] rounded-full px-4 py-1 text-gray-800 text-sm flex items-center gap-1 ">{elem}<TbTrash /></li>
                                            )
                                        })
                                    }
                                </ul>
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
                                                <input id="file-upload" name="photos" type="file" className="sr-only" multiple onChange={(e) => setSelectedFiles(e.target.files)} />
                                            </label>
                                            <p className="pl-1">Oppure trascina qui</p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, TIFF sotto i 10MB</p>
                                        {uploadMessage && <p>{uploadMessage}</p>}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancella
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Crea Tour
                    </button>
                </div>
            </form>
        </SectionContainer>
    )
}


