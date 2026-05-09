import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useGlobalContext } from '../context';

const TransitionWrapper = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  const { isPaymentOpen, cancelPayment, contentModal, closeModal } =
    useGlobalContext();

  const transitionClose = () => {
    if (contentModal.isOpen) closeModal();
    if (isPaymentOpen.isOpen) cancelPayment();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => transitionClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-[400ms]"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className=" fixed inset-0 z-40 bg-black/80" />
        </Transition.Child>
        <div className=" fixed inset-0 z-50 flex w-full items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="flex w-full max-w-5xl justify-center">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransitionWrapper;
