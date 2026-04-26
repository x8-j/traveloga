import useBookingContext from './BookingStateContext';
import flights from '../../mockdata.json';
import type { FlightType } from './BookingReducer';
import type { Location } from '../../types/Location';

const FlightypeAndRegionComponent = () => {
  const { flightType, flightTypeSelect, regionSelect, errors } =
    useBookingContext();
  return (
    <div className="col-span-6 flex flex-col gap-2 md:order-first md:col-span-8">
      <div className="flex flex-col">
        <h2 className="font-medium md:text-lg">Flight type & Region</h2>
        {errors.flightTypeRegion ? (
          <p className="text-sm text-red-600">{errors.flightTypeRegion}</p>
        ) : (
          <p className="text-sm text-black/70 md:text-black/90 ">
            Choose a flight type then pick which region your coming from.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="relative flex flex-col">
          <label className="absolute left-3 top-1 z-10 text-xs text-black/80 md:text-sm md:text-black">
            Flight Type
          </label>
          <select
            className="button_transition overflow-hidden truncate rounded-lg pb-2 pl-2 pt-6 shadow-md outline-amber-300 ring-1 ring-slate-600 md:text-lg"
            onChange={(e) =>
              flightTypeSelect(e.currentTarget.value as FlightType)
            }
            autoFocus
            required>
            <option value="">___</option>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
          </select>
        </div>
        <div className="relative flex flex-col">
          <label className="absolute left-3 top-1 z-10 text-xs text-black/80 md:text-sm">
            Region
          </label>
          <select
            className="button_transition truncate rounded-lg pb-2 pl-2 pt-6 shadow-md outline-amber-300 ring-1 ring-slate-600 disabled:bg-slate-300 group-active:bg-white md:text-lg"
            onChange={(e) => {
              const [eachProv, region] = e.currentTarget.value.split(',');
              if (!region || !eachProv) return;
              regionSelect(eachProv, region);
            }}
            required
            disabled={!flightType}>
            <option value="">___</option>
            {flightType &&
              (flights as Location)[flightType].map(
                ({ region, location }, index) => (
                  <optgroup
                    className="font-medium capitalize"
                    key={index}
                    label={region}>
                    {Object.keys(location).map((eachProvince, index) => (
                      <option
                        className="capitalize"
                        key={index}
                        value={[eachProvince, region]}>
                        {eachProvince}
                      </option>
                    ))}
                  </optgroup>
                ),
              )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FlightypeAndRegionComponent;
