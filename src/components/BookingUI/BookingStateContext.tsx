import {
  useReducer,
  useCallback,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  initialState,
  bookingReducer,
  type FlightType,
} from './BookingReducer';
import { useGlobalContext } from '../../context.js';
import moment from 'moment';
import axios from 'axios';
import { useSnackbar } from '@store/snackbar';

interface DomesticFees {
  travelIn: number;
  travelOut: number;
  hotelFeePerDay: number;
  stayFeePerDay: number;
}

interface InternationalFees {
  [region: string]: {
    travelIn: number;
    travelOut: number;
    hotelFeePerDay: number;
    stayFeePerDay: number;
  };
}

interface LimitedOffers {
  domestic: number;
  international: number;
}

interface BookingInfo {
  title: string;
  limitedOffers: LimitedOffers;
  domestic: DomesticFees;
  international: InternationalFees;
}

interface Errors {
  flightTypeRegion: string;
  location: string;
  date: string;
  travellingFromLocation: string;
}

interface BookingContextType {
  flightType: FlightType | '';
  regionsCategory: string;
  eachRegion: string;
  withHotel: boolean;
  dateOfLeave: string;
  dateOfReturn: string;
  initialAmount: number;
  discount: number;
  amount: number;
  title: string;
  limitedOffers: LimitedOffers;
  domestic: DomesticFees;
  international: InternationalFees;
  errors: Errors;
  flightTypeSelect: (val: FlightType) => void;
  regionSelect: (prov: string, region: string) => void;
  locationSelect: (val: string) => void;
  hotelToggle: () => void;
  dateSelection: (label: string, value: string) => void;
  initialAmountSet: (fees: {
    domestic: DomesticFees;
    international: InternationalFees;
  }) => void;
  discountSet: (offers: LimitedOffers) => void;
  amountSet: () => void;
  formSubmit: (changeLoading: (val: boolean) => void) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const {
    contentModal: { isOpen, id },
    openSignInModal,
    closeModal,
    authToken,
  } = useGlobalContext();

  const { triggerSnackbar } = useSnackbar();

