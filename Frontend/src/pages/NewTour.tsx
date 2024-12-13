import { useEffect, useState } from "react";
import MultiSelectDropdown from "../components/ui/inputs/MultiSelectDropdown";

const NewTour = () => {
    const [includesList, setIncludesList] = useState([])

    useEffect(() => {
        const getIncludesListing = async () => {
            const res = await fetch('http://localhost:3030/tours/includes/default')

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json()
            setIncludesList(data)
        }

        getIncludesListing()
    }, [])

    return (
        <>
            <main className="w-full max-w-xl mx-auto">
                <h1 className="text-3xl mt-12">{"Multi-Select Dropdown"}</h1>
                <form className="mt-5 w-full">
                    <div>
                        <MultiSelectDropdown
                            formFieldName={"includes"}
                            options={includesList}
                        />
                    </div>
                    <input
                        type="submit"
                        className="bg-blue-500 text-white rounded px-5 py-2 mt-5 cursor-pointer"
                    />
                </form>
            </main>
        </>
    );
}

export default NewTour;