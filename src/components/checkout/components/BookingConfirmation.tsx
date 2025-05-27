import Icon from "@/components/ui/Icon";
import React from "react";

interface PersonalInfoProps {
  name: string;
  email: string;
  phone: string;
}

interface HotelDetailsProps {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  stayPeriod: string;
  guests: number;
}

interface FeeDetailsProps {
  item: string;
  amount: number;
}

interface BookingConfirmationProps {
  bookingId?: string;
  bookedOn?: string;
  personalInfo?: PersonalInfoProps;
  paymentMethod?: string;
  hotelDetails?: HotelDetailsProps;
  fees?: FeeDetailsProps[];
  total?: number;
  partiallyPaid?: number;
  toBePaid?: number;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingId,
  bookedOn,
  personalInfo,
  paymentMethod,
  hotelDetails,
  fees,
  total,
  partiallyPaid,
  toBePaid,
}) => {
  return (
    <div className="max-w-xl mx-auto  bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-sky-100 text-center p-6">
        <h2 className="text-primary text-xl font-semibold">
          Yay! Booking confirmed 🎉
        </h2>
        <p className="text-gray-dark">
          Congratulations! Your hotel is successfully booked.
        </p>
        <div className="mt-2">
          <p className="text-gray-dark ">
            Booking ID: <span className="font-medium">{bookingId}</span>
          </p>
          <p className="text-gray-dark">
            Booked On: <span className="font-medium">{bookedOn}</span>
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Personal Info */}
        <div className="border-b pb-4 mb-4">
          <h3 className="text-grey-800 font-medium text-xl mb-2">
            Your Personal Info:
          </h3>
          <div className="space-y-2">
            <div className="flex">
              <p className="text-gray w-1/3">Name:</p>
              <p className="text-gray-dark w-2/3">{personalInfo?.name}</p>
            </div>
            <div className="flex">
              <p className="text-gray w-1/3">Email Address:</p>
              <p className="text-gray-dark w-2/3">{personalInfo?.email}</p>
            </div>
            <div className="flex">
              <p className="text-gray w-1/3">Phone No.:</p>
              <p className="text-gray-dark w-2/3">{personalInfo?.phone}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-b pb-4 mb-4 flex gap-12 items-center">
          <h3 className="text-gray font-medium">Payment:</h3>
          <p className="flex items-center gap-2">
            <span className="bg-green-100 px-2 py-1 rounded-full text-green-700">
              {paymentMethod}
            </span>
            <span className="text-sm text-gray-500">(Partial)</span>
          </p>
        </div>

        {/* Hotel Details */}
        <div className="border-b pb-4 mb-4 flex gap-4">
          <img
            src={hotelDetails?.image}
            alt={hotelDetails?.name}
            className="w-20 h-20 rounded object-cover"
          />
          <div>
            <h3 className="text-primary-dark text-xl font-semibold">
              {hotelDetails?.name}
            </h3>
            <p className="text-gray-dark text-sm">{hotelDetails?.location}</p>
            <p className="text-gray-dark text-sm flex items-center gap-1">
              ⭐ {hotelDetails?.rating} ({hotelDetails?.reviews} Reviews)
            </p>
            <p className="text-gray-dark text-sm flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <Icon name="calendar_today" className="text-gray !text-md" />
                {hotelDetails?.stayPeriod}
              </div>
              |
              <div className="flex items-center gap-1">
                <Icon name="person" className="text-gray" />
                {hotelDetails?.guests} Guests
              </div>
            </p>
          </div>
        </div>

        {/* Fees & Tax Details */}
        <div className="border-b pb-4 mb-4">
          <h3 className="text-gray-dark font-medium text-xl mb-2">
            Fees & Tax Details:
          </h3>
          <ul>
            {fees?.map((fee, index) => (
              <li key={index} className="flex justify-between text-gray-dark">
                <span>{fee.item}</span>
                <span className="font-medium">{`NPR ${fee.amount}`}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Total Calculation */}
        <div className="border-b pb-4 mb-4 text-gray-800">
          <div className="flex justify-between">
            <span className="text-gray-dark font-semibold">Total</span>
            <span className="font-bold text-primary-dark text-2xl">{`NPR ${total}`}</span>
          </div>
          <div className="flex justify-between text-gray-dark">
            <span>Partially Paid</span>
            <span className="font-medium">{`NPR ${partiallyPaid}`}</span>
          </div>
          <div className="flex justify-between text-sky-dark font-semibold">
            <span className="text-gray-dark">To be Paid</span>
            <span className="font-bold text-primary-dark text-2xl">{`NPR ${toBePaid}`}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Button */}
      {/* <div className="text-center py-4 bg-gray-100">
        <button className="px-6 py-2 bg-blue-dark text-white rounded-md shadow-sm">
          Got It!
        </button>
      </div> */}
    </div>
  );
};

export default BookingConfirmation;
