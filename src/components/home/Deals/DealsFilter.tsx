import { CheckInOutPicker } from "@/components/ui/check-in-out-picker";
import { GuestPicker } from "@/components/ui/guest-picker";
import { Button } from "@/components/ui/button";

function DealsFilter() {
  const handleSearch = () => {
    console.warn("Searching deals...");
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-2xl border border-gray-300 justify-between rounded-lg bg-white shadow-sm">
      {/* Date & Guest Picker */}
      <div className="flex flex-col  sm:flex-row items-stretch sm:items-center gap-4 flex-grow">
        {/* Date Picker */}
        <div className="!w-full sm:w-[15rem]">
          <CheckInOutPicker date={undefined} setDate={undefined} />
        </div>

        {/* Vertical Separator on large screens */}
        <div className="hidden sm:block w-px h-10 bg-grey-300" />

        {/* Guest Picker */}
        <div className="w-[15rem] ">
          <GuestPicker
            values={{
              adults: 0,
              children: 0,
              infants: 0,
            }}
          />
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
