import {
  faClock,
  faShieldAlt,
  faSmileBeam,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SlidingPictures from './SlidingPictures';

const AboutUsPage = () => {
  const objectiveInfo = [
    [
      faShieldAlt,
      'SECURITY',
      'We prioritize our customer’s safety and ensure that their transactions and personal data are secured.',
    ],
    [
      faClock,
      'EFFICIENT',
      'We pride ourselves on fast and efficient transactions for a hassle-free experience.',
    ],
    [
      faSmileBeam,
      'EXPERIENCE',
      'We ensure a fun and worthwile experience both during the booking process and the vacation itself.',
    ],
  ] as const;

  return (
    <div className="flex flex-col gap-32 md:gap-40">
      <div className="flex justify-center">
        <div
          className="relative flex h-[93vh] w-full max-w-[100rem] bg-cover bg-fixed bg-no-repeat lg:h-screen"
          style={{
            backgroundImage: `url("/images/aboutuspage-heropic.avif")`,
          }}>
          <div className=" absolute flex flex-col items-center justify-center gap-4 place-self-end bg-[#423F3F]/90 px-10 py-10 text-center text-white sm:py-16 md:bottom-0 md:left-0 md:top-0 md:h-full md:w-7/12 md:max-w-lg md:gap-10 md:place-self-start md:py-10 md:text-left lg:w-1/2 lg:max-w-2xl lg:py-12 xl:py-14">
            <div className="flex flex-col gap-1 md:gap-4">
              <h1 className="font-Rubik text-lg text-amber-200 lg:text-xl">
                ABOUT US
              </h1>
              <p className="flex text-2xl font-semibold sm:text-4xl md:flex-col md:text-5xl lg:text-6xl">
                SEE THE BEAUTY THAT THE PHILIPPINES OFFER
              </p>
            </div>

            <div className="h-[2px] w-full bg-white" />
            <p className="text-base text-white sm:text-base md:text-justify md:text-lg lg:text-xl">
              Traveloga offers a safe, efficient and cheap way to book your
              favorites sites in the Philippines even if you’re coming from
              abroad or just locally. Here in Traveloga, we strive to make
              Philippines beloved by most and known by all
            </p>
          </div>
        </div>
      </div>
      <div className="flex  justify-center px-6 sm:px-16">
        <div className="flex w-full max-w-7xl flex-col gap-8 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-Rubik text-lg lg:text-xl">OBJECTIVE</h1>
            <p className=" text-justify text-sm lg:text-base">
              S.E.E. the Philippines for the beauty it truly holds so everybody
              can appreciate and enjoy it. At Traveloga, we establish our
              objective S.E.E. for all of our customers to ensure the safety,
              efficiency, and experience for every destination they have chosen.{' '}
            </p>
          </div>
          <div className="grid grid-rows-3 gap-6 px-8 md:grid-cols-3 md:grid-rows-1">
            {objectiveInfo.map(([icon, title, paragraph], index) => (
              <div className="flex flex-col gap-4" key={index}>
                <FontAwesomeIcon
                  className="text-5xl text-[#2B8E9B] lg:text-6xl"
                  icon={icon}
                />
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold lg:text-lg">
                    {title}
                  </h1>
                  <p className="text-sm text-black/80 lg:text-base">
                    {paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="flex w-full max-w-7xl flex-col gap-2 bg-[#423F3F] px-8 pb-10 pt-8 text-center text-white md:px-16 lg:px-10 lg:py-14 lg:pb-12">
          <h1 className="font-Rubik text-lg lg:text-xl">ORIGIN</h1>
          <p className="text-justify text-base opacity-90 lg:text-lg">
            It all started as a group of friends that have a passion for
            traveling. We traveled all around the world, and we got to see a lot
            of beautiful things. When we decided to travel locally, we realized
            that the Philippines has untapped tourism potential. Through each
            expertise and overall hard work, we created Traveloga into what it
            is today.
          </p>
        </div>
      </div>

      <SlidingPictures />
      <div className="flex justify-center">
        <div
          className="flex max-w-[100rem] justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("/images/progressivility.avif")` }}>
          <div className="flex w-full flex-col gap-2 bg-[#423F3F]/80 px-8 pb-8 pt-10 text-white md:px-16 md:py-14 lg:py-16 xl:px-28">
            <div className="flex flex-col">
              <h1 className=" font-Rubik text-lg lg:text-xl">PROGRESSIVITY</h1>
              <p className=" text-justify text-base opacity-90">
                For the last 8 years, we have become a well-known and reliable
                company globally. We have also expanded our services from local
                to global. In this way, we made the Philippines more
                discoverable and reachable for those inside and outside of the
                country.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row lg:gap-20">
              <div className="flex flex-col gap-2 p-4 text-lg">
                <h1 className="lg:text-lg">Local Bookings:</h1>
                <div className="flex gap-8">
                  <div className="flex gap-4">
                    <span className="text-3xl font-bold text-[#34abbb] lg:text-4xl">
                      22k+
                    </span>
                    <h2 className="text-sm text-white/90 md:text-base">
                      Last <br /> Year:
                    </h2>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-3xl font-bold text-[#34abbb] lg:text-4xl">
                      33k+
                    </span>
                    <h2 className="text-sm text-white/90 md:text-base">
                      Peak <br /> Booking:
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 text-lg">
                <h1 className="lg:text-lg">Global Bookings:</h1>
                <div className="flex gap-8">
                  <div className="flex gap-4">
                    <span className="text-3xl font-bold text-[#34abbb] lg:text-4xl">
                      46K+
                    </span>
                    <h2 className="text-sm text-white/90 md:text-base">
                      Last <br /> Year:
                    </h2>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-3xl font-bold text-[#34abbb] lg:text-4xl">
                      73K+
                    </span>
                    <h2 className="text-sm text-white/90 md:text-base">
                      Peak <br /> Booking:
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
