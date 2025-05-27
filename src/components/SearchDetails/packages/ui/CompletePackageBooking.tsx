import { useGetCompletePackageBookingQuery } from "@/redux/services/packagesApi";
import BookingConfirmation from "@/components/checkout/components/BookingConfirmation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

interface PackageType {
  id: number;
  name: string;
  color: string;
  rate_depends_per_person: boolean;
}

interface Location {
  city: string;
  country: string;
  zipcode: string | null;
  latitude: number;
  continent: string;
  longitude: number;
  street_name: string;
  street_number: string | null;
  bf_unit_number: string | null;
}

interface Category {
  id: number;
  name: string;
  icon: string | null;
  color: string;
}

interface UserProperty {
  id: number;
  name: string;
  category: Category;
  photo_url: string;
  location: Location;
  min_room_price: number;
  ratings: number;
  user_review_count: number;
}

interface Package {
  id: number;
  title: string;
  package_type: PackageType;
  package_images: string[];
  user_property: UserProperty;
  price: number;
}

interface PackagePaymentDetail {
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

interface UserReviews {
  rating: number | null;
  review: string;
}

interface BookingDetail {
  id: number;
  package: Package;
  booking_id: string;
  booked_by: number;
  booked_on: string;
  reserve_expires_in: string;
  booking_status: string;
  cancelled: boolean;
  number_of_guests: number;
  package_payment_detail: PackagePaymentDetail;
  user_info: UserInfo;
  user_reviews: UserReviews;
}

function CompletePackageBooking() {
  const { id } = useParams();

  const [packageBookDetail, setBookPackageDetail] =
    useState<BookingDetail | null>(null);
  const { data, isLoading, error, refetch } =
    useGetCompletePackageBookingQuery(id);

  useEffect(() => {
    if (data) {
      refetch();
      setBookPackageDetail(data);
    }
  }, [data, refetch]);

  const packageData = packageBookDetail && {
    bookingId: packageBookDetail.booking_id,
    bookedOn: format(new Date(packageBookDetail.booked_on), "MMMM dd, yyyy"),
    personalInfo: {
      name: packageBookDetail.user_info?.name,
      email: packageBookDetail.user_info?.email,
      phone: packageBookDetail.user_info?.mobile_number,
    },
    paymentMethod: packageBookDetail.package_payment_detail?.payment_method,
    hotelDetails: {
      name: packageBookDetail.package?.title,
      location: `${packageBookDetail.package?.user_property?.location?.city}, ${packageBookDetail.package?.user_property?.location?.country}`,
      rating: packageBookDetail.package?.user_property?.ratings || 0,
      reviews: packageBookDetail.package?.user_property?.user_review_count || 0,
      image: packageBookDetail.package?.user_property?.photo_url || "noimage",
      stayPeriod: `${format(new Date(packageBookDetail.booked_on), "MMMM dd")}`,
      guests: packageBookDetail.number_of_guests,
    },
    fees: [
      {
        item: "Package Charges",
        amount: packageBookDetail.package_payment_detail?.total_amount,
      },
    ],
    total: packageBookDetail.package_payment_detail?.total_amount,
    partiallyPaid: packageBookDetail.package_payment_detail?.paid_amount,
    toBePaid:
      (packageBookDetail.package_payment_detail?.total_amount || 0) -
      (packageBookDetail.package_payment_detail?.paid_amount || 0),
  };

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!packageData) {
    return <div>No booking data available</div>;
  }

  return (
    <BookingConfirmation
      bookingId={packageData.bookingId}
      bookedOn={packageData.bookedOn}
      personalInfo={packageData.personalInfo}
      paymentMethod={packageData.paymentMethod}
      hotelDetails={packageData.hotelDetails}
      fees={packageData.fees}
      total={packageData.total}
      partiallyPaid={packageData.partiallyPaid}
      toBePaid={packageData.toBePaid}
    />
  );
}

export default CompletePackageBooking;
