import useBookingContext from './BookingStateContext';

const PriceComponent = () => {
  const { initialAmount, discount, amount } = useBookingContext();

  return (
    <div className="col-span-6 flex flex-col md:order-last md:col-span-10">
      <div className="flex justify-between text-red-600 first:text-black/[0.6] last:text-xl last:text-[#2B8E9B] lg:last:text-2xl ">
        <h1 className="text-sm text-black md:text-base">Initial Amount</h1>
        <p className="">{initialAmount ?? ''}</p>
      </div>
      <div className="flex justify-between text-red-600 first:text-black/[0.6] last:text-xl last:text-[#2B8E9B] lg:last:text-2xl ">
        <h1 className="text-sm text-black md:text-base">Promo Discount</h1>
        <p className="">{discount ?? ''}</p>
      </div>
      <div className="flex justify-between text-red-600 first:text-black/[0.6] last:text-xl last:text-[#2B8E9B] lg:last:text-2xl ">
        <h1 className="text-sm text-black md:text-base">Final Amount</h1>
        <p className="">{amount ?? ''}</p>
      </div>
    </div>
  );
};

export default PriceComponent;
