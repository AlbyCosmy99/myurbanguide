import { useEffect, useState } from 'react';
import SectionContainer from '../../SectionContainer';
import SmallCard from '../../cards/SmallCard';
import Tour from '../../../types/Tour';

const FeaturedSection = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [toursLoading, setToursLoading] = useState(true);

  useEffect(() => {
    fetch('../src/assets/data/tours.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Request error');
      })
      .then(res => {
        setTours(res.tours);
        setTimeout(() => {
          setToursLoading(false);
        }, 3000);
      });
  }, []);

  return (
    <div className="w-full pb-10">
      <SectionContainer>
        <h2 className="text-4xl font-bold text-center pt-10 pb-6">
          Annunci in evidenza
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tours.map(tour => (
            <SmallCard
              key={tour.id}
              toursLoading={toursLoading}
              title={tour.title}
              description={tour.description}
              price={tour.price}
              image={tour.image}
              duration={tour.duration}
            />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default FeaturedSection;
