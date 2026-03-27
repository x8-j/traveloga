import DestinationContent from './DestinationContent';

const DestinationPage = () => {
  return (
    <>
      <div className="flex justify-center px-8 pt-36 sm:px-16 md:pt-40">
        <div className="flex w-full max-w-7xl flex-col justify-center ">
          <div
            className="flex h-36 bg-cover bg-center bg-no-repeat md:h-44"
            style={{
              backgroundImage: `url("/images/destinationpage-pic.avif")`,
            }}>
            <div className="flex w-full items-center justify-center bg-black/[0.4]">
              <h1 className="font-Rubik text-2xl text-white md:text-3xl">
                DESTINATIONS
              </h1>
            </div>
          </div>
          <DestinationContent />
        </div>
      </div>
    </>
  );
};

export default DestinationPage;
