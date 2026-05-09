import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="flex justify-center">
      <div
        className="flex w-full max-w-[100rem] bg-cover bg-fixed bg-center bg-no-repeat px-12 pb-24 pt-40  md:h-fit md:pt-56 lg:pb-20 lg:pl-20 lg:pt-48 xl:pb-24 xl:pt-56"
        style={{ backgroundImage: `url("/images/homepage-pic.avif")` }}>
        <div className=" flex w-full max-w-xl flex-col items-center justify-between gap-60 text-center md:w-full md:max-w-[600px] md:items-start md:gap-36 lg:w-7/12 lg:max-w-[700px] lg:text-left xl:max-w-3xl  ">
          <h1 className="font-Rubik text-4xl text-white sm:text-5xl md:text-left md:text-6xl lg:text-7xl ">
            EXPLORE AND ENJOY THE BEAUTY OF THE PHILIPPINES
          </h1>
          <div className="flex max-w-xl flex-col items-center gap-4 md:w-full md:flex-row md:gap-8 md:p-0 lg:justify-between lg:gap-0">
            <Link
              to="/destinations"
              className="button_transition rounded-2xl bg-amber-300 px-8 py-3 font-Rubik text-xl font-semibold text-white hover:bg-amber-200 hover:text-white sm:text-2xl lg:rounded-3xl lg:px-8 xl:px-10 xl:py-5 ">
              SEARCH
            </Link>
            <div className="hidden h-20 w-1 bg-white md:block" />
            <h1 className=" text-white sm:text-2xl ">For A Destination</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
