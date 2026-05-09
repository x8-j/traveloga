import {
  faArrowLeft,
  faArrowRight,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Reviews from '../../reviews.json';

interface Review {
  name: string;
  picture: string;
  message: string;
}

const Testimonials = () => {
  const [reviewIndex, setReviewIndex] = useState(0);
  const { message, name, picture } = Reviews[reviewIndex] as Review;

  const indexChecker = (num: number) => {
    if (num > Reviews.length - 1) {
      return Reviews.length - 1;
    }
    if (num < 0) {
      return 0;
    } else return num;
  };

  const arrowClick = (num: number) => {
    setReviewIndex((prev) => {
      let newNumber = prev + num;
      return indexChecker(newNumber);
    });
  };

  const icons = [
    [faArrowLeft, -1],
    [faArrowRight, 1],
  ] as const;

  return (
    <div className="flex justify-center sm:px-16">
      <div
        className="flex w-full max-w-7xl justify-center bg-cover bg-no-repeat md:h-[432px] md:!bg-none lg:h-[568px]"
        style={{ backgroundImage: `url("/images/testimonial.avif")` }}>
        <div className="flex h-[650px] items-center gap-8 md:h-[120px] md:w-full md:items-start md:justify-center md:bg-black/[0.80] md:px-6 md:pt-8 lg:h-[150px] lg:gap-12 lg:px-12 lg:pt-12 ">
          <div className="flex h-fit max-w-sm flex-col gap-6 bg-black/[0.80] p-8 text-white sm:p-12 md:w-full md:max-w-lg md:justify-start md:bg-transparent md:p-0">
            <div className="flex flex-col gap-2">
              <h1 className="text-center font-Rubik text-lg md:text-left lg:text-xl">
                TESTIMONIALS
              </h1>
              <h2 className="text-center text-2xl md:mb-2 md:text-left lg:mb-4 lg:text-3xl">
                What People Say About Us
              </h2>
            </div>

            <p className="text-justify text-sm md:text-black lg:text-base">
              {message}
            </p>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              {picture === '' ? (
                <FontAwesomeIcon
                  className="text-4xl md:text-black lg:text-7xl"
                  icon={faCircleUser}
                />
              ) : (
                <img
                  className="h-10 w-10 rounded-full object-cover object-center lg:h-12 lg:w-12"
                  src={picture}
                  alt=""
                />
              )}
              <h1 className=" md:text-black lg:text-lg">{name}</h1>
            </div>
            <div className="flex justify-center gap-8 md:justify-start">
              {icons.map(([icon, num], index) => (
                <FontAwesomeIcon
                  key={index}
                  className={` ${
                    reviewIndex === 0
                      ? 'first:text-white/60 last:hover:text-amber-400 md:first:text-slate-300'
                      : reviewIndex === Reviews.length - 1
                      ? 'last:text-white/60 first:hover:text-amber-400 md:last:text-slate-300'
                      : 'hover:text-amber-400'
                  } button_transition px-4 py-3 text-2xl text-amber-300  md:text-3xl`}
                  icon={icon}
                  onClick={() => arrowClick(num)}
                />
              ))}
            </div>
          </div>
          <img
            className="hidden aspect-[4/5] shrink object-cover object-center md:block md:w-[250px] lg:w-[400px]"
            src="images/testimonial.avif"
            alt="Boracay Beach"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
