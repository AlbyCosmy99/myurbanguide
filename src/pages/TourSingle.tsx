import { useParams } from "react-router-dom"
import CarouselCustomNavigation from "../components/carousel/Caurosel";
import SectionContainer from "../components/SectionContainer"
import useStoreTour from "../stores/zustand/store"
import { useEffect, useState } from "react"
import Tour from "../types/Tour"




const TourSingle = () => {
    const { tours } = useStoreTour()
    const { tourId } = useParams()
    const [tour, setTour] = useState<Tour | undefined>(undefined)

    useEffect(() => {
        console.log(tours)
        const tour = tours.find((tour) => tour.id === Number(tourId))
        setTour(tour)
    }, [tours])

    return (
        <SectionContainer>
            {
                !tour ? (
                    <p>Tour not found</p>
                ) : (
                    <CarouselCustomNavigation />
                )
            }
        </SectionContainer>
    )
}

export default TourSingle