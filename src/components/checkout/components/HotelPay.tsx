import { Button } from "@/components/ui/button";
import { useCompleteBookingMutation } from "@/redux/services/staysApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface HotelPayProps {
  prePayAmount?: number;
}

function HotelPay({ prePayAmount }: HotelPayProps) {
  const bookId = localStorage.getItem("bookId");
  const navigate = useNavigate();
  const [completeBooking] = useCompleteBookingMutation();
  const userInfo = useSelector((state: RootState) => state.stays.userInfo);

  const handlePay = async () => {
    try {
      await completeBooking({
        bookingId: bookId,
        payment_method: "pay-at-hotel",
        paying_amount: prePayAmount,
        promo_code: null,
        coupon_code: null,
        referral_earn_point: null,
        user_info: userInfo,
      }).unwrap();
      navigate(`../${bookId}/booking-confirmed`);
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 pr-20">
        <span className="font-medium text-lg">Pay directly at the hotel</span>
        <span className="text-gray-dark">
          We will confirm your booking without any charge, Pay directly at the
          hotel during your stay.
        </span>
      </div>
      <Button
        className="text-gray-dark bg-white border-gray border w-[13.25rem] !py-5"
        onClick={handlePay}
      >
        {" "}
        Pay directly at hotel
      </Button>
    </div>
  );
}

export default HotelPay;
