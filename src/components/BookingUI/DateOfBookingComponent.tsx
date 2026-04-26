import moment from 'moment';
import useBookingContext from './BookingStateContext';

const DateOfBookingComponent = () => {
  const { dateOfLeave, dateSelection, errors } = useBookingContext();
  return (
    <div className="col-span-6 flex flex-col gap-2 md:col-span-4">
      <div className="flex flex-col">
        <h2 className="font-medium md:text-lg">Dates</h2>
        {errors.date ? (
          <p className="text-xs text-red-600">{errors.date}</p>
        ) : (
          <p className="text-sm text-black/70 md:text-black/90 ">
            Select some dates. (A month ahead)
          </p>
        )}
      </div>

      <div className="flex gap-3 md:flex-col md:gap-4">
        {['Leave', 'Return'].map((label, index) => {
          return (
            <div className="relative flex flex-1 flex-col" key={index}>
              <label className="absolute left-3 top-1 z-10 text-xs text-black/80 md:text-sm">
                {label}
              </label>
              <input
                className="button_transition flex-1 truncate rounded-lg px-2 pb-2 pt-6 shadow-md outline-amber-300 ring-1 ring-slate-600 disabled:bg-slate-200 group-active:bg-white md:pt-[1.22rem] md:text-lg"
                type="date"
                onChange={(e) => {
                  dateSelection(label, e.currentTarget.value);
                }}
                required
                min={
                  label === 'Return'
                    ? moment(dateOfLeave).format('YYYY-MM-DD')
                    : moment().add(1, 'month').format('YYYY-MM-DD')
                }
                disabled={label === 'Return' && !dateOfLeave}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateOfBookingComponent;
