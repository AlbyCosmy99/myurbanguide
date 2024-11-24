import { useParams } from "react-router-dom"
import { Carousel } from "@material-tailwind/react";
import SectionContainer from "../components/SectionContainer"
import useStoreTour from "../stores/zustand/Store"
import { useEffect, useState } from "react"
import Tour from "../types/Tour"
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'


interface Position {
    lat: number,
    lng: number
}

const TourSingle = () => {
    const { tours } = useStoreTour()
    const { tourId } = useParams()
    const [tour, setTour] = useState<Tour | undefined>(undefined)
    const [center, setCenter] = useState<Position | null>(null)
    const [mapLoading, setMapLoading] = useState(true)

    useEffect(() => {
        const tour = tours.find((tour) => tour.id === Number(tourId))
        console.log(tour?.meeting_point)
        setCenter({
            lat: tour ? tour.meeting_point.latitude : 0,
            lng: tour ? tour.meeting_point.longitude : 0,
        })
        setTour(tour)
    }, [tours])

    useEffect(() => {
        if (center && center.lat != 0 && center.lng != 0) {
            setMapLoading(false)
            console.log(center)
        }
    }, [center])

    const containerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '0.75rem',
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCh0pCKWB2Zq5eIRgZFzqgINDRIr-KjHVw',
    })

    return !tour ? (
        <p>Tour not found</p>
    ) : (
        <>
            <SectionContainer>
                {/* @ts-ignore */}
                <Carousel
                    className="rounded-xl"
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                            {new Array(length).fill("").map((_, i) => (
                                <span
                                    key={i}
                                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                        }`}
                                    onClick={() => setActiveIndex(i)}
                                />
                            ))}
                        </div>
                    )}
                >
                    {

                        tour.gallery.map((galleryImage, index) => (
                            <img
                                key={index}
                                src={`/src/assets/img/${galleryImage}`}
                                alt="image 3"
                                className=" w-full object-cover"
                            />
                        ))


                    }
                </Carousel>
            </SectionContainer>

            <SectionContainer>
                <h2 className="text-3xl font-bold pb-8 text-[#E29C00]">Ispirazione per il tuo prossimo viaggio</h2>
                <p>{tour.description}</p>
                <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <h3 className="text-xl font-semibold pb-4 text-[#E29C00]">Cosa è incluso</h3>
                        <ul className="space-y-2">
                            {
                                tour.includes.map((tourIncluded, index) => (
                                    <li key={index} className="flex items-center">
                                        <RiCheckFill size="1.6rem" className="text-green-500" />
                                        {tourIncluded}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold pb-4 text-[#E29C00]">Cosa è escluso</h3>
                        <ul className="space-y-2">
                            {
                                tour.excludes.map((tourExcluded, index) => (
                                    <li key={index} className="flex items-center">
                                        <RiCloseFill size="1.6rem" className="text-red-600" />
                                        {tourExcluded}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </SectionContainer>
            {
                isLoaded && !mapLoading ? (
                    <SectionContainer>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center ?? { lat: 0, lng: 0 }}
                            zoom={10}
                        >
                            {/* Child components, such as markers, info windows, etc. */}
                            <></>
                        </GoogleMap>
                    </SectionContainer>
                ) : (
                    <></>
                )
            }
        </>
    )
}


export default TourSingle