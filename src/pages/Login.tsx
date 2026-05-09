import {
  faAt,
  faCompass,
  faEye,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

interface FormValues {
  email: string;
  password: string;
}

interface FormInputs {
  title: string;
  inputName: keyof FormValues;
  icon: IconDefinition;
  type: string;
  maxLength?: number;
}

const Login = () => {
  const [typeIsPassword, setTypeisPassword] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();
  const { user, userSignIn } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formInputData: FormInputs[] = [
    {
      title: 'Email:',
      inputName: 'email',
      icon: faAt,
      type: 'text',
    },
    {
      title: 'Password:',
      inputName: 'password',
      icon: faEye,
      type: typeIsPassword ? 'password' : 'text',
    },
  ];

  const submit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const { data: token } = await axios.post(
        'https://traveloga-api.onrender.com/api/v1/auth/login',
        data,
        { headers: { 'Content-Type': 'application/json' } },
      );
      setIsLoading(false);
      userSignIn(token);
      navigate('/');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError('email', {
        type: 'login',
        message: 'Your email and/or password is wrong',
      });
      setError('password', {
        type: 'login',
        message: 'Your email and/or password is wrong',
      });
    }
  };

  if (user) {
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
  }

  return (
    <>
      <div className="flex justify-center text-white">
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

            <div className="flex max-w-xl flex-auto flex-col justify-between sm:px-8 md:w-3/4 md:max-w-2xl md:px-8">
              <div className="flex flex-col gap-8 md:gap-10">
                <div className="flex flex-col gap-2 md:gap-4">
                  <h1 className="font-Rubik text-xl font-medium md:text-2xl lg:text-3xl xl:text-4xl">
                    HELLO AGAIN!
                  </h1>
                  <p className="text-sm md:text-base">
                    Welcome valued customer! LOG IN to access your list of
                    bookings and to also book future flights or edit existing
                    ones.
                  </p>
                </div>

                <form
                  className="flex h-full flex-col gap-16 "
                  onSubmit={handleSubmit(submit)}>
                  <div className="flex flex-col gap-8">
                    {formInputData.map(
                      ({ title, inputName, icon, type }, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                          <div className="flex items-center justify-between">
                            <label className="md:text-lg">{title}</label>
                            {errors[inputName] && (
                              <p className="text-right text-sm text-red-600">
                                {errors[inputName].message}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-4 bg-white px-3 py-2 ">
                            <input
                              className="w-full bg-transparent py-1 text-black outline-none md:py-0 md:text-lg"
                              type={type}
                              {...register(inputName, {
                                required: 'This field is required',
                                onChange: () => clearErrors([inputName]),
                              })}
                            />
                            <FontAwesomeIcon
                              className={`text-xl ${
                                icon === faEye ? `text-amber-300` : `text-black`
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
                      {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="border-t-2 border-dashed border-white pt-4 text-center text-sm md:text-base">
                Don’t have an existing account?{' '}
                <span>
                  <Link
                    to="/register"
                    className="button_transition inline h-fit border-amber-300 text-amber-300 transition-all hover:border-b-[3px]">
                    SIGN UP
                  </Link>
                </span>{' '}
                now for free!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
