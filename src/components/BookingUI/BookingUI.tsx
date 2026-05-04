import {
  faCartFlatbedSuitcase,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, type ReactNode } from 'react';
import { useGlobalContext } from '../../context';
import {
  DateOfBookingComponent,
  FlightypeAndRegionComponent,
  HotelToggleComponent,
  LocationComponent,
  PriceComponent,
} from './index';
import useBookingContext, { BookingProvider } from './BookingStateContext';

const BookingUI = () => {
  const { closeModal } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const changeLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  return (
    <BookingProvider>
      <div className="flex max-w-4xl flex-row-reverse justify-center bg-white md:w-fit">
        <FormWrapper {...{ changeLoading }}>
          <div className="relative self-end">
            <FontAwesomeIcon
              className="button_transition absolute right-0 top-0 z-10 text-2xl text-black/50 hover:text-black"
              icon={faXmark}
              onClick={() => closeModal()}
            />
          </div>
          <h1 className="font-Rubik text-xl lg:text-2xl">PLANE BOOKING</h1>
          <div className="grid h-full grid-cols-6 content-start gap-x-3 gap-y-2 md:grid-cols-10 md:gap-3">
            <FlightypeAndRegionComponent />
            <LocationComponent />
            <HotelToggleComponent />
            <DateOfBookingComponent />
            <PriceComponent />
          </div>
          <button
            className="button_transition col-span-6 flex items-center justify-center gap-3 rounded-lg bg-amber-300 py-3 hover:text-white enabled:hover:bg-amber-400 disabled:bg-amber-200"
            type="submit"
            disabled={isLoading}>
            <FontAwesomeIcon
              className="text-lg md:text-xl"
              icon={faCartFlatbedSuitcase}
            />
            <h1 className="font-semibold md:text-lg">
              {isLoading ? 'BOOKING...' : 'BOOK FLIGHT'}
            </h1>
          </button>
        </FormWrapper>
      </div>
    </BookingProvider>
  );
};

const FormWrapper = ({
  children,
  changeLoading,
}: {
  children: ReactNode;
  changeLoading: (val: boolean) => void;
}) => {
  const { formSubmit } = useBookingContext();

  return (
    <form
      className="relative flex w-full flex-col gap-2 bg-white p-6 md:gap-3 md:py-6"
      onSubmit={(e) => {
        e.preventDefault();
        formSubmit(changeLoading);
      }}>
      {children}
    </form>
  );
};
export default BookingUI;
