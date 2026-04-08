import { useParams } from 'react-router-dom';
import SectionContainer from '../components/SectionContainer';
import { useEffect, useState } from 'react';
import { Tour } from '../types/Tour';
import { RiCheckFill, RiCloseFill, RiTimeLine } from 'react-icons/ri';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { HiViewGridAdd } from 'react-icons/hi';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { MdOutlineGroups, MdLanguage } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";

interface Position {
  lat: number;
  lng: number;
}

const TourSingle = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState<Tour | undefined>(undefined);
  const [center, setCenter] = useState<Position | null>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const getSingleTour = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL + 'tours/' + tourId;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setTour(data);
      } catch (error) {
        console.error('Errore nella richiesta dei dati:', error);
      }
    };

    getSingleTour();
  }, [tourId]);

  useEffect(() => {
    setCenter({
      lat: tour?.meeting_point?.latitude || 0,
      lng: tour?.meeting_point?.longitude || 0,
    });
  }, [tour]);

  useEffect(() => {
    if (center && center.lat !== 0 && center.lng !== 0) {
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

  if (!tour) {
    return (
      <SectionContainer>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 relative">
            <div className="h-60 w-full rounded-lg bg-gray-200"></div>
            <div className="h-60 w-full rounded-lg bg-gray-200"></div>
            <div className="h-60 w-full rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </SectionContainer>
    );
  }

  // Combine featured image and gallery into one array for Lightbox and UI
  const allImages = [tour.featured_image, ...(tour.gallery || [])].filter(Boolean);
  
  return (
    <>
      <Lightbox
        index={index}
        open={open}
        close={() => setOpen(false)}
        slides={allImages.map(image => ({
          src: import.meta.env.VITE_UPLOAD_URL + image,
        }))}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        plugins={[Counter]}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .8)' } }}
      />
      
      <SectionContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tour.title}</h1>
          <div className="flex items-center text-gray-600 gap-4 text-sm font-medium">
             <span className="flex items-center gap-1"><FiMapPin /> {tour.meeting_point?.address || 'Nessun indirizzo'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 relative rounded-2xl overflow-hidden h-[450px]">
          {/* Main big image */}
          <div className="col-span-1 md:col-span-2 h-full cursor-pointer overflow-hidden relative group" onClick={() => { setIndex(0); setOpen(true); }}>
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={import.meta.env.VITE_UPLOAD_URL + allImages[0]}
              alt={tour.title}
            />
          </div>
          
          {/* Stacked images */}
          {allImages[1] && (
          <div className="hidden md:block col-span-1 h-full cursor-pointer overflow-hidden relative group" onClick={() => { setIndex(1); setOpen(true); }}>
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={import.meta.env.VITE_UPLOAD_URL + allImages[1]}
              alt={tour.title}
            />
          </div>
          )}
          {allImages[2] && (
          <div className="hidden md:block col-span-1 h-full cursor-pointer overflow-hidden relative group" onClick={() => { setIndex(2); setOpen(true); }}>
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={import.meta.env.VITE_UPLOAD_URL + allImages[2]}
              alt={tour.title}
            />
            {allImages.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity hover:bg-black/50">
                  <div className="flex items-center gap-2 text-white font-medium text-lg">
                    <HiViewGridAdd size={24} />
                    <span>+{allImages.length - 3}</span>
                  </div>
                </div>
            )}
          </div>
          )}
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Main Details */}
          <div className="w-full lg:w-2/3">
            
            {/* Quick Info Bar */}
            <div className="flex flex-wrap items-center justify-start gap-8 border-b border-gray-200 pb-6 mb-8 mt-2">
               <div className="flex items-center gap-3 text-gray-700">
                  <RiTimeLine className="text-xl" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">Durata</span>
                    <span className="text-sm">{tour.duration || 'Non specificata'}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 text-gray-700">
                  <MdOutlineGroups className="text-xl" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">Gruppo</span>
                    <span className="text-sm">{tour.additional_info?.group_size || 'Flessibile'}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 text-gray-700">
                  <MdLanguage className="text-xl" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">Lingue</span>
                    <span className="text-sm">Italiano, Inglese</span>
                  </div>
               </div>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold pb-4 text-gray-900">Highlights del Tour</h2>
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((highlight, idx) => (
                       <span key={idx} className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm">{highlight}</span>
                    ))}
                  </div>
                </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold pb-4 text-gray-900">Descrizione</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{tour.description}</p>
            </div>

            {/* Includes / Excludes */}
            <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-t border-b border-gray-200 py-8">
              <div>
                <h3 className="text-xl font-bold pb-4 text-gray-900">Cosa è incluso</h3>
                <ul className="space-y-3">
                  {tour.includes && tour.includes.map((tourIncluded, index: number) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <RiCheckFill size="1.4rem" className="text-green-600 mr-2 shrink-0 mt-1" />
                      <span>{tourIncluded.title}</span>
                    </li>
                  ))}
                  {(!tour.includes || tour.includes.length === 0) && <p className="text-gray-500 italic">Nessuna informazione</p>}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold pb-4 text-gray-900">Cosa è escluso</h3>
                <ul className="space-y-3">
                  {tour.excludes && tour.excludes.map((tourExcluded, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <RiCloseFill size="1.4rem" className="text-red-500 mr-2 shrink-0 mt-1" />
                      <span>{tourExcluded.title}</span>
                    </li>
                  ))}
                  {(!tour.excludes || tour.excludes.length === 0) && <p className="text-gray-500 italic">Nessuna informazione</p>}
                </ul>
              </div>
            </div>
            
            {/* Location Map */}
            {isLoaded && !mapLoading && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold pb-4 text-gray-900">Punto di Partenza</h2>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center ?? { lat: 0, lng: 0 }}
                  zoom={14}
                >
                  <></>
                </GoogleMap>
              </div>
            )}

          </div>

          {/* Right Column - Sticky Booking Box */}
          <div className="w-full lg:w-1/3">
             <div className="sticky top-24 bg-white border border-gray-200 shadow-xl rounded-2xl p-6">
                <div className="flex items-end gap-1 mb-6">
                   <h2 className="text-3xl font-bold text-gray-900">{tour.price}€</h2>
                   <span className="text-gray-500 mb-1">/ persona</span>
                </div>
                
                <div className="space-y-4 mb-6">
                   <div className="border border-gray-300 rounded-lg p-3">
                      <div className="text-xs font-bold text-gray-900 uppercase">Data</div>
                      <div className="text-gray-600 text-sm">Aggiungi date</div>
                   </div>
                   <div className="border border-gray-300 rounded-lg p-3">
                      <div className="text-xs font-bold text-gray-900 uppercase">Ospiti</div>
                      <div className="text-gray-600 text-sm">1 Ospite</div>
                   </div>
                </div>

                <button className="w-full bg-[#E29C00] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#c98900] transition duration-200 shadow-md">
                   Prenota ora
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">Nessun addebito al momento</p>
             </div>
          </div>

        </div>
      </SectionContainer>
    </>
  );
};

export default TourSingle;
