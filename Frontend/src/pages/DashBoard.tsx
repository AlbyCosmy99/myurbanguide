import SectionContainer from "../components/SectionContainer"
import useAuthStore from "../stores/zustand/AuthStore"
import useTokenPayload from "../hooks/useTokenPayload"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Tour from "../types/Tour"
import HeadersDashboard from "../components/navigation/Headings"

const DashBoard = () => {
    const { user, updateUser } = useAuthStore()
    const [userTours, setUserTours] = useState<Tour[]>([])

    const navigate = useNavigate()

    useTokenPayload()

    const logoutUser = () => {
        localStorage.removeItem('token')
        updateUser(null)
        navigate('/')
    }

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
    }, [user]);

    return (
        <>
            <SectionContainer>
                <HeadersDashboard />
            </SectionContainer>

            <SectionContainer>
                <h2 className="text-3xl font-bold pb-8 text-[#E29C00]">{`Benvenuto, ${user?.name}`}</h2>
                <p>{user?.email}</p>
                <a
                    onClick={logoutUser}
                    className="font-semibold text-[#E29C00] hover:text-[#E29C00] cursor-pointer"
                >
                    Esegui il logout
                </a>
                <h1>Tour Inseriti</h1>
                {
                    userTours.length > 0 ?
                        userTours.map(userTour => {
                            return <div key={userTour._id}>
                                <p>{userTour.title}</p>
                            </div>
                        })
                        : ""
                }
            </SectionContainer>
        </>

    )
}

export default DashBoard