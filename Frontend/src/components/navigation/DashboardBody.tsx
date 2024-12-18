import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import SmallCard from "../cards/SmallCard"
import SectionContainer from "../SectionContainer"
import { TbTrash } from "react-icons/tb"
import useAuthStore from "../../stores/zustand/AuthStore"
import { useEffect, useState } from "react"
import useTokenPayload from "../../hooks/useTokenPayload"
import Tour from "../../types/Tour"

const DashboardBody = () => {
    const { user } = useAuthStore()
    const [userTours, setUserTours] = useState<Tour[]>([])
    const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean | undefined>(false)

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

    const deleteTour = async (tourId: string) => {
        try {
            const url = 'http://localhost:3030/tours/' + tourId;
            const res = await fetch(url, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            console.log(`Tour con ID ${tourId} eliminato con successo.`);
        } catch (error) {
            console.error('Errore nella richiesta DELETE:', error);
        }
    }

    return (
        <SectionContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                    userTours.length > 0 ?
                        userTours.map(userTour => {

                            return (
                                <div key={userTour._id} className="relative">
                                    <SmallCard
                                        toursLoading={false}

                                        title={userTour.title}
                                        description={userTour.description}
                                        price={userTour.price}
                                        image={userTour.featured_image}
                                        duration={userTour.duration}
                                        id={userTour._id}
                                    />
                                    <p className="absolute bg-red-800 text-white w-8 h-8 rounded-full flex items-center justify-center top-2 right-2 hover:scale-105 cursor-pointer" onClick={() => setConfirmationModalOpen(true)}><TbTrash /></p>
                                    <Dialog open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)} className="relative z-10">
                                        <DialogBackdrop
                                            transition
                                            className="fixed inset-0 bg-gray-900/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                                        />

                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                <DialogPanel
                                                    transition
                                                    className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-6 text-center"
                                                >
                                                    <h2 className="font-bold text-gray-800 sm:truncate sm:text-2xl sm:tracking-tight mb-3">Sei sicuro di voler eliminare il tour?</h2>
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-full bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full justify-center"
                                                        onClick={() => deleteTour(userTour._id)}
                                                    >
                                                        <TbTrash aria-hidden="true" className="-ml-0.5 mr-1.5 size-4" />
                                                        Elimina Tour
                                                    </button>
                                                </DialogPanel>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            )
                        })
                        : ""
                }
            </div>
        </SectionContainer>
    )
}


export default DashboardBody;