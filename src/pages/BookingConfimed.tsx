/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BookingConfirmation from "@/components/checkout/components/BookingConfirmation";
import { useGetCompleteBookingQuery } from "@/redux/services/staysApi";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

interface Booking {
  room_detail: any;
  id: number;
  booking_id: string;
  property: Property;
  checkin_date: string;
  checkout_date: string;
  booked_by: number;
  booked_on: string;
  reserve_expires_in: string;
  booking_status: string;
  cancelled: boolean;
  adults: number;
  children: number;
  payment_detail: PaymentDetail;
  user_info: UserInfo;
  booking_detail: BookingDetail[];
}
interface Property {
  id: number;
  name: string;
  category: PropertyCategory;
  photo_url: string;
  location: PropertyLocation;
  min_room_price: number;
  ratings: number;
  user_review_count: number;
}

interface PropertyCategory {
  id: number;
  name: string;
  icon: string | null;
  color: string;
}

interface PropertyLocation {
  city: string;
  country: string;
  zipcode: string | null;
  latitude: number | null;
  continent: string | null;
  longitude: number | null;
  street_name: string;
  street_number: string | null;
  bf_unit_number: string | null;
}

interface PaymentDetail {
  id: number;
  paid_amount: number;
  total_amount: number;
  payment_method: string;
  status: string;
  coupon_code: string | null;
  promo_code: string | null;
}

interface UserInfo {
  name: string;
  email: string;
  mobile_number: string;
}

interface BookingDetail {
  id: number;
  room: Room;
  no_of_rooms: number;
  no_of_children: number | null;
  no_of_adults: number | null;
  price: number;
}

interface Room {
  id: number;
  name: string;
  no_of_rooms: number;
  price: number;
  number_of_beds: any[];
  size: number;
  photo_url: string | null;
  amenities: Amenity[];
}

interface Amenity {
  id: number;
  title: string;
  category: string;
  amenities_for: string;
  icon: string | null;
}

function BookingConfirmed() {
  const { id } = useParams();

  const [bookDetail, setBookDetail] = useState<Booking | null>(null);
  const { data, isLoading, error, refetch } = useGetCompleteBookingQuery(id);

  useEffect(() => {
    if (data) {
      refetch();
      setBookDetail(data);
    }
  }, [data]);

  const bookingData = bookDetail && {
    bookingId: bookDetail?.booking_id,
    bookedOn: bookDetail?.booked_on,
    personalInfo: {
      name: bookDetail?.user_info?.name,
      email: bookDetail?.user_info?.email,
      phone: bookDetail?.user_info?.mobile_number,
    },
    paymentMethod: bookDetail?.payment_detail?.payment_method,
    hotelDetails: {
      name: bookDetail?.property?.name,
      location: `${bookDetail?.property?.location?.street_name}, ${bookDetail?.property?.location?.city}`,
      rating: bookDetail?.property?.ratings,
      reviews: bookDetail?.property?.user_review_count,
      image: bookDetail?.property?.photo_url,
      stayPeriod: `${format(
        new Date(bookDetail?.checkin_date),
        "MMMM dd"
      )} - ${format(new Date(bookDetail?.checkout_date), "MMMM dd")}`,
      guests: bookDetail?.adults + bookDetail?.children,
    },
    fees: [
      {
        item: "Room Charges",
        amount: bookDetail?.room_detail?.[0]?.price,
      },
    ],
    total: bookDetail?.payment_detail?.total_amount,
    partiallyPaid: bookDetail?.payment_detail?.paid_amount,
    toBePaid:
      bookDetail?.payment_detail?.total_amount -
      bookDetail?.payment_detail?.paid_amount,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!bookingData) {
    return <div>No booking data available</div>;
  }

  return (
    <div>
      <BookingConfirmation
        bookingId={bookingData.bookingId}
        bookedOn={bookingData.bookedOn}
        personalInfo={bookingData.personalInfo}
        paymentMethod={bookingData.paymentMethod}
        hotelDetails={bookingData.hotelDetails}
        fees={bookingData.fees}
        total={bookingData.total}
        partiallyPaid={bookingData.partiallyPaid}
        toBePaid={bookingData.toBePaid}
      />
    </div>
  );
}

export default BookingConfirmed;
