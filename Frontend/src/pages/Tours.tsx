import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../App.css';
import SectionContainer from '../components/SectionContainer';
import SmallCard from '../components/cards/SmallCard';
import useStoreTour from '../stores/zustand/Store';

function Tours() {
  const { tours, toursLoading, getTour } = useStoreTour();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '6', 10);

  useEffect(() => {
    getTour(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  return (
    <SectionContainer>
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
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-10">
        <div>
          <p className="text-sm text-gray-700">
            Visualizzati da{' '}
            <span className="font-medium">{(page - 1) * limit + 1}</span> a{' '}
            <span className="font-medium">
              {Math.min(page * limit, tours.total)}
            </span>{' '}
            di <span className="font-medium">{tours.total}</span> risultati
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            {Array.from(
              { length: tours.totalPages },
              (_, index) => index + 1,
            ).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === pageNumber
                    ? 'bg-[#E29C00] text-white'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === tours.totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </SectionContainer>
  );
}

export default Tours;
