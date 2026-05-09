import { useState } from 'react';
import { useGlobalContext } from '../context';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from '../store/snackbar';
import type { Booking } from '../types/Booking';

const PaymentModal = ({
  alterBookingList,
}: {
  alterBookingList: (bookings: Booking[]) => void;
}) => {
  const {
    authToken,
    isPaymentOpen: { id, value },
    cancelPayment,
  } = useGlobalContext();

  const { triggerSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const verifiedPayment = async () => {
    setIsLoading(true);
    try {
      const {
        data: { bookings, message },
      } = await axios.patch(
        `https://traveloga-api.onrender.com/api/v1/bookings/${id}`,
        { status: 'Booked' },
        { headers: { Authorization: `Bearer ${authToken}` } },
      );
      triggerSnackbar({ type: 'success', message });
      alterBookingList(bookings);
    } catch (err: any) {
      console.log(err);
      triggerSnackbar({ type: 'error', message: err.response.data.message });
    } finally {
      setIsLoading(false);
      cancelPayment();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-white px-6 py-6 lg:w-fit lg:px-8 lg:py-6">
      <FontAwesomeIcon className="text-4xl" icon={faCashRegister} />
      <div className="flex flex-col items-center">
        <h1 className="font-Rubik text-lg lg:text-xl">Payment Confirmation</h1>
        <h2>Amount: {value}</h2>
      </div>
      <div className="flex w-full items-center gap-2 font-semibold">
        <button
          className="button_transition flex-1 bg-amber-300 py-2 hover:bg-amber-400 hover:text-white"
          onClick={(e) => {
            cancelPayment();
          }}>
          Cancel
        </button>
        <button
          className="button_transition flex-1 bg-amber-300 py-2 hover:text-white enabled:hover:bg-amber-400 disabled:bg-amber-200"
          onClick={() => verifiedPayment()}
          disabled={isLoading}>
          {isLoading ? 'Paying...' : 'Pay'}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
