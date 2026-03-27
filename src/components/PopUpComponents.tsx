import {
  faCircleCheck,
  faCircleXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useSnackbar } from '@store/snackbar';

const StatusSnackBar = () => {
  const { type, isOpen, message, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        closeSnackbar();
      }, 2000);
    }
  }, [closeSnackbar, isOpen]);

  return (
    <div className="fixed bottom-0 left-0 flex w-fit items-center gap-4 bg-white px-4 py-3 text-black">
      <div
        className={`flex items-center gap-2 ${
          type === 'success' ? 'text-green-600' : ''
        } ${type === 'error' ? 'text-red-600' : ''}`}>
        {type === 'success' && (
          <FontAwesomeIcon
            className="text-lg lg:text-xl"
            icon={faCircleCheck}
          />
        )}
        {type === 'error' && (
          <FontAwesomeIcon
            className="text-lg lg:text-xl"
            icon={faCircleXmark}
          />
        )}
        <h1 className="uppercase">{type}</h1>
      </div>

      <p className="text-sm text-black md:text-base">{message}</p>
      <FontAwesomeIcon
        className="button_transition text-lg text-black hover:text-amber-300 lg:text-xl"
        icon={faXmark}
        onClick={() => closeSnackbar()}
      />
    </div>
  );
};

const SignInRequiredComponent = () => {
  const { closeModal } = useGlobalContext();

  return (
    <div className="grid w-3/4 grid-flow-row grid-cols-1 items-center gap-4 bg-white px-6 py-4 lg:w-fit lg:grid-cols-2 lg:px-8 lg:py-6">
      <h1 className="text-center text-xl lg:col-span-2">
        An Account is required to do the following task/s.
      </h1>
      <button
        className="bg-[#2B8E9B]/80 py-6 text-center text-white transition-colors ease-in-out hover:bg-[#2B8E9B] lg:p-4"
        onClick={() => closeModal()}>
        Keep Scrolling
      </button>
      <Link
        className="bg-amber-200 py-6 text-center  transition-colors ease-in-out hover:bg-amber-300 hover:text-white lg:p-4"
        to="/login"
        onClick={() => closeModal()}>
        LOG IN
      </Link>
    </div>
  );
};

export { SignInRequiredComponent, StatusSnackBar };
