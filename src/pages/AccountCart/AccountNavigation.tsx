import {
  faCaretDown,
  faCartFlatbedSuitcase,
  faFilter,
  faList,
  faMoneyBills,
  faPassport,
  faPlaneSlash,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';

export type BookingFilter = 'Cart' | 'Booked' | 'Cancelled' | 'Refunded' | '';

interface AccountNavigationProps {
  bookingFilter: BookingFilter;
  setFilter: (Value: BookingFilter) => void;
}
const AccountNavigation = ({
  bookingFilter,
  setFilter,
}: AccountNavigationProps) => {
  const { user, userSignOut } = useGlobalContext();
  const navigate = useNavigate();

  const signOut = () => {
    userSignOut();
    navigate('/');
  };

  const navList = [
    [faList, ''],
    [faCartFlatbedSuitcase, 'Cart'],
    [faPassport, 'Booked'],
    [faPlaneSlash, 'Cancelled'],
    [faMoneyBills, 'Refunded'],
  ] as const;

  return (
    <div className="flex justify-center bg-[#423F3F] px-6 py-4 sm:px-16">
      <div className="flex h-fit w-full items-center justify-between gap-3 text-center text-sm text-white md:text-base">
        <div className="flex flex-col items-start sm:items-center md:flex-row md:gap-4">
          <h1 className="whitespace-nowrap">
            {user ? `${user.firstname}, ${user.lastname}` : `username`}
          </h1>
          <h1 className="whitespace-nowrap">{user ? user.email : `email`}</h1>
        </div>
        <div className="flex items-center gap-4 sm:w-full sm:flex-row-reverse">
          <button
            className="button_transition flex items-center justify-center gap-2 px-3 py-2 text-amber-300 hover:text-amber-400 sm:flex-col sm:rounded-lg sm:bg-amber-300 sm:text-white sm:hover:bg-amber-400 sm:hover:text-white md:p-2 md:px-4"
            onClick={() => signOut()}>
            <FontAwesomeIcon className="text-lg lg:text-xl" icon={faPowerOff} />
            <h1 className="hidden md:block">Log Out</h1>
          </button>
          <Menu as="div" className="relative sm:hidden">
            <Menu.Button className="flex">
              <div className="flex items-center gap-2 lg:text-lg ">
                <div className="flex items-center gap-1 ">
                  <h1>Filter</h1>
                  <FontAwesomeIcon className="" icon={faFilter} />
                </div>
                <FontAwesomeIcon className="" icon={faCaretDown} />
              </div>
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="button_transition absolute right-0 mt-7 flex origin-top-right flex-col bg-white text-black">
                {navList.map(([icon, title], index) => (
                  <Menu.Item
                    onClick={() => {
                      setFilter(title);
                    }}
                    key={index}>
                    <div
                      className={`button_transition flex w-full cursor-pointer items-center justify-between gap-3 p-4 hover:text-amber-300 ${
                        title === bookingFilter ? `text-amber-300` : ``
                      }`}>
                      <p className="text-sm md:block md:text-base">
                        {title === '' ? `All` : title}
                      </p>
                      <FontAwesomeIcon
                        className="text-2xl md:text-3xl"
                        icon={icon}
                      />
                    </div>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <div className=" hidden w-full max-w-xl sm:flex">
            {navList.map(([icon, title], index) => (
              <div
                className={`button_transition flex flex-1 cursor-pointer flex-col items-center justify-between gap-3 p-4 hover:text-amber-300 ${
                  title === bookingFilter ? `text-amber-300` : ``
                }`}
                onClick={() => {
                  setFilter(title);
                }}
                key={index}>
                <FontAwesomeIcon className="text-xl " icon={icon} />
                <p className="text-sm md:block md:text-base">
                  {title === '' ? `All` : title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountNavigation;
