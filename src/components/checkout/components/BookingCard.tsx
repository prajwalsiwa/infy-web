/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface HotelDetails {
  image: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
}

interface StayDetails {
  dates: string;
  guests: number;
  nights?: number;
}

interface FeeItem {
  item: string;
  amount: string;
}

interface Total {
  amount: string;
  note: string;
}

export interface BookingCardProps {
  hotelDetails: HotelDetails;
  stayDetails: StayDetails;
  fees: FeeItem[];
  total: Total;
}

type BookingDetails = {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  dates: string;
  guests: number;
  totalPrice: number;
  roomType: string;
  noOfRooms: number;
  roomPrice?: number;
};

function BookingCard({ hotelDetails }: BookingCardProps) {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );

  const { pathname } = useLocation();

  const isPackage = pathname?.includes("package");

  const packageCard =
    pathname?.includes("package") && localStorage.getItem("loginpackageCard");

  useEffect(() => {
    if (packageCard) {
      const packageCardObj = JSON.parse(packageCard);
      const packageCardDetail = {
        id: packageCardObj.id,
        name: packageCardObj.name,
        location: packageCardObj.location,
        rating: packageCardObj.rating,
        reviews: packageCardObj.reviews,
        image: packageCardObj.image,
        dates: packageCardObj.date,
        guests: packageCardObj.noOfPackage,
        totalPrice: packageCardObj.totalPrice,
        roomType: "Package",
        noOfRooms: packageCardObj.noOfPackage,
      };
      setBookingDetails(packageCardDetail);
    } else {
      const storedDetails = localStorage.getItem("bookingCardDetails");
      if (storedDetails) {
        setBookingDetails(JSON.parse(storedDetails));
      }
    }
  }, [packageCard]);

  const calculateDaysFromRange = (dateRange: string) => {
    if (!dateRange) return 0;
    const [startDate, endDate] = dateRange.split(" to ");
    const start: any = new Date(startDate);
    const end: any = new Date(endDate);
    return (end - start) / (1000 * 60 * 60 * 24);
  };

  const formatDateRange = (dateRange: string | undefined | null): string => {
    if (!dateRange) return ""; // Return an empty string if dateRange is undefined or null

    const [startDate, endDate] = dateRange.split(" to "); // Split the string by " to "

    if (!startDate || !endDate) return ""; // Return an empty string if the range is not valid

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    }; // Formatting options

    const formattedStart = new Date(startDate).toLocaleDateString(
      "en-US",
      options
    );
    const formattedEnd = new Date(endDate).toLocaleDateString("en-US", options);

    return `${formattedStart} - ${formattedEnd}`;
  };

  const nights = isPackage
    ? 1
    : bookingDetails?.dates
    ? calculateDaysFromRange(bookingDetails.dates)
    : 0;

  return (
    <div className="w-full p-8 border rounded-xl shadow-lg bg-white">
      {/* Hotel Details */}
      <div className="flex items-center gap-4">
        <img
          src={bookingDetails?.image}
          alt={bookingDetails?.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-primary-dark">
            {bookingDetails?.name}
          </h3>
          <p className="text-gray-500 text-sm">
            {isPackage ? bookingDetails?.location : hotelDetails.location}
          </p>
          <div className="flex items-center text-sm text-gray-dark">
            <i className="ml-1 text-gray-dark material-icons">star</i>
            <span className="font-medium">
              {isPackage ? bookingDetails?.rating : hotelDetails.rating}
            </span>
            <span className="ml-2 text-gray">
              ({isPackage ? bookingDetails?.reviews : hotelDetails.reviews}{" "}
              Reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Stay Details */}
      <div className="mt-4 border-t pt-4 text-sm text-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <i className="material-icons text-gray">calendar_today</i>
            <span className="text-gray-dark font-medium">
              {isPackage
                ? bookingDetails?.dates
                : formatDateRange(bookingDetails?.dates)}
            </span>
          </div>
          <div className="text-gray">|</div>
          <div className="flex items-center gap-2">
            <i className="material-symbols-outlined text-gray">person</i>
            <span className="font-medium text-gray-dark">
              {bookingDetails?.guests} Guests
            </span>
          </div>
        </div>
        <p className="text-gray-500 mt-1 text-xs">
          Total length of stay: {nights} {nights === 1 ? "night" : "nights"}
        </p>
      </div>

      {/* Fees Breakdown */}
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between mt-2 border p-2 rounded-lg">
          <span className="text-gray-dark">
            {bookingDetails?.roomType} {" x"} {bookingDetails?.noOfRooms}
          </span>
          <span className="font-medium">
            {isPackage
              ? bookingDetails?.totalPrice &&
                bookingDetails?.totalPrice / bookingDetails?.noOfRooms
              : bookingDetails?.roomPrice}{" "}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-2xl text-primary-dark flex  gap-2">
            <p className="text-gray-dark flex justify-end text-lg mt-0.5">
              {"Rs."}
            </p>
            {bookingDetails?.totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
