import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useBookingContext from './BookingStateContext';
import flights from '../../mockdata.json';
import type { Location } from '../../types/Location';

const LocationComponent = () => {
  const {
    flightType,
    title,
    limitedOffers,
    regionsCategory,
    locationSelect,
    errors,
  } = useBookingContext();

  return (
    <div className="col-span-4 flex h-fit flex-col gap-2 md:col-span-4">
      <div className="flex flex-col">
        <h2 className="font-medium md:text-lg">Location</h2>
        {errors.travellingFromLocation ? (
          <p className="text-sm text-red-600">
            {errors.travellingFromLocation}
          </p>
        ) : (
          <p className="text-sm text-black/70 md:text-black/90">
            Pick the location you’re coming from.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-1">
        <div className="relative flex flex-col">
          <label className="absolute left-3 top-1 z-10 text-xs text-black/80 md:text-sm md:text-black">
            Travelling From:
          </label>
          <select
            disabled={!regionsCategory}
            className="button_transition truncate rounded-lg pb-2 pl-2 pt-6 shadow-md outline-amber-300 ring-1 ring-slate-600 disabled:bg-slate-300 group-active:bg-white md:text-lg"
            onChange={(e) => locationSelect(e.currentTarget.value)}
            required>
            <option className="" value="">
              ___
            </option>
            {flightType &&
              regionsCategory &&
              (flights as Location)[flightType]
                .find(({ location }) =>
                  Object.hasOwn(location, regionsCategory),
                )
                ?.['location']?.[regionsCategory]?.map((eachLocation, index) => (
                  <option
                    className="capitalize"
                    key={index}
                    value={eachLocation}>
                    {eachLocation}
                  </option>
                ))}
          </select>
        </div>
        <div className="relative flex flex-col overflow-hidden rounded-lg pb-1 pl-3 pr-6 pt-1 shadow-md ring-1 ring-slate-600">
          <h1 className="text-xs text-black/80 md:text-sm md:text-black">
            Travelling To:
          </h1>
          <h2 className="md:text-lg">{title}</h2>
          {flightType && limitedOffers[flightType] > 0 && (
            <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center pr-4">
              <FontAwesomeIcon
                icon={faTag}
                className="text-lg text-[#2B8E9B] md:text-xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
