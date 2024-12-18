import SectionContainer from "../components/SectionContainer"
import useAuthStore from "../stores/zustand/AuthStore"
import useTokenPayload from "../hooks/useTokenPayload"
import { useEffect, useState } from "react"
import Tour from "../types/Tour"
import HeadersDashboard from "../components/navigation/Headings"
import { Outlet } from "react-router-dom"


const DashBoard = () => {
    const { user } = useAuthStore()
    const [userTours, setUserTours] = useState<Tour[]>([])

    useTokenPayload()

    useEffect(() => {
        const fetchTours = async () => {
            if (user) {
                try {
                    const url = 'http://localhost:3030/tours/user/' + user.id;
                    const res = await fetch(url);

                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    const userTours = await res.json();
                    setUserTours(userTours);
                } catch (error) {
                    console.error('Errore nella richiesta dei dati:', error);
                }
            }
        };

        fetchTours();
    }, [user, userTours]);


    if (user) {
        return (
            <>
                <SectionContainer>
                    <HeadersDashboard username={user.name} userEmail={user.email} userTourLength={userTours.length} />
                </SectionContainer>
                <Outlet />
            </>

        )
    }
}

export default DashBoard