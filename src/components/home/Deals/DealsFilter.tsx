import { CheckInOutPicker } from "@/components/ui/check-in-out-picker";
import { GuestPicker } from "@/components/ui/guest-picker";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { useCallback, useState, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DealsFilter() {
  const [date, setDate] = useState({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 2),
  });

  const [guestValues, setGuestValues] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const formatDate = useCallback(
    (date: Date) => date.toISOString().split("T")[0],
    []
  );

  const handleGuestChange = useCallback(
    (
      updatedValues: SetStateAction<{
        adults: number;
        children: number;
        infants: number;
      }>
    ) => {
      setGuestValues(updatedValues);
    },
    []
  );

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const checkin_date = formatDate(date.from);
    const checkout_date = formatDate(date.to);

    const params = new URLSearchParams(location.search);
    params.set("checkin_date", checkin_date);
    params.set("checkout_date", checkout_date);
    params.set("adults", guestValues.adults.toString());
    params.set("children", guestValues.children.toString());
    params.set("infants", guestValues.infants.toString());

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-2xl border border-gray-300 justify-between rounded-lg bg-white shadow-sm">
      {/* Date & Guest Picker */}
      <div className="flex flex-col  sm:flex-row items-stretch sm:items-center gap-4 flex-grow">
        {/* Date Picker */}
        <div className="!w-full sm:w-[15rem]">
          <CheckInOutPicker date={date} setDate={setDate} />
        </div>

        {/* Vertical Separator on large screens */}
        <div className="hidden sm:block w-px h-10 bg-grey-300" />

        {/* Guest Picker */}
        <div className="w-[15rem] ">
          <GuestPicker values={guestValues} onChange={handleGuestChange} />
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="bg-teal-500 rounded-none text-white hover:bg-teal-600 w-full sm:w-[8rem] h-[3rem] sm:h-[4rem] rounded-tr-lg  rounded-br-lg"
      >
        Search
      </Button>
    </div>
  );
}

export default DealsFilter;
