import axios from 'axios';
import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context';
import EachBooking from './EachBooking';

const BookingsList = ({ listOfBookings, alterBookingList, bookingFilter }) => {
  const { authToken } = useGlobalContext();
  const bookingListValues = ['Cart', 'Booked', 'Cancelled', 'Refunded'];

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://traveloga-api.onrender.com/api/v1/bookings',
          { headers: { Authorization: `Bearer ${authToken}` } },
          { signal: controller.signal },
        );
        alterBookingList(data);
      } catch (err) {
        if (axios.isCancel(err)) return console.log('fetch cancelled!');
        console.log(err);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [authToken, alterBookingList]);

  if (bookingFilter) {
    return (
      <div className="flex w-full flex-col gap-2 p-4 md:bg-black/10">
        <h1 className="font-Rubik text-lg font-semibold lg:text-xl">
          {bookingFilter.toUpperCase()}
        </h1>
        <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {listOfBookings &&
            listOfBookings
              .filter((eachBooking) => eachBooking.status === bookingFilter)
              .map((eachBooking, index) => (
                <EachBooking
                  {...{ eachBooking, alterBookingList }}
                  key={index}
                />
              ))}
        </div>
      </div>
    );
  }
  return (
    <>
      {bookingListValues.map((title, index1) => (
        <div
          className="flex w-full flex-col gap-2 p-4 odd:bg-black/10 md:odd:bg-white md:even:bg-black/10"
          key={index1}>
          <h1 className="font-Rubik text-lg font-semibold lg:text-xl">
            {title.toUpperCase()}
          </h1>
          <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {listOfBookings &&
              listOfBookings
                .filter((eachBooking) => eachBooking.status === title)
                .map((eachBooking, index) => (
                  <EachBooking
                    {...{ eachBooking, alterBookingList }}
                    key={index}
                  />
                ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default BookingsList;
