import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  id: string;
  toursLoading: boolean;
  title: string;
  price: number;
  image: string;
  description: string;
  duration?: string;
}

const SmallCard: React.FC<CardProps> = ({
  toursLoading,
  title,
  price,
  image,
  description,
  duration = '10 days',
  id,
}) => {
  return toursLoading ? (
    <div className="border border-gray-300 rounded-lg h-100">
      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-md dark:bg-gray-700"></div>
      <div
        role="status"
        className="p-4 rounded-lg animate-pulse md:p-6 dark:border-gray-700"
      >
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700"></div>
        <div className="flex items-center mt-4">
          <svg
            className="w-10 h-10 me-3 text-gray-100 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-100 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Link to={'/tours/' + id}>
      <div className="border border-gray-300 rounded-lg cursor-pointer hover:scale-105 transition duration-200 ease-out h-full">
        <div
          className="flex items-center justify-center h-48 rounded-t-md bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(/src/assets/img/${image})` }}
        ></div>
        <div role="status" className="p-4 md:p-6 dark:border-gray-700">
          <h1 className="text-lg font-bold pb-1">{title}</h1>
          <p className="text-sm">{description}</p>
          <div className="flex items-center mt-4">
            <img
              className="w-10 h-10 rounded-full me-3"
              src="/src/assets/img/logo-ico.png"
              alt="ico-user"
            />
            <div>
              <p className="text-sm">
                <span className="font-bold">Prezzo:</span> {price}€
              </p>
              <p className="text-sm">
                <span className="font-bold">Durata:</span> {duration}
              </p>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </Link>
  );
};

export default SmallCard;
