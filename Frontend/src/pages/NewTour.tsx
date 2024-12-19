import { useState } from "react";
//import MultiSelectDropdown from "../components/ui/inputs/MultiSelectDropdown";
import useAuthStore from "../stores/zustand/AuthStore";
import SectionContainer from "../components/SectionContainer";
import { useNavigate } from "react-router-dom";

const NewTour = () => {
    const [tourTitle, setTourTitle] = useState<String>('')
    //const [includesList, setIncludesList] = useState([])

    const { user } = useAuthStore()

    const navigate = useNavigate()

    /*
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
    */

    const createNewTour = async (event: React.FormEvent<HTMLFormElement>) => {
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
                });

                navigate('/dashboard')

            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert('devi essere loggato per inserire un nuovo tour')
        }
    }

    if (user) {
        return (
            <>
                <SectionContainer>
                    <form onSubmit={createNewTour} className="mt-5 w-[400px]">
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
                            className="bg-[#E29C00] py-2 px-6 text-white rounded-full font-bold w-full flex justify-center items-center gap-3 mt-3"
                        />
                    </form>
                </SectionContainer>
            </>
        )
    };
}

export default NewTour;