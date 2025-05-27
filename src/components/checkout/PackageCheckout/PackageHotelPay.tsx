/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useCompletePackageBookingMutation } from "@/redux/services/packagesApi";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PackageHotelPay({ prePayAmount }: any) {
  const [bookId, setBookId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [completePackageBooking] = useCompletePackageBookingMutation();
  const userInfo = useSelector((state: RootState) => state.stays.userInfo);
  const packageCard = localStorage.getItem("packageCard");

  useEffect(() => {
    try {
      if (packageCard) {
        const parsedData = JSON.parse(packageCard);
        const packageBookId = parsedData?.booking_detail?.id;
        if (packageBookId) {
          setBookId(packageBookId);
        } else {
          console.error("Booking ID not found.");
        }
      }
    } catch (error) {
      console.error("Error parsing packageCard:", error);
    }
  }, []);

  const handlePay = async () => {
    if (!bookId) {
      console.error("Cannot proceed without a valid booking ID.");
      return;
    }

    try {
      await completePackageBooking({
        bookingId: bookId,
        payment_method: "pay-at-hotel",
        paying_amount: prePayAmount,
        promo_code: null,
        coupon_code: null,
        referral_earn_point: null,
        user_info: userInfo,
      }).unwrap();
      navigate(`../${bookId}/package-booking-confirmed`);
    } catch (error) {
      console.error("Error completing booking:", error);
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
        Pay directly at hotel
      </Button>
    </div>
  );
}

export default PackageHotelPay;