  // Booking Information for the form
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    title: '',
    limitedOffers: { domestic: 0, international: 0 },
    domestic: {
      travelIn: 0,
      travelOut: 0,
      hotelFeePerDay: 0,
      stayFeePerDay: 0,
    },
    international: {},
  });

  const [errors, setErrors] = useState<Errors>({
    flightTypeRegion: '',
    location: '',
    date: '',
    travellingFromLocation: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchEachDestinationInfo = async () => {
      try {
        const { data } = await axios.get(
          `https://traveloga-api.onrender.com/api/v1/destinations/${id}`,
          { signal: controller.signal },
        );
        setBookingInfo(data.destination);
      } catch (err) {
        console.log(err);
      }
    };
    if (id && isOpen) {
      fetchEachDestinationInfo();
    }
    return () => {
      controller.abort();
    };
  }, [id, isOpen]);

  const flightTypeSelect = (val: FlightType) => {
    if (errors.flightTypeRegion) {
      setErrors((prev) => ({
        ...prev,
        flightTypeRegion: '',
      }));
    }
    dispatch({
      type: 'CHANGE_FLIGHTTYPE',
      payload: { flightType: val },
    });
  };

  const regionSelect = (prov: string, region: string) => {
    if (!state.flightType) {
      setErrors((prev) => ({
        ...prev,
        flightTypeRegion: 'Flight type field is required...',
      }));
      return;
    }
    if (errors.flightTypeRegion) {
      setErrors((prev) => ({
        ...prev,
        flightTypeRegion: '',
      }));
    }
    dispatch({
      type: 'SET_REGION',
      payload: {
        regionsCategory: prov,
        travellingFromRegion: region,
      },
    });
  };

  const locationSelect = (val: string) => {
    if (!state.flightType || !state.regionsCategory) {
      setErrors((prev) => ({
        ...prev,
        flightTypeRegion: 'Flight type & Region fields are required...',
      }));
      return;
    }

    if (errors.location) {
      setErrors((prev) => ({
        ...prev,
        location: '',
      }));
    }
    dispatch({
      type: 'SET_LOCATION',
      payload: { travellingFromLocation: val },
    });
  };

  const hotelToggle = () => {
    dispatch({ type: 'HOTEL_TOGGLE' });
  };

  const dateSelection = (label: string, value: string) => {
    if (errors.date) {
      setErrors((prev) => ({
        ...prev,
        date: '',
      }));
    }

    if (label === 'Leave') {
      if (moment(value).isBefore(moment().add(1, 'month'))) {
        setErrors((prev) => ({
          ...prev,
          date: "Pick a date of leave that's more than a month of today.",
        }));
        return;
      }

      dispatch({
        type: 'DATE_CLICK',
        payload: {
          date: {
            ...state.date,
            [label]: moment(value).toISOString(),
          },
        },
      });
      return;
    }

    if (!state.date.Leave) {
      setErrors((prev) => ({
        ...prev,
        date: 'Please select first the date of your leave.',
      }));
      return;
    }
    if (moment(value).isBefore(moment(state.date.Leave))) {
      setErrors((prev) => ({
        ...prev,
        date: 'Your return date should not precede your leave date.',
      }));
      return;
    }

    dispatch({
      type: 'DATE_CLICK',
      payload: {
        date: {
          ...state.date,
          [label]: moment(value).toISOString(),
        },
      },
    });
    return;
  };

  const initialAmountSet = useCallback(
    ({
      domestic: { travelIn, travelOut, hotelFeePerDay, stayFeePerDay },
      international,
    }: {
      domestic: DomesticFees;
      international: InternationalFees;
    }) => {
      const numOfDays = moment(state.date.Return).diff(
        moment(state.date.Leave),
        'days',
      );

      if (state.flightType === 'domestic') {
        const feePerDay = state.withHotel ? hotelFeePerDay : stayFeePerDay;
        dispatch({
          type: 'INITIAL_AMOUNT_SET',
          payload: {
            initialAmount: travelIn + travelOut + feePerDay * numOfDays,
          },
        });
        return;
      }
      const internationalRegion =
        international[state.travellingFromRegion.toLowerCase()];
      if (state.flightType === 'international' && internationalRegion) {
        const { travelIn, travelOut, hotelFeePerDay, stayFeePerDay } =
          internationalRegion;
        const feePerDay = state.withHotel ? hotelFeePerDay : stayFeePerDay;
        dispatch({
          type: 'INITIAL_AMOUNT_SET',
          payload: {
            initialAmount: travelIn + travelOut + feePerDay * numOfDays,
          },
        });
      }
    },
    [
      state.date.Leave,
      state.date.Return,
      state.flightType,
      state.travellingFromRegion,
      state.withHotel,
    ],
  );

  const discountSet = useCallback(
    (offers: LimitedOffers) => {
      if (state.flightType) {
        dispatch({
          type: 'DISCOUNT_SET',
          payload: { discount: offers[state.flightType] },
        });
        return;
      }
      dispatch({
        type: 'DISCOUNT_REMOVE',
      });
    },
    [state.flightType],
  );

  const amountSet = useCallback(() => {
    if (state.discount > 0) {
      dispatch({
        type: 'FINAL_AMOUNT_SET',
        payload: {
          amount: Math.floor(state.initialAmount * (1 - state.discount / 100)),
        },
      });

      return;
    } else {
      dispatch({
        type: 'FINAL_AMOUNT_SET',
        payload: { amount: state.initialAmount },
      });
    }
  }, [state.discount, state.initialAmount]);

  const formSubmit = async (changeLoading: (val: boolean) => void) => {
    changeLoading(true);
    const {
      flightType,
      regionsCategory,
      travellingFromRegion,
      travellingFromLocation,
      withHotel,
      date: { Leave, Return },
      amount,
    } = state;

    try {
      const {
        data: { message },
      } = await axios.post(
        `https://traveloga-api.onrender.com/api/v1/bookings/${id}`,
        {
          travellingFromLocation,
          regionsCategory,
          travellingFromRegion,
          travellingTo: bookingInfo.title,
          dateOfLeave: Leave,
          dateOfReturn: Return,
          withHotel,
          flightType,
          amount,
        },
        { headers: { Authorization: `Bearer ${authToken}` } },
      );
      closeModal();
      triggerSnackbar({ type: 'success', message });
    } catch (err: any) {
      console.log(err);
      if (err.response.data.msg === 'Authentication Failed') {
        openSignInModal();
        return;
      }
      closeModal();
      triggerSnackbar({ type: 'error', message: err.response.data.msg });
    } finally {
      changeLoading(false);
    }
  };

  useEffect(() => {
    if (bookingInfo.limitedOffers) {
      discountSet(bookingInfo.limitedOffers);
    }
  }, [state.flightType, bookingInfo.limitedOffers, discountSet]);

  useEffect(() => {
    if (
      state.date.Leave &&
      state.date.Return &&
      state.travellingFromRegion &&
      bookingInfo.domestic &&
      bookingInfo.international
    ) {
      initialAmountSet({
        domestic: bookingInfo.domestic,
        international: bookingInfo.international,
      });
      return;
    }
  }, [
    state.date.Leave,
    state.date.Return,
    state.withHotel,
    state.travellingFromRegion,
    bookingInfo.domestic,
    bookingInfo.international,
    initialAmountSet,
  ]);

  useEffect(() => {
    if (state.initialAmount) {
      amountSet();
    }
  }, [amountSet, state.initialAmount]);

  const value: BookingContextType = {
    flightType: state.flightType,
    regionsCategory: state.regionsCategory,
    eachRegion: state.travellingFromRegion,
    withHotel: state.withHotel,
    dateOfLeave: state.date.Leave,
    dateOfReturn: state.date.Return,
    initialAmount: state.initialAmount,
    initialAmountSet,
    discount: state.discount,
    discountSet,
    amount: state.amount,
    amountSet,
    flightTypeSelect,
    regionSelect,
    errors,
    locationSelect,
    hotelToggle,
    dateSelection,
    title: bookingInfo.title || '',
    limitedOffers: bookingInfo.limitedOffers || {
      domestic: 0,
      international: 0,
    },
    domestic: bookingInfo.domestic || {
      travelIn: 0,
      travelOut: 0,
      hotelFeePerDay: 0,
      stayFeePerDay: 0,
    },
    international: bookingInfo.international || {},
    formSubmit,
  };

  return (
    <BookingContext.Provider {...{ value }}>{children}</BookingContext.Provider>
  );
};

const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }

  return context;
};

export default useBookingContext;
