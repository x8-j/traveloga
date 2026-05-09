const SlidingPictures = () => {
  const aboutUsPictures = [
    ['images/slidepic1.avif'],
    ['images/slidepic2.avif'],
    ['images/slidepic3.avif'],
    ['images/slidepic4.avif'],
    ['images/slidepic5.avif'],
    ['images/slidepic6.avif'],
    ['images/slidepic7.avif'],
    ['images/slidepic8.avif'],
    ['images/slidepic9.avif'],
    ['images/slidepic1.avif'],
  ];

  return (
    <div className="flex justify-center px-6 sm:px-16">
      <div className="flex h-fit w-full max-w-7xl flex-col overflow-hidden bg-white py-20 lg:py-24">
        <h1 className="text-center font-Rubik text-lg lg:text-xl">
          From our Customers:
        </h1>
        <div
          className={`flex shrink-0 animate-scrollInfiniteXS flex-nowrap items-center gap-10 pl-7 sm:animate-scrollInfiniteSM sm:pl-0 md:animate-scrollInfiniteMD lg:animate-scrollInfiniteLG xl:animate-scrollInfiniteXL`}
          style={{
            transform: `translate3d(0, 0, 0)`,
            minWidth: `${aboutUsPictures.length * 280}px`,
          }}>
          {aboutUsPictures.map(([img, caption], index) => (
            <img
              className={`${
                index % 2 === 1 ? `mt-32` : ``
              } aspect-[1/2] h-[35rem] shrink-0 object-cover object-center`}
              src={img}
              alt={caption}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingPictures;
