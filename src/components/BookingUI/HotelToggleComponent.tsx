import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useBookingContext from './BookingStateContext';

const HotelToggleComponent = () => {
  const { withHotel, hotelToggle, errors } = useBookingContext();
  return (
    <div className="col-span-2 flex flex-col gap-2 md:-order-1 md:col-span-2 md:row-span-2">
      <div className="flex flex-col">
        <h2 className="font-medium md:text-lg">Hotel</h2>
        <p className="text-sm text-black/70 md:text-black/90">
          Toggle to book/unbook.
        </p>
      </div>

      <div
        className={`${withHotel ? `bg-amber-200` : `bg-white`} ${
          errors.travellingFromLocation ? `lg:py-20` : ` lg:py-16`
        } flex h-full items-center justify-center rounded-lg ring-1 ring-black/[0.6]`}
        onClick={() => hotelToggle()}>
        <FontAwesomeIcon
          className="text-6xl md:text-8xl lg:text-8xl"
          icon={faHotel}
        />
      </div>
    </div>
  );
};

export default HotelToggleComponent;
