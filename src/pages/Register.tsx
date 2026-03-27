import {
  faAt,
  faCompass,
  faEye,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { StatusSnackBar } from '@components/PopUpComponents';
import { useSnackbar } from '@store/snackbar';

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
const Register = () => {
  const [typeIsPassword, setTypeisPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userSignIn: userSignUp } = useGlobalContext();
  const { isOpen, triggerSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const formInputData = [
    {
      title: 'First Name:',
      inputName: 'firstname',
      icon: faUser,
      type: 'text',
    },
    {
      title: 'Last Name:',
      inputName: 'lastname',
      icon: faUser,
      type: 'text',
    },
    {
      title: 'Email:',
      inputName: 'email',
      icon: faAt,
      type: 'email',
      maxLength: 25,
    },
    {
      title: 'Password:',
      inputName: 'password',
      icon: faEye,
      type: '',
    },
  ] as const;

  const submit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const {
        data: { token, message },
      } = await axios.post(
        'https://traveloga-api.onrender.com/api/v1/auth/register',
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      setIsLoading(false);
      userSignUp(token);
      triggerSnackbar({ type: 'success', message });
      navigate('/');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      triggerSnackbar({ type: 'error', message: err.response.data.msg });
    }
  };

  if (user)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 px-16 ">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-8">
          <h1 className="text-center font-Rubik text-lg font-semibold text-red-600 lg:text-xl">
            This Page is Restriced
          </h1>
          <button className="button_transition rounded-md bg-amber-300 px-6 py-3 font-semibold text-white hover:bg-amber-400">
            <Link to="/">Return to HomePage</Link>
          </button>
        </div>
      </div>
    );

  return (
    <>
      <div className="relative flex justify-center text-white">
        <div
          className="flex h-[93vh] w-full max-w-[100rem] bg-cover bg-center bg-no-repeat  md:h-screen"
          style={{ backgroundImage: `url("/images/login-register-pic.avif")` }}>
          <div className="flex w-full flex-col gap-12 bg-gradient-to-r from-black/80 via-black/70 to-black/30 px-6 py-8 md:via-black/70 md:to-black/10 lg:from-black/70 lg:via-black/70 lg:to-transparent lg:px-8 lg:py-6">
            <div className="flex items-center gap-2 ">
              <FontAwesomeIcon
                className="mt-2 text-3xl  md:mt-0 "
                icon={faCompass}
              />
              <div className="flex flex-col ">
                <h1 className="font-Rubik text-lg lg:text-xl">TRAVELOGA</h1>
                <h1 className="whitespace-nowrap text-xs">
                  Experiencing Philippines
                </h1>
              </div>
            </div>

            <div className="flex max-w-xl flex-auto flex-col justify-between gap-8 sm:px-8 md:w-3/4 md:max-w-2xl  md:px-8">
              <div className="flex flex-col gap-2 md:gap-4">
                <h1 className="font-Rubik text-xl font-medium md:text-2xl lg:text-3xl xl:text-4xl">
                  CREATING A NEW ACCOUNT
                </h1>
                <div className="text-sm md:text-base">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="button_transition inline h-fit border-amber-300 text-amber-300 transition-all hover:border-b-[3px]">
                    LOG IN
                  </Link>
                </div>
              </div>
              <form
                className="flex h-full max-w-xl flex-col gap-16"
                onSubmit={handleSubmit(submit)}>
                <div className="flex flex-col gap-4">
                  {formInputData.map(
                    ({ title, inputName, icon, type, maxLength }, index) => (
                      <div className="flex flex-col gap-2" key={index}>
                        <div className="flex items-center justify-between">
                          <label className="md:text-lg">{title}</label>
                          {errors[inputName] && (
                            <p className="text-right text-sm text-red-600">
                              {errors[inputName].message}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-4 bg-white px-3 py-2">
                          <input
                            className="w-full bg-transparent py-1 text-black outline-none md:py-0 md:text-lg lg:text-base"
                            type={
                              !type
                                ? typeIsPassword
                                  ? 'password'
                                  : 'text'
                                : type
                            }
                            {...register(inputName, {
                              required: `This field is required.`,
                              minLength: {
                                value: 2,
                                message: 'Add more characters.',
                              },
                              maxLength: {
                                value: maxLength ?? 15,
                                message: 'Too much characters.',
                              },
                            })}
                          />
                          <FontAwesomeIcon
                            className={`text-xl ${
                              icon === faEye ? `text-amber-200` : `text-black`
                            }`}
                            icon={icon}
                            onClick={() =>
                              !type && setTypeisPassword((prev) => !prev)
                            }
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <div className="flex gap-4 lg:gap-12">
                  <Link
                    className="button_transition flex flex-1 justify-center bg-[#2B8E9B]/30 py-4 hover:bg-[#2B8E9B]/50 md:p-4"
                    to="/">
                    RETURN HOME
                  </Link>
                  <button
                    disabled={isLoading}
                    className="button_transition flex flex-1 justify-center bg-amber-300 py-4 text-center enabled:hover:bg-amber-400 disabled:bg-amber-200 md:p-4">
                    {isLoading ? 'CREATING' : 'CREATE ACCOUNT'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {isOpen && <StatusSnackBar />}
      </div>
    </>
  );
};

export default Register;
