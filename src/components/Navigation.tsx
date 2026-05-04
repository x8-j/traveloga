import { faBars, faCompass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../context';
import BookingUI from './BookingUI/BookingUI';
import EachDestinationUI from './EachDestinationUI';
import Footer from './Footer';
import { SignInRequiredComponent, StatusSnackBar } from './PopUpComponents';
import TransitionWrapper from './TransitionWrapper';
import { useSnackbar } from '../store/snackbar';

const Nav = () => {
  const {
    user,
    contentModal: { isOpen: isContentOpen, type: contentType },
  } = useGlobalContext();

  const { isOpen } = useSnackbar();

  const navRef = useRef(null);

  const navItems = [
    ['/', 'Home'],
    ['/offers', 'Offers'],
    ['/destinations', 'Destinations'],
    ['/about-us', 'About Us'],
  ];

  const scrollUp = () => {
    navRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative flex flex-col" ref={navRef}>
      <div className="flex justify-center">
        <div className="fixed top-0 z-10 flex w-full max-w-[100rem] items-center justify-between bg-black/40 px-5 pb-6 pt-5 lg:px-12 lg:py-6">
          <div className="flex items-center gap-2 text-white">
            <FontAwesomeIcon
              className="mt-2 text-3xl  md:mt-0 "
              icon={faCompass}
            />
            <div className="flex flex-col ">
              <h1 className="font-Rubik text-lg  lg:text-xl">TRAVELOGA</h1>
              <h1 className="whitespace-nowrap text-xs  ">
                Experiencing Philippines
              </h1>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex">
            <Menu as="div" className=" sm:hidden">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="flex h-14 w-14 items-center justify-center">
                      <FontAwesomeIcon
                        className="text-3xl text-amber-300 transition-all duration-300 ease-in-out"
                        icon={open ? faXmark : faBars}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="transform opacity-0 -translate-y-1"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-150 "
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 -translate-y-1">
                    <Menu.Items className="absolute right-0 mt-6 flex items-center">
                      <div className="  flex flex-col items-center justify-around bg-white text-lg ">
                        {navItems.map(([link, title], index) => (
                          <Menu.Item onClick={() => scrollUp()} key={index}>
                            <NavLink
                              to={link}
                              className="w-full border-transparent px-6 py-4 md:text-white"
                              style={({ isActive }) => {
                                return { color: isActive ? '#fbbf24' : '' };
                              }}>
                              {title}
                            </NavLink>
                          </Menu.Item>
                        ))}
                        <Menu.Item onClick={() => scrollUp()}>
                          <NavLink
                            to={user ? '/personal-account' : '/login'}
                            className=" px-6 py-4 hover:text-amber-400"
                            style={({ isActive }) => {
                              return { color: isActive ? '#fbbf24' : '' };
                            }}>
                            {user
                              ? `${user.firstname}'s Bookings`
                              : `Login / Signup`}
                          </NavLink>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>

            {/* Non Mobile Nav */}
            <div className="right-0 hidden h-fit flex-row items-center justify-between gap-3 sm:flex md:gap-4">
              {navItems.map(([link, title], index) => (
                <NavLink
                  to={link}
                  key={index}
                  className="button_transition w-fit text-center text-white transition-all hover:border-b-[3px] hover:border-amber-300"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? '#fde68a' : '',
                      borderBottom: isActive ? `3px solid #fde68a` : ``,
                    };
                  }}
                  onClick={() => scrollUp()}>
                  {title}
                </NavLink>
              ))}
              <NavLink
                to={user ? '/personal-account' : '/login'}
                className=" button_transition rounded-3xl  bg-amber-300 px-4 py-2 text-center text-sm hover:bg-amber-300 hover:text-white lg:px-4 lg:py-3 "
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive && '#fcd34d',
                    color: isActive && 'white',
                  };
                }}
                onClick={() => scrollUp()}>
                {user ? `My Bookings` : `Login / Signup`}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-32">
        <Outlet />
        <Footer />
      </div>

      <TransitionWrapper isOpen={isContentOpen}>
        {isContentOpen && contentType === 'destination' && (
          <EachDestinationUI />
        )}
        {isContentOpen && contentType === 'booking' && <BookingUI />}
        {isContentOpen && contentType === 'signin' && (
          <SignInRequiredComponent />
        )}
      </TransitionWrapper>
      {isOpen && <StatusSnackBar />}
    </div>
  );
};

export default Nav;
