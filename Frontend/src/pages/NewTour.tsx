import { useEffect, useState } from "react";
import MultiSelectDropdown from "../components/ui/inputs/MultiSelectDropdown";
import useAuthStore from "../stores/zustand/AuthStore";

const NewTour = () => {
    const [tourTitle, setTourTitle] = useState<String>('')
    const [includesList, setIncludesList] = useState([])

    const { user } = useAuthStore()

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

    useEffect(() => {
        console.log(user)
    }, [])

    const createNewForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (user) {
            try {
                await fetch('http://localhost:3030/tours/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: user.id,
                        title: tourTitle
                    })
                })

            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert('devi essere loggato per inserire un nuovo tour')
        }
    }

    return (
        <>
            <main className="w-full max-w-xl mx-auto">

                <form onSubmit={createNewForm} className="mt-5 w-full">
                    <input
                        name="tour-title"
                        type="text"
                        required
                        className="input-style"
                        onChange={(event) => setTourTitle(event.target.value)}
                    />
                    {/* <div>
                        <MultiSelectDropdown
                            formFieldName={"includes"}
                            options={includesList}
                        />
                    </div> */}
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