import {
  faLandmark,
  faLocationDot,
  faMapPin,
  faMountain,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import type { PreviewDestination } from '~/types/Destination';

type DestinationCategoryKeys = 'beach' | 'landmark' | 'history';
type DestionationCategoryList = Record<
  DestinationCategoryKeys,
  PreviewDestination[]
>;

const DestinationContent = () => {
  const [listOfDestinations, setListOfDestinations] =
    useState<DestionationCategoryList>({
      beach: [],
      landmark: [],
      history: [],
    });
  const [categoryFilter, setCategoryFilter] = useState<
    DestinationCategoryKeys | ''
  >('');

  const filterValues = [
    ['', faLocationDot],
    ['beach', faUmbrellaBeach],
    ['landmark', faMountain],
    ['history', faLandmark],
  ] as const;

  useEffect(() => {
    const controller = new AbortController();
    const fetchAllCategory = async () => {
      try {
        const { data } = await axios.get(
          `https://traveloga-api.onrender.com/api/v1/destinations`,
          { signal: controller.signal },
        );

        setListOfDestinations({
          beach: data.beach,
          landmark: data.landmark,
          history: data.history,
        });
      } catch (err) {
        if (axios.isCancel(err)) return console.log('fetch cancelled!');
        console.log(err.response.data.msg);
      }
    };
    fetchAllCategory();
    return () => controller.abort();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex content-center items-center justify-evenly rounded-b-lg border-x-4 border-b-4 border-solid border-amber-200 py-4">
        {filterValues.map(([eachCategory, icon], index) => (
          <div
            className={`button_transition flex items-center justify-center gap-4 hover:text-amber-300 ${
              categoryFilter === eachCategory
                ? `text-amber-300 hover:text-amber-200/70`
                : ``
            }`}
            onClick={() => setCategoryFilter(eachCategory)}
            key={index}>
            <FontAwesomeIcon className="text-xl " icon={icon} />
            <button className="hidden text-lg capitalize md:block lg:text-xl">
              {eachCategory ? eachCategory : 'All'}
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8 lg:gap-12">
        <EachDestinationContent
          list={listOfDestinations}
          filter={categoryFilter}
        />
      </div>
    </div>
  );
};

const EachDestinationContent = ({
  list,
  filter,
}: {
  list: DestionationCategoryList;
  filter: DestinationCategoryKeys | '';
}) => {
  const { openDestinationUI } = useGlobalContext();

  if (
    list.beach.length < 1 &&
    list.landmark.length < 1 &&
    list.history.length < 1
  ) {
    return (
      <div className="flex animate-pulse flex-col gap-4 md:gap-6 lg:gap-8">
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <div className="h-4 w-1/4 max-w-[200px] bg-slate-200" />
          <div className="hidden h-1 w-full bg-slate-200 md:block " />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <>
            <div className="flex flex-col gap-2">
              <div className="group relative flex h-52 bg-slate-200 sm:h-60 md:h-40 lg:h-60 xl:h-80" />
              <div className="flex flex-col gap-1 px-2">
                <div className="h-4 w-1/3 bg-slate-200 lg:h-5" />
                <div className="h-4 w-1/4 bg-slate-200 lg:h-5" />
              </div>
            </div>
          </>
          <>
            <div className="flex flex-col gap-2">
              <div className="group relative flex h-52 bg-slate-200 sm:h-60 md:h-40 lg:h-60 xl:h-80" />
              <div className="flex flex-col gap-1 px-2">
                <div className="h-4 w-1/3 bg-slate-200 lg:h-5" />
                <div className="h-4 w-1/4 bg-slate-200 lg:h-5" />
              </div>
            </div>
          </>
          <>
            <div className="flex flex-col gap-2">
              <div className="group relative flex h-52 bg-slate-200 sm:h-60 md:h-40 lg:h-60 xl:h-80" />
              <div className="flex flex-col gap-1 px-2">
                <div className="h-4 w-1/3 bg-slate-200 lg:h-5" />
                <div className="h-4 w-1/4 bg-slate-200 lg:h-5" />
              </div>
            </div>
          </>
          <>
            <div className="flex flex-col gap-2">
              <div className="group relative flex h-52 bg-slate-200 sm:h-60 md:h-40 lg:h-60 xl:h-80" />
              <div className="flex flex-col gap-1 px-2">
                <div className="h-4 w-1/3 bg-slate-200 lg:h-5" />
                <div className="h-4 w-1/4 bg-slate-200 lg:h-5" />
              </div>
            </div>
          </>
        </div>
      </div>
    );
  }

  if (filter) {
    return (
      <>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-center font-Rubik text-lg lg:text-left lg:text-xl">
              {filter.toLocaleUpperCase()}
            </h1>
            <div className="hidden h-1 w-full bg-black md:block " />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {list[filter].map(({ title, location, image, _id }) => (
              <div className="flex flex-col gap-2" key={_id}>
                <div
                  className="group relative flex h-52 sm:h-60 md:h-40 lg:h-60 xl:h-80"
                  onClick={() => openDestinationUI(_id)}>
                  <img
                    className="h-full w-full bg-black object-cover object-center"
                    src={image}
                    alt={title}
                  />
                  <div className="button_transition absolute inset-0 transition-colors group-hover:bg-black/50" />
                </div>
                <div className="flex items-start gap-2 px-2">
                  <FontAwesomeIcon
                    className="mt-1 text-xl text-[#2B8E9B] lg:text-2xl"
                    icon={faMapPin}
                  />
                  <div className="flex flex-col">
                    <h1 className="whitespace-nowrap text-lg lg:text-xl">
                      {title}
                    </h1>
                    <h2 className="text-xs text-black/70 lg:text-sm">
                      {location}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {Object.keys(list).map((eachDestination, index) => (
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8" key={index}>
          <div className="flex flex-col gap-2">
            <h1 className="text-center font-Rubik text-lg lg:text-left lg:text-xl">
              {eachDestination.toLocaleUpperCase()}
            </h1>
            <div className="hidden h-1 w-full bg-black md:block" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {(list[eachDestination] as PreviewDestination[]).map(
              ({ title, location, image, _id }) => (
                <div className="flex flex-col gap-2" key={_id}>
                  <div
                    className="group relative flex h-52 sm:h-60 md:h-40 lg:h-60 xl:h-80"
                    onClick={() => openDestinationUI(_id)}>
                    <img
                      className="h-full w-full bg-black object-cover object-center"
                      src={image}
                      alt={title}
                    />
                    <div className="button_transition absolute inset-0 transition-colors group-hover:bg-black/50" />
                  </div>
                  <div className="flex items-start gap-2 px-2">
                    <FontAwesomeIcon
                      className="mt-1 text-xl text-[#2B8E9B] md:text-2xl"
                      icon={faMapPin}
                    />
                    <div className=" flex flex-col">
                      <h1 className="whitespace-nowrap text-base font-semibold lg:text-lg">
                        {title}
                      </h1>
                      <h2 className="text-sm text-black/70 lg:text-base">
                        {location}
                      </h2>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default DestinationContent;
