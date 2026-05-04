import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useGlobalContext } from '../../context';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EachBooking = ({ eachBooking, alterBookingList }) => {
  const { setPayment, authToken, openSuccessSnackbar, openFailedSnackbar } =
    useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const cancelStatus = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const {
          data: { message, bookings },
        } = await axios.patch(
          `https://traveloga-api.onrender.com/api/v1/bookings/${id}`,
          { status: 'Cancelled' },
          { headers: { Authorization: `Bearer ${authToken}` } },
        );
        openSuccessSnackbar(message);
        alterBookingList(bookings);
      } catch (err) {
        openFailedSnackbar(err.response.data.message);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [alterBookingList, authToken, openFailedSnackbar, openSuccessSnackbar],
  );

  const deleteBooking = async (id) => {
    try {
      const {
        data: { message, bookings },
      } = await axios.delete(
        `https://traveloga-api.onrender.com/api/v1/bookings/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      );
      openSuccessSnackbar(message);
      alterBookingList(bookings);
    } catch (err) {
      openFailedSnackbar(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      Date.now() >= new Date(eachBooking.dateOfLeave).getTime() &&
      eachBooking.status === 'Cart'
    ) {
      cancelStatus(eachBooking._id);
    }
  }, [
    cancelStatus,
    eachBooking._id,
    eachBooking.dateOfLeave,
    eachBooking.status,
  ]);

  if (eachBooking) {
    const {
      travellingTo,
      travellingFromLocation,
      regionsCategory,
      flightType,
      dateOfLeave,
      dateOfReturn,
      withHotel,
      _id,
      status,
      amount,
    } = eachBooking;
    return (
      <div className="flex flex-col gap-4 border-2 border-solid border-black/50 bg-white p-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h1 className="text-sm text-black/70 lg:text-base">
                Travelling To:
              </h1>
              <p className=" md:text-lg">{travellingTo}</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm text-black/70 lg:text-base">
                Travelling From:
              </h1>
              <p className="md:text-lg">
                {travellingFromLocation}, {regionsCategory}
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm text-black/70 lg:text-base">
                Flight Type:
              </h1>
              <p className="md:text-lg">{flightType}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h1 className="text-sm text-black/70 lg:text-base">Leave:</h1>
              <p className="md:text-lg">
                {new Date(dateOfLeave).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm text-black/70 lg:text-base">Return:</h1>
              <p className="md:text-lg">
                {new Date(dateOfReturn).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm text-black/70 lg:text-base">Hotel</h1>
              <p className="md:text-lg">
                {withHotel ? `Selected` : `Not Selected`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className=" text-2xl font-semibold text-[#2B8E9B]">₱ {amount}</h1>
          {status === 'Cart' ? (
            <div className="flex gap-4 ">
              <button
                className="button_transition bg-amber-300 px-5 py-2 font-semibold hover:bg-amber-400 hover:text-white"
                onClick={(e) => {
                  setPayment(_id, amount);
                }}>
                Book
              </button>
              <button
                className="button_transition bg-amber-300 px-5 py-2 font-semibold  hover:text-white enabled:hover:bg-amber-400 disabled:bg-amber-200"
                onClick={() => cancelStatus(_id)}
                disabled={isLoading}>
                {isLoading ? 'Cancelling...' : 'Cancel'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <h1
                className={`col-span-2 flex px-4 py-2 font-semibold uppercase md:text-lg ${
                  status === 'Booked' ? `text-green-600` : `text-red-700`
                } bg-slate-100`}>
                {status}
              </h1>
              <button
                onClick={() => deleteBooking(_id)}
                className="button_transition flex items-center justify-center px-4 py-2 enabled:hover:bg-slate-100"
                disabled={isLoading}>
                <FontAwesomeIcon
                  className=" text-lg text-amber-300"
                  icon={faTrash}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <h1>No Contents found...</h1>;
  }
};

export default EachBooking;
