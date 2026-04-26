export type FlightType = 'domestic' | 'international';

interface BookingState {
  flightType: FlightType | '';
  regionsCategory: string;
  travellingFromRegion: string;
  travellingFromLocation: string;
  withHotel: boolean;
  date: {
    Leave: string;
    Return: string;
  };
  initialAmount: number;
  discount: number;
  amount: number;
}

type ActionType =
  | 'CHANGE_FLIGHTTYPE'
  | 'SET_REGION'
  | 'SET_LOCATION'
  | 'SET_EACHREGION'
  | 'REMOVE_EACHREGION'
  | 'HOTEL_TOGGLE'
  | 'LEAVE_BUTTON_CLICK'
  | 'RETURN_BUTTON_CLICK'
  | 'DATE_CLICK'
  | 'DISCOUNT_SET'
  | 'DISCOUNT_REMOVE'
  | 'INITIAL_AMOUNT_SET'
  | 'FINAL_AMOUNT_SET'
  | 'CLOSE';

interface Action {
  type: ActionType;
  payload?: Partial<BookingState>;
}

const initialState: BookingState = {
  flightType: '',
  regionsCategory: '',
  travellingFromRegion: '',
  travellingFromLocation: '',
  withHotel: false,
  date: {
    Leave: '',
    Return: '',
  },
  initialAmount: 0,
  discount: 0,
  amount: 0,
};

const bookingReducer = (state: BookingState, action: Action): BookingState => {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_FLIGHTTYPE':
      return {
        ...state,
        ...payload,
        // flightType: payload,
        regionsCategory: '',
        travellingFromRegion: '',
        travellingFromLocation: '',
        initialAmount: 0,
        amount: 0,
      };
    case 'SET_REGION':
      return {
        ...state,
        ...payload,
        // travellingFromRegion: payload.region,
        // regionsCategory: payload.prov,
        travellingFromLocation: '',
        initialAmount: 0,
        amount: 0,
      };
    case 'SET_LOCATION':
      return {
        ...state,
        ...payload,
        // travellingFromLocation: payload,
        initialAmount: 0,
        amount: 0,
      };
    case 'SET_EACHREGION':
      return {
        ...state,
        ...payload,
        // travellingFromRegion: payload.eachRegion,
        // travellingFromLocation: payload.location,
        initialAmount: 0,
        amount: 0,
      };

    case 'REMOVE_EACHREGION':
      return {
        ...state,
        travellingFromRegion: '',
        travellingFromLocation: '',
        initialAmount: 0,
        amount: 0,
      };
    case 'HOTEL_TOGGLE':
      return { ...state, withHotel: !state.withHotel, amount: 0 };
    case 'LEAVE_BUTTON_CLICK':
      return {
        ...state,
        ...payload,
        // date: { ...state.date, Leave: payload, Return: '' },
        initialAmount: 0,
        amount: 0,
      };
    case 'RETURN_BUTTON_CLICK':
      return {
        ...state,
        ...payload,
        // date: { ...state.date, Return: payload }
      };
    case 'DATE_CLICK':
      return {
        ...state,
        date: {
          ...state.date,
          ...payload?.date,
          // [payload.label]: payload.value
        },
      };
    case 'DISCOUNT_SET':
      return {
        ...state,
        ...payload,
        // discount: payload,
        amount: 0,
      };
    case 'DISCOUNT_REMOVE':
      return { ...state, ...payload, discount: 0, amount: 0 };
    case 'INITIAL_AMOUNT_SET':
      return {
        ...state,
        ...payload,
        // initialAmount: payload,
        amount: 0,
      };
    case 'FINAL_AMOUNT_SET':
      return {
        ...state,
        ...payload,
        // amount: payload,
      };
    case 'CLOSE':
      return initialState;
    default:
      return state;
  }
};

export { initialState, bookingReducer };
