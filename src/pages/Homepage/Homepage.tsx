import AboutUsComponent from './AboutUsComponent';
import HeroSection from './HeroSection';
import HomeSelection from './HomeSelection';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className="flex flex-col gap-32 md:gap-40">
      <HeroSection />
      <HomeSelection showCase="top" />
      <AboutUsComponent />
      <HomeSelection showCase="seasonal" />
      <Testimonials />
    </div>
  );
};

export default Home;
