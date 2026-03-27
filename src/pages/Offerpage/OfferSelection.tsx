import axios from 'axios';
import { useEffect, useState } from 'react';
import EachOfferSelection from './EachOfferSelection';

const OfferSelection = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const dataFetch = async () => {
      try {
        const { data } = await axios.get(
          `https://traveloga-api.onrender.com/api/v1/destinations?limitedOffers=true`,
          { signal: controller.signal },
        );
        setInfo(data);
      } catch (err) {
        if (axios.isCancel(err)) return console.log('fetch cancelled!');
        alert(err.response.data.msg);
      }
    };
    dataFetch();
    return () => controller.abort();
  }, []);

  return (
    <section className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-lg lg:text-left lg:text-xl">OFFERS</h1>
        <div className="hidden h-[2px] bg-black sm:block " />
      </div>
      <div className="flex w-full flex-col items-center gap-8 lg:gap-12">
        <EachOfferSelection data={info} />
      </div>
    </section>
  );
};
export default OfferSelection;
