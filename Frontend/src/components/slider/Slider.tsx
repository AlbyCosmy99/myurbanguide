import { Link } from 'react-router-dom';
import SectionContainer from '../SectionContainer';

const Slider = () => {
  return (
    <div className="w-full bg-[url('/src/assets/img/slide_bg.jpg')] bg-center bg-no-repeat bg-cover">
      <SectionContainer>
        <div className="h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] flex flex-col items-end justify-end py-10">
          <div className="w-full">
            <h2 className="text-4xl font-bold text-white py-2">
              Organizza i tuoi tour con
            </h2>
            <h1 className="text-6xl font-bold text-white py-2 pb-8">
              My Urban Guide
            </h1>
            <Link to="/tours">
              <button className="text-[#E29C00] bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
                Scopri tutti i tour
              </button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Slider;
