import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useGlobalContext } from '../context.js';

const EachDestinationUI = () => {
  const [destinationInfo, setDestinationInfo] = useState(null);
  const bookingButton = useRef(null);
  const {
    contentModal: { id, isOpen },
    openBookingUI,
    closeModal,
  } = useGlobalContext();

  useEffect(() => {
    const controller = new AbortController();
    const fetchEachDestinationInfo = async () => {
      try {
        const { data } = await axios.get(
          `https://traveloga-api.onrender.com/api/v1/destinations/${id}`,
          { signal: controller.signal },
        );
        setDestinationInfo(data.destination);
      } catch (err) {
        console.log(err);
      }
    };
    if (id && isOpen) {
      fetchEachDestinationInfo();
    }
    return () => controller.abort();
  }, [id, isOpen]);

  if (!destinationInfo) {
    return (
      <div className="relative flex w-full animate-pulse flex-col sm:flex-row">
        <div className="relative sm:hidden">
          <FontAwesomeIcon
            className="button_transition absolute right-0 py-2 px-4 text-2xl text-slate-500 hover:text-amber-300"
            icon={faXmark}
            onClick={() => closeModal()}
          />
        </div>
        <div className="aspect-video w-full bg-slate-200" />
        <div className="flex w-full flex-col bg-white py-4 px-8 sm:absolute sm:inset-y-0 sm:right-0 sm:h-full sm:w-1/2 sm:max-w-xs sm:px-4 sm:py-2">
          <div className="relative hidden self-end sm:block">
            <FontAwesomeIcon
              className="button_transition absolute right-0 text-2xl text-slate-500 hover:text-amber-300"
              icon={faXmark}
              onClick={() => closeModal()}
            />
          </div>
          <div className="flex w-full flex-col gap-4 sm:grow sm:justify-around ">
            <div className="flex flex-col items-center gap-1">
              <div className="h-4 w-1/2 bg-slate-200" />
              <div className="h-2 w-1/3 bg-slate-200" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-slate-200 lg:h-4" />
              <div className="h-3 bg-slate-200 lg:h-4" />
              <div className="h-3 bg-slate-200 lg:h-4" />
              <div className="h-3 w-1/2 bg-slate-200 lg:h-4" />
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <div className="flex flex-col gap-1">
                <div className="h-4 w-1/2 max-w-[120px] bg-slate-200 lg:h-5" />
                <div className="grid grid-cols-3 gap-4 lg:grid-cols-2 ">
                  <div className=" h-4 bg-slate-200 lg:h-5 " />
                  <div className=" h-4 bg-slate-200 lg:h-5 " />
                  <div className=" h-4 bg-slate-200 lg:h-5 " />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-4 w-1/2 max-w-[120px] bg-slate-200 lg:h-5" />
                <div className=" grid grid-cols-3 gap-4 lg:grid-cols-2 ">
                  <div className=" h-4 bg-slate-200 lg:h-5 " />
                  <div className=" h-4 bg-slate-200 lg:h-5 " />
                  <div className=" h-4 bg-slate-200 lg:h-5 " />
                  <div className=" h-4 bg-slate-200 lg:h-5 " />
                  <div className=" h-4 bg-slate-200 lg:h-5 " />
                </div>
              </div>
            </div>
            <div className="h-12 w-full self-center bg-slate-200 sm:w-40" />
          </div>
        </div>
      </div>
    );
  }

  const { title, location, description, image, international } =
    destinationInfo;

  return (
    <div className="relative flex w-full flex-col sm:flex-row">
      <div className="relative sm:hidden">
        <FontAwesomeIcon
          className="button_transition absolute right-0 bg-amber-400/70 py-2 px-4 text-2xl hover:text-white"
          icon={faXmark}
          onClick={() => closeModal()}
        />
      </div>

      <img
        className=" aspect-video object-cover object-center "
        src={image}
        alt={title}
      />
      <div className="flex w-full flex-col bg-white py-4 px-8 sm:absolute sm:inset-y-0 sm:right-0 sm:h-full sm:w-1/2 sm:max-w-xs sm:px-4 sm:py-2">
        <div className="relative hidden self-end sm:block">
          <FontAwesomeIcon
            className="button_transition absolute right-0 text-2xl hover:text-amber-300"
            icon={faXmark}
            onClick={() => closeModal()}
          />
        </div>

        <div className="flex flex-col items-center gap-4 sm:grow sm:justify-around">
          <div className="flex flex-col gap-2 sm:grow sm:justify-around">
            <div className="flex flex-col">
              <h1 className=" whitespace-nowrap text-center text-lg font-semibold lg:text-xl">
                {title}
              </h1>
              <h2 className="text-center text-sm opacity-80 md:text-base">
                {location}
              </h2>
            </div>
            <p className="text-center text-sm lg:text-base">{description}</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h1 className="lg:text-lg">Domestic</h1>
                <div className="grid grid-cols-3 gap-4 text-center text-sm text-[#2B8E9B] lg:grid-cols-2 lg:text-base">
                  <span className=" py-1 shadow shadow-black/30 ">Luzon</span>
                  <span className=" py-1 shadow shadow-black/30">Visayas</span>
                  <span className=" py-1 shadow shadow-black/30">Mindanao</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="lg:text-lg">International</h1>
                <div className=" grid grid-cols-3 gap-4 text-center text-sm capitalize text-[#2B8E9B] lg:grid-cols-2 lg:text-base">
                  {Object.keys(international).map((eachRegion, index) => (
                    <span className="py-1 shadow shadow-black/30 " key={index}>
                      {eachRegion === 'southeastAsia'
                        ? `S.E. Asia`
                        : eachRegion}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            className="button_transition flex w-full items-center justify-center bg-amber-300 py-3 text-lg font-semibold text-black hover:bg-amber-400 hover:text-white sm:w-fit sm:py-2 sm:px-5 lg:py-3 lg:px-6 lg:text-xl"
            onClick={() => openBookingUI()}
            ref={bookingButton}>
            BOOK NOW!
          </button>
        </div>
      </div>
    </div>
  );
};

export default EachDestinationUI;
