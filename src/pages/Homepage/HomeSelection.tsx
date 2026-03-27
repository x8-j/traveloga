import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Selection from './EachHomeSelection';

const HomeSelection = ({ showCase }: { showCase: 'top' | 'seasonal' }) => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const data = async () => {
      try {
        const { data } = await axios.get(
          `https://traveloga-api.onrender.com/api/v1/destinations?showCase=${showCase}`,
          { signal: controller.signal },
        );
        setInfo(data.destinations);
      } catch (err) {
        console.log(err);
      }
    };
    data();
    return () => controller.abort();
  }, [showCase]);

  return (
    <>
      <div className="flex items-center justify-center pl-6 sm:px-16">
        <div className="flex w-full max-w-7xl flex-col gap-4">
          <div className="flex justify-between pr-6">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="hidden md:block md:text-lg ">Where to go:</h1>
              </div>
              <h1 className=" font-Rubik text-lg font-semibold uppercase md:text-xl ">{`${showCase} Destinations:`}</h1>
            </div>

            <div className="flex items-end">
              <Link to="/destinations" className="text-amber-300">
                See More...
              </Link>
            </div>
          </div>
          <Selection info={info} />
        </div>
      </div>
    </>
  );
};

export default HomeSelection;
