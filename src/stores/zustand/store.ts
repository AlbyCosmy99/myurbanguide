import { create } from 'zustand'
import Tour from "../../types/Tour"

type StoreTour = {
    tours: Tour[]
    toursLoading: boolean
    getTour: () => void
}

const useStoreTour = create<StoreTour>((set) => ({

    tours: [],
    toursLoading: true,
    getTour: () => {
        set({ toursLoading: true })
        fetch('../../../src/assets/data/tours.json')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("Request error")
            })
            .then(data => {
                set({ tours: data.tours, toursLoading: false })
            })
            .catch(() => {
                set({ toursLoading: false })
                console.error("Errore nella richiesta dei dati.")
            })
    }
}))

export default useStoreTour
