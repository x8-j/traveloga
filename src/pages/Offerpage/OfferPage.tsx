import React from 'react';
import OfferSelection from './OfferSelection';

const OfferPage = () => {
  return (
    <div className="flex justify-center px-8 pt-36 sm:px-16 md:pt-40">
      <div className="flex w-full max-w-7xl flex-col justify-center gap-10 md:gap-12">
        <header
          className="flex h-48 w-full max-w-7xl items-center justify-center bg-cover bg-center bg-no-repeat py-5 md:h-64 lg:h-72 "
          style={{ backgroundImage: `url("/images/offerpage-pic.avif")` }}>
          <div className="flex aspect-square w-44 flex-col items-center justify-center rounded-full bg-amber-300 p-4 text-center text-[#004852] md:w-60  ">
            <h1 className="font-Rubik text-2xl md:text-3xl lg:text-4xl">
              SUMMER PROMOS!
            </h1>
            <h2 className="text-sm md:text-base lg:text-lg ">
              Avail our limited offers only available during the summer
            </h2>
            <h3 className="text-sm font-semibold md:text-base">6/21 - 9/23</h3>
          </div>
        </header>
        <OfferSelection />
      </div>
    </div>
  );
};

export default OfferPage;
