import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGlobalContext } from '../../context';
import type { Destionation } from '../../types/Destination';

const EachOfferSelection = ({ data }: { data: Destionation[] }) => {
  const { openBookingUI } = useGlobalContext();

  if (data.length < 1) {
    return (
      <>
        <>
          <div className="flex w-full animate-pulse flex-col gap-2 shadow-md shadow-black/[0.8]  sm:flex-row sm:gap-4 sm:shadow-none md:gap-6 lg:gap-8">
            <div className="aspect-video w-full bg-slate-200 sm:w-1/2" />
            <div className="flex flex-col gap-2 sm:w-1/2">
              <div className="h-4 w-3/4 bg-slate-200 sm:w-1/2 lg:w-1/3" />
              <div className="h-2 bg-slate-200 sm:h-3" />
              <div className="h-2 bg-slate-200 sm:h-3 xl:w-1/2" />
              <div className="h-2 bg-slate-200 sm:h-3 md:w-2/3 lg:w-1/3 xl:hidden" />
              <div className="flex flex-col gap-1">
                <div className="sm:1/3 h-2 w-1/2 max-w-[10rem] bg-slate-200 sm:h-3" />
                <div className="sm:1/3 h-2 w-1/2 max-w-[10rem] bg-slate-200 sm:h-3" />
              </div>
              <div className="h-12 bg-slate-200 sm:w-1/3 sm:max-w-[12rem]"></div>
            </div>
          </div>
        </>
        <>
          <div className="flex w-full animate-pulse flex-col gap-2 shadow-md shadow-black/[0.8]  sm:flex-row sm:gap-4 sm:shadow-none md:gap-6 lg:gap-8">
            <div className="aspect-video w-full bg-slate-200 sm:w-1/2" />
            <div className="flex flex-col gap-2 sm:w-1/2">
              <div className="h-4 w-3/4 bg-slate-200 sm:w-1/2 lg:w-1/3" />
              <div className="h-2 bg-slate-200 sm:h-3" />
              <div className="h-2 bg-slate-200 sm:h-3 xl:w-1/2" />
              <div className="h-2 bg-slate-200 sm:h-3 md:w-2/3 lg:w-1/3 xl:hidden" />
              <div className="flex flex-col gap-1">
                <div className="sm:1/3 h-2 w-1/2 max-w-[10rem] bg-slate-200 sm:h-3" />
                <div className="sm:1/3 h-2 w-1/2 max-w-[10rem] bg-slate-200 sm:h-3" />
              </div>
              <div className="h-12 bg-slate-200 sm:w-1/3 sm:max-w-[12rem]"></div>
            </div>
          </div>
        </>
      </>
    );
  }

  return (
    <>
      {data.map(
        ({ title, location, _id, image, description, limitedOffers }) => (
          <div
            className="flex h-fit w-full flex-col overflow-hidden shadow-md shadow-black/[0.8] sm:flex-row sm:gap-4 sm:shadow-none md:gap-6 lg:gap-8"
            key={_id}>
            <img
              className="aspect-video w-full object-cover object-center sm:w-1/2"
              src={image}
              alt={title}
            />
            <div className="flex flex-col">
              <div className="flex flex-col gap-2 p-4 text-black/[0.9] sm:px-0 md:py-4">
                <div className="flex items-end gap-2 font-medium">
                  <h1 className="text-lg  md:text-xl lg:text-2xl">{title}, </h1>
                  <h2 className="text-sm md:text-base">{location}</h2>
                </div>
                <p className="text-left text-sm opacity-90 md:text-base">
                  {description}
                </p>
                <div className="flex flex-col gap-1">
                  {Object.entries(limitedOffers).map(([key, val]) => (
                    <div
                      className="flex items-center gap-1"
                      key={`${_id}-${key}`}>
                      <FontAwesomeIcon
                        className=" text-red-700 md:text-lg"
                        icon={faTag}
                      />
                      <h1 className="text-sm capitalize md:text-base">
                        {key}:{' '}
                      </h1>
                      <h2 className="font-semibold text-red-700 md:text-lg">
                        {val}% OFF{' '}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="button_transition flex w-full items-center justify-center bg-amber-300 px-4 py-3 hover:bg-amber-400 hover:text-white sm:w-fit md:py-2"
                onClick={() => {
                  openBookingUI(_id);
                }}>
                <p className="">ADD TO CART</p>
              </div>
            </div>
          </div>
        ),
      )}
    </>
  );
};

export default EachOfferSelection;
