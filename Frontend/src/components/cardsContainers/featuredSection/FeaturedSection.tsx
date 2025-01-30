import SectionContainer from '../../SectionContainer';
import SmallCard from '../../cards/SmallCard';
import useStoreTour from "../../../stores/zustand/Store";

const FeaturedSection = () => {
  const { tours, toursLoading } = useStoreTour();

  return (
    <div className="w-full pb-10">
      <SectionContainer>
        <h2 className="text-4xl font-bold text-center pt-10 pb-6">
          Annunci in evidenza
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tours.data.map(tour => (
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
    </div>
  );
};

export default FeaturedSection;
