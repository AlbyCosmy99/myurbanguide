import '../../App.css';
import SectionContainer from '../../components/SectionContainer';
import SmallCard from '../../components/cards/SmallCard';
import useStoreTour from '../../stores/zustand/Store';
import Slider from '../../components/slider/Slider'
import { useEffect } from 'react';
import LocationCard from '../../components/cards/LocationCard';
import img1 from '../../../src/assets/img/Airbnb-1.webp';
import img2 from '../../../src/assets/img/Airbnb-2.webp';
import img3 from '../../../src/assets/img/Airbnb-3.webp';
import img4 from '../../../src/assets/img/Airbnb-4.webp';
import newsletterImg from '../../../src/assets/img/newsletter-home.jpg';

function Home() {
  const { tours, toursLoading, getTour } = useStoreTour();

  useEffect(() => {
    getTour();
  }, []);

  return (
    <>
      <Slider />
      <SectionContainer>
        <h2 className="text-3xl font-bold pb-8 text-[#E29C00]">
          Annunci in evidenza
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tours.map(tour => (
            <SmallCard
              key={tour._id}
              toursLoading={toursLoading}
              title={tour.title}
              description={tour.description}
              price={tour.price}
              image={tour.featured_image}
              duration={tour.duration}
              id={tour._id}
            />
          ))}
        </div>
      </SectionContainer>
      <SectionContainer>
        <h2 className="text-3xl font-bold pb-8 text-[#E29C00]">
          Ispirazione per il tuo prossimo viaggio
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <LocationCard
            local_id="verona"
            img={img1}
            distance="200 chilometri di distanza"
            location="Verona"
          />
          <LocationCard
            local_id="venezia"
            img={img2}
            distance="200 chilometri di distanza"
            location="Venezia"
          />
          <LocationCard
            local_id="bormio"
            img={img3}
            distance="200 chilometri di distanza"
            location="Bormio"
          />
          <LocationCard
            local_id="bologna"
            img={img4}
            distance="200 chilometri di distanza"
            location="Bologna"
          />
          <LocationCard
            local_id="verona"
            img={img1}
            distance="200 chilometri di distanza"
            location="Verona"
          />
          <LocationCard
            local_id="venezia"
            img={img2}
            distance="200 chilometri di distanza"
            location="Venezia"
          />
          <LocationCard
            local_id="bormio"
            img={img3}
            distance="200 chilometri di distanza"
            location="Bormio"
          />
          <LocationCard
            local_id="bologna"
            img={img4}
            distance="200 chilometri di distanza"
            location="Bologna"
          />
        </div>
      </SectionContainer>
      <SectionContainer color={'#e29c0017'}>
        <div className="flex items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#E29C00] mb-4">
              Iscriviti alla Newsletter My Urban Guide
            </h2>
            <p className="text-gray-600 mb-6">
              Riceverai le migliori offerte in anteprima, curiosità e tutte
              novità del momento dal mondo My Urban Guide.
            </p>
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="*Nome"
                  className="w-full md:w-1/2 border-2 border-[#E29C00] rounded-lg p-3 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="*Cognome"
                  className="w-full md:w-1/2 border-2 border-[#E29C00] rounded-lg p-3 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="*La tua mail"
                className="w-full border-2 border-[#E29C00] rounded-lg p-3 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-600 mt-2">
                Cliccando su{' '}
                <strong className="text-[#E29C00]">ISCRIVITI</strong> esprimi il
                tuo consenso a ricevere le newsletter di Alpitour SpA. Leggi l'
                <a href="#" className="text-[#E29C00] underline">
                  informativa sulla privacy
                </a>
                .
              </p>
              <button
                type="submit"
                className="w-full md:w-auto bg-[#E29C00] text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors"
              >
                ISCRIVITI
              </button>
            </form>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="flex gap-4">
              <img
                src={newsletterImg}
                alt="Travel 1"
                className="w-full"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>

    </>
  );
}

export default Home;
