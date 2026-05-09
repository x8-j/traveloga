import { Link } from 'react-router-dom';

const AboutUsComponent = () => {
  return (
    <div className="flex justify-center sm:px-16">
      <div
        className=" flex w-full max-w-7xl items-center justify-center bg-cover bg-center bg-no-repeat md:h-[432px] md:items-start md:!bg-none lg:h-[568px]"
        style={{ backgroundImage: `url("/images/aboutus.avif")` }}>
        <div className="flex h-[520px] justify-center gap-4 md:h-[360px] md:w-full md:gap-6 md:bg-black/[0.80] md:px-8 md:pt-8 lg:h-[405px] lg:gap-10 lg:px-12 lg:pt-12">
          <img
            className="hidden object-cover object-center md:block md:h-[400px] md:w-[300px] lg:h-[520px] lg:w-[400px]"
            src="images/aboutus.avif"
            alt=""
          />
          <div className="flex h-fit max-w-sm flex-col items-center justify-around gap-6 place-self-center bg-black/[0.80] p-8 text-white sm:gap-4 sm:p-12 md:w-full md:max-w-lg md:items-start md:justify-start md:gap-6 md:place-self-start md:bg-transparent md:p-0 lg:gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-center font-Rubik text-lg font-semibold md:text-left lg:text-xl">
                ABOUT US
              </h1>
              <h1 className="text-center text-2xl md:text-left lg:text-3xl">
                Make Unforgettable and Delightful Memories
              </h1>
            </div>

            <h1 className="text-justify text-sm  lg:text-base">
              TRAVELOGA offers a safe and efficient way to travel to your
              desired destinations. Don't miss out on our limited promos by
              learning more about your destination. Contact us through our
              hotline or send us an email.
            </h1>
            <Link
              className="button_transition  border-b-2 border-transparent text-amber-300 transition-all hover:border-amber-300 lg:text-lg"
              to="/about-us">
              EXPLORE MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
