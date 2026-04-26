import emailjs from '@emailjs/browser';
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCompass,
  faPaperPlane,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from '../store/snackbar.js';

const Footer = () => {
  return (
    <div className="flex flex-col">
      <TopFooter />
      <BottomFooter />
    </div>
  );
};

type TopFooterFormInputs = 'email';
type TopFooterFormValues = Record<TopFooterFormInputs, string>;

const TopFooter = () => {
  const { triggerSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopFooterFormValues>({
    defaultValues: {
      email: '',
    },
  });

  const formSubmit = async (formData: TopFooterFormValues) => {
    setIsLoading(true);

    try {
      const { data: message } = await axios.post(
        'https://traveloga-api.onrender.com/api/v1/subscription',
        formData,
        { headers: { 'Content-Type': 'application/json' } },
      );
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_PUBLIC_KEY,
      );
      setIsLoading(false);
      triggerSnackbar({ type: 'success', message });
    } catch (err: any) {
      setIsLoading(false);
      triggerSnackbar({ type: 'error', message: err.response.data.msg });
      console.log(err);
    }
  };

  return (
    <section className="flex justify-center text-white  ">
      <div className="flex w-full max-w-[100rem] flex-col gap-4 bg-[#34abbb] p-6 text-center sm:px-16 md:flex-row md:py-12 md:text-left lg:gap-8 xl:gap-12">
        <div className="flex flex-col gap-2 md:w-2/5 md:flex-auto">
          <p className="italic lg:text-lg">
            TRAVEL. As much as you can. As far as you can. As long as you can.{' '}
            Life's not meant to be lived in one place.
          </p>
          <h1 className=" lg:text-lg">Martin Moodie</h1>
        </div>

        <div className="flex flex-col gap-4 md:w-3/5 md:flex-auto">
          <p className=" text-sm opacity-90">
            Subscribe to be updated at our latest promos, new destinatinos and
            other changes to our services
          </p>
          <form
            className="flex w-full  items-center gap-4 bg-white px-3 py-2 text-black "
            onSubmit={handleSubmit(formSubmit)}>
            <input
              className={`${
                errors.email ? 'placeholder:text-red-700' : ''
              } flex-auto bg-transparent py-2 text-sm outline-none md:text-base`}
              type="email"
              placeholder={errors?.email?.message ?? 'JohnDoe@domain.com'}
              {...register('email', {
                required: 'Please provide your email',
              })}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="button_transition flex items-center gap-4 bg-amber-300 px-4 py-2 enabled:hover:bg-amber-400 enabled:hover:text-white disabled:bg-amber-200 md:px-6 md:py-2">
              <h1 className="hidden sm:block">SUBMIT</h1>
              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="text-lg motion-safe:animate-spin sm:hidden lg:block"
                />
              ) : (
                <FontAwesomeIcon
                  className="text-lg sm:hidden lg:block"
                  icon={faPaperPlane}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

type BottomFooterFormInputs = 'name' | 'email' | 'subject' | 'message';
type BottomFooterFormValues = Record<BottomFooterFormInputs, string>;

const BottomFooter = () => {
  const { triggerSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BottomFooterFormValues>({
    defaultValues: {
      name: '',
      subject: '',
      email: '',
      message: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = async (formData: BottomFooterFormValues) => {
    setIsLoading(true);
    try {
      const { data: message } = await axios.post(
        'https://traveloga-api.onrender.com/api/v1/message',
        formData,
        { headers: { 'Content-Type': 'application/json' } },
      );
      setIsLoading(false);
      triggerSnackbar({ type: 'success', message });
    } catch (err: any) {
      setIsLoading(false);
      triggerSnackbar({ type: 'error', message: err.response.data.msg });
    }
  };

  return (
    <section className="flex justify-center">
      <div className="flex w-full max-w-[100rem] flex-col items-stretch gap-4 bg-[#2B8E9B] px-6 py-8 sm:px-16 md:flex-row-reverse md:items-start md:gap-8 lg:gap-12 lg:py-8">
        <form
          className="flex flex-auto flex-col gap-4 text-white md:flex-row"
          onSubmit={handleSubmit(formSubmit)}>
          <div className="flex flex-auto flex-col gap-4 md:w-2/5">
            <div className="flex flex-col gap-2">
              <label className="font-Rubik">Name</label>
              <input
                required
                className={` ${
                  errors.name
                    ? `placeholder:text-red-700/50`
                    : `placeholder:text-slate-300`
                } button_transition border-2 border-white bg-transparent px-3 py-2 placeholder:italic  hover:border-amber-200`}
                {...register('name', {
                  required: 'Please provide your name.',
                })}
                type="text"
                placeholder={
                  errors.name ? (errors.name.message as string) : 'John Doe'
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-Rubik">Email</label>
              <input
                required
                className={` ${
                  errors.email
                    ? `placeholder:text-red-700/50`
                    : `placeholder:text-slate-300`
                } button_transition border-2 border-white bg-transparent px-3 py-2 placeholder:italic  hover:border-amber-200`}
                {...register('email', {
                  required: 'Please provide your email',
                })}
                type="email"
                placeholder={
                  errors.email
                    ? (errors.email.message as string)
                    : 'johndoe@website.com'
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-Rubik">Subject</label>
              <input
                className={` ${
                  errors.subject
                    ? `placeholder:text-red-700/50`
                    : `placeholder:text-slate-300`
                } button_transition border-2 border-white bg-transparent px-3 py-2 placeholder:italic  hover:border-amber-200`}
                {...register('subject')}
                type="text"
                placeholder={
                  errors.subject
                    ? (errors.subject.message as string)
                    : 'Destination Inquiry'
                }
              />
            </div>
          </div>
          <div className="flex flex-auto flex-col gap-4 md:w-3/5 lg:flex-row">
            <div className="flex flex-col gap-2 md:flex-auto">
              <label className="font-Rubik">Message</label>
              <textarea
                required
                className={` ${
                  errors.message
                    ? `placeholder:text-red-700/50`
                    : `placeholder:text-slate-300`
                } button_transition h-32 border-2 border-white bg-transparent px-3 py-2 placeholder:italic hover:border-amber-200  md:flex-auto`}
                {...register('message', {
                  required: 'Please provide your message',
                })}
                placeholder={
                  (errors.message?.message as string) ??
                  'I would like to book for...'
                }
              />
            </div>

            <button
              className="translation-all button_transition font-semibold text-amber-300 enabled:hover:text-amber-400 disabled:text-amber-200 md:text-right lg:self-end"
              type="submit"
              disabled={isLoading}>
              SUBMIT
            </button>
          </div>
        </form>
        <div className=" flex flex-col items-stretch gap-4 md:items-start">
          <div className="flex flex-col text-center text-sm text-[#004852] md:text-left lg:text-base">
            <h1>500 Terry Francois Street</h1>
            <h1>San Francisco, CA 94158</h1>
            <h1>info@mysite.com</h1>
            <h1>Tel: 123-456-7890</h1>
            <h1>Fax: 123-456-7890</h1>
            <h1>
              TRAVELOGA 2022. <br /> designed & created by Johann Isaiah Mendoza
            </h1>
          </div>
          <div className="flex items-center justify-between md:flex-col md:gap-2">
            <div className="flex items-center gap-2 ">
              <FontAwesomeIcon
                className="text-xl text-white "
                icon={faCompass}
              />
              <div className="flex flex-col ">
                <h1 className="font-Rubik text-sm  text-white lg:text-base">
                  TRAVELOGA
                </h1>
                <h1 className="whitespace-nowrap text-xs text-white ">
                  Experiencing Philippines
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4  text-2xl text-white">
              <a
                className="button_transition hover:text-amber-300"
                href="https://www.pinterest.ph/">
                <FontAwesomeIcon icon={faPinterestP} />
              </a>
              <a
                className="button_transition hover:text-amber-300"
                href="https://www.instagram.com/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                className="button_transition hover:text-amber-300"
                href="https://twitter.com/">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                className="button_transition hover:text-amber-300"
                href="https://www.facebook.com/">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
