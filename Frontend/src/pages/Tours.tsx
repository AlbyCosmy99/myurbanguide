import '../App.css';
import SectionContainer from '../components/SectionContainer';
import SmallCard from '../components/cards/SmallCard';
import useStoreTour from '../stores/zustand/Store';
import { useEffect } from 'react';

function Tours() {
    const { tours, toursLoading, getTour } = useStoreTour();

    useEffect(() => {
        getTour();
    }, []);

    return (
        <>
            <SectionContainer>
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

        </>
    );
}

export default Tours;
