import SectionContainer from "../components/SectionContainer"
import HeadersDashboard from "../components/navigation/Headings"
import { Outlet } from "react-router-dom"
import useAuthStore from "../stores/zustand/AuthStore"
import { useEffect, useState } from "react"
import { Tour } from "../types/Tour"
import useTokenPayload from "../hooks/useTokenPayload"


const DashBoard = () => {
    const { user } = useAuthStore()
    const [userTours, setUserTours] = useState<Tour[]>([])

    useTokenPayload()

    useEffect(() => {
        if (user && user.id) {
            fetchTours();
        } else {
            console.log("User non definito");
        }
    }, [user]);


    const fetchTours = async () => {
        try {
            const url = import.meta.env.VITE_BACKEND_URL + 'tours/usertours/' + user!.id;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const userTours = await res.json();
            setUserTours(userTours);
        } catch (error) {
            console.error('Errore nella richiesta dei dati:', error);
        }
    };


    if (user) {
        return (
            <>
                <SectionContainer>
                    <HeadersDashboard username={user!.username} userEmail={user!.email} userTourLength={userTours.length} />
                </SectionContainer>
                <Outlet context={{ userTours, user, fetchTours }} />
            </>

        )
    }
}

export default DashBoard