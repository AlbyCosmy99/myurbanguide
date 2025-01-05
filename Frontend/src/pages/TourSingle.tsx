import { useParams } from 'react-router-dom';
import SectionContainer from '../components/SectionContainer';
import { useEffect, useState } from 'react';
import { Tour } from '../types/Tour';
import { RiCheckFill, RiCloseFill } from 'react-icons/ri';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { HiViewGridAdd } from "react-icons/hi";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import 'photoswipe/style.css';


interface Position {
  lat: number;
  lng: number;
}

const TourSingle = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState<Tour | undefined>(undefined);
  const [center, setCenter] = useState<Position | null>(null);
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    const getSingleTour = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL + 'tours/' + tourId
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setTour(data)

      } catch (error) {
        //console.error('Errore nella richiesta dei dati:', error);
      }
    }

    getSingleTour()
  }, [])


  useEffect(() => {
    setCenter({
      lat: tour ? tour.meeting_point.latitude : 0,
      lng: tour ? tour.meeting_point.longitude : 0,
    });
  }, [tour]);


  useEffect(() => {
    if (center && center.lat != 0 && center.lng != 0) {
      setMapLoading(false);
    }
  }, [center]);

  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.75rem',
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCh0pCKWB2Zq5eIRgZFzqgINDRIr-KjHVw',
  });



  return !tour ? (
    <SectionContainer>
      <p>Tour not found</p>
    </SectionContainer>
  ) : (
    <>
      <SectionContainer>
        <div className="pswp-gallery grid grid-cols-3 gap-2 relative" id={tourId}>
          {tour.gallery.slice(0, 3).map((image, index) => (
            <a
              href={import.meta.env.VITE_UPLOAD_URL + image}
              key={tour._id + '-' + index}
              target="_blank"
              rel="noreferrer"
            >
              <img className="h-40 w-full max-w-full rounded-lg object-cover object-center md:h-60" src={import.meta.env.VITE_UPLOAD_URL + image} alt={image} />
            </a>
          ))}
          <div className="flex flex-row gap-1 items-center bg-white px-4 py-2 rounded-full absolute bottom-2 right-2">
            <HiViewGridAdd size={18} />
            <p>+ {tour.gallery.length - 3} foto</p>
          </div>
        </div>

      </SectionContainer>

      <SectionContainer>
        <h2 className="text-3xl font-bold pb-8 text-[#E29C00]">
          Ispirazione per il tuo prossimo viaggio
        </h2>
        <p>{tour.description}</p>
        <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
          {
            tour.includes ?
              <div>
                <h3 className="text-xl font-semibold pb-4 text-[#E29C00]">
                  Cosa è incluso
                </h3>
                <ul className="space-y-2">
                  {
                    tour.includes.map((tourIncluded, index: number) => (
                      <li key={index} className="flex items-center">
                        <RiCheckFill size="1.6rem" className="text-green-500" />
                        {tourIncluded.title}
                      </li>

                    ))

                  }
                </ul>
              </div>
              : <></>
          }
          {
            tour.excludes ?
              <div>
                <h3 className="text-xl font-semibold pb-4 text-[#E29C00]">
                  Cosa è escluso
                </h3>
                <ul className="space-y-2">
                  {
                    tour.excludes.map((tourExcluded, index) => (
                      <li key={index} className="flex items-center">
                        <RiCloseFill size="1.6rem" className="text-red-600" />
                        {tourExcluded.title}
                      </li>
                    ))
                  }
                </ul>
              </div>
              : <></>
          }
        </div>
      </SectionContainer>
      {isLoaded && !mapLoading ? (
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
      )}
    </>
  );
};

export default TourSingle;
