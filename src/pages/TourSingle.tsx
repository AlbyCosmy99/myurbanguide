import { useParams } from "react-router-dom"
import SectionContainer from "../components/SectionContainer"
import useStoreTour from "../stores/zustand/store"
import { useEffect, useState } from "react"
import Tour from "../types/Tour"

const TourSingle = () => {
    const { tours } = useStoreTour()
    const { tourId } = useParams()
    const [tour, setTour] = useState<Tour | undefined>(undefined)

    useEffect(() => {
        const tour = tours.find((tour) => tour.id === Number(tourId))
        setTour(tour)
    }, [tours])


    return (
        <SectionContainer>
            {
                !tour ? (
                    <p>Tour not found</p>
                ) : (
                    <h2 key={tour.id} className="text-3xl font-bold pb-8 text-[#E29C00]">
                        {tour.title}
                    </h2>
                )
            }
        </SectionContainer>
    )
}

export default TourSingle