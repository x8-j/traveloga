import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import AccountNavigation, { type BookingFilter } from './AccountNavigation';
import BookingsList from './BookingsList';
import TransitionWrapper from '../../components/TransitionWrapper';
import PaymentModal from '../../components/PaymentModal';
import type { Booking } from '../../types/Booking';

const PersonalAccount = () => {
  const {
    user,
    isPaymentOpen: { isOpen },
  } = useGlobalContext();
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>('');
  const [listOfBookings, setListOfBookings] = useState<Booking[]>([]);

  const setFilter = (val: BookingFilter) => {
    setBookingFilter(val);
  };

  const alterBookingList = (data: Booking[]) => {
    setListOfBookings(data);
  };

  if (!user)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 px-16 ">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-8">
          <h1 className="text-center font-Rubik text-lg font-semibold text-red-600 lg:text-xl">
            You need to log in to access this page
          </h1>
          <button className="button_transition rounded-md bg-amber-300 px-6 py-3 font-semibold text-white hover:bg-amber-400">
            <Link to="/login">LOGIN</Link>
          </button>
        </div>
      </div>
    );

  return (
    <div className="relative">
      <div className="flex justify-center pt-[6.2rem] sm:pt-[5.5rem] lg:pt-[5.7rem]">
        <div className="flex w-full max-w-[100rem] flex-col">
          <AccountNavigation {...{ bookingFilter, setFilter }} />
          <BookingsList
            {...{ listOfBookings, alterBookingList, bookingFilter }}
          />
        </div>
      </div>
      <TransitionWrapper isOpen={isOpen}>
        {isOpen && <PaymentModal {...{ alterBookingList }} />}
      </TransitionWrapper>
    </div>
  );
};

export default PersonalAccount;
