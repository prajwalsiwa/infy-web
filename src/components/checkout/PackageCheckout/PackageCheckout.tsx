import Icon from "@/components/ui/Icon";
import { Outlet, useNavigate } from "react-router-dom";
import { CircularTimer } from "@/components/ui/CircularTimer";
import BookingCard from "../components/BookingCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const hotelDetails = {
  image: "https://via.placeholder.com/80",
  name: "The Chancery Pavillion Hotel",
  location: "Rambazar, Pokhara",
  rating: 4.2,
  reviews: 30,
};

const stayDetails = {
  dates: "May 10 - May 12",
  guests: 5,
  nights: 2,
};

const fees = [
  { item: "Classic Room x 2 × 2 nights", amount: "NPR 30000" },
  { item: "Deluxe Twin Room", amount: "NPR 5000" },
  { item: "Platform Coupon", amount: "NPR -150" },
];

const total = {
  amount: "NPR 34850",
  note: "Inclusive of all taxes",
};

function PackageCheckout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const bookingDetails = useSelector(
    (state: RootState) => state.stays?.bookingDetail
  );

  // eslint-disable-next-line no-console
  console.log(bookingDetails, "details");
  return (
    <div className="flex justify-between gap-4">
      {/* Left Section */}
      <div className="flex flex-col gap-6" style={{ flexBasis: "50%" }}>
        <div className="flex items-center cursor-pointer" onClick={handleBack}>
          <Icon name="arrow_back_ios" />
          <span className="text-gray-dark">Edit your booking</span>
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>

      {/* Right Section */}
      <div
        className="flex  w-full items-start  gap-4"
        style={{ flexBasis: "45%" }}
      >
        <CircularTimer duration={900} />
        <BookingCard
          hotelDetails={hotelDetails}
          stayDetails={stayDetails}
          fees={fees}
          total={total}
        />
      </div>
    </div>
  );
}

export default PackageCheckout;
