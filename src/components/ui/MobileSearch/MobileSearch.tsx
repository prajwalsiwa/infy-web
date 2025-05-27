import { useNavigate } from "react-router-dom";
import CheckInOut from "./CheckInOut";
import GuestPicker from "./GuestPicker";
import LocationPicker from "./LocationPicker";

function MobileSearch() {
  const navigate = useNavigate();
  return (
    <div className="!w-full  ">
      <div className="w-full">
        <LocationPicker />
      </div>
      <div className="flex gap-2 w-full">
        <CheckInOut />
        <GuestPicker
          values={{
            adults: 0,
            children: 0,
            infants: 0,
          }}
        />
      </div>
      <div>
        <button
          className="bg-primary text-white px-6 rounded-r-md w-full py-3 rounded-sm mt-3 "
          onClick={() => navigate("/search/hotel-list")}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default MobileSearch;
