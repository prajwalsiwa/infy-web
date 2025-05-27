/* eslint-disable max-lines */
import { trends } from "@/redux/services/homeApi";
import { Amenity } from "./staysTypes";
import { Comment } from "@/components/SearchDetails/stays/HotelDetails/HotelDetailSection/Review/CommentSection";

// Define the types for nested objects first
interface PackageType {
  id: number;
  name: string;
  color: string;
  rate_depends_per_person: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: string | null;
  color: string;
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

interface Result {
  id: number;
  package_type: PackageType;
  user_property: UserProperty;
  title: string;
  number_of_nights: number;
  number_of_days: number;
  price: number;
  actual_price: number;
  validate_daily: boolean;
  avg_rating: number;
  user_review_count: number;
  package_images: string[]; // Assuming the images are URLs
  amenities: Amenity[] | []; // Assuming amenities are strings
  featured_image_url: string;
}

// Main API Response type
interface PackageResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: Result[];
}

// package Detail types

//comp packageDetails

type recommendation = {
  id?: number;
  name?: string;
  category?: {
    id?: number;
    name?: string;
    icon?: string | null;
    color?: string;
  };
  photo_url?: string;
  discount_percentage?: number;
  location?: {
    city?: string;
    country?: string;
    zipcode?: string | null;
    latitude?: number;
    longitude?: number;
    street_name?: string;
    street_number?: string | null;
    bf_unit_number?: string | null;
    continent?: string;
  };
  ratings?: number;
  original_price?: number;
  days?: number;
  night?: number;
};

export interface Reviews {
  id: number;
  review_by: {
    id: number;
    first_name: string;
    last_name: string;
    display_name: string | null;
    email: string;
    profile_picture: string | null;
  };
  rating: number;
  review: string;
}

export interface Review {
  ratings?: number;
  reviewCount?: number;
  comment?: Comment[];
}
export interface PackageDetailsProps {
  trendList?: trends[];
  recommendationList?: Hotel[];
  detailHeader: {
    image?: string;
    title?: string;
    location?: string;
    ratings?: number;
    reviews?: number;
  };
  description: {
    description?: string;
    whatsIncluded?: string[];
    date: { start?: string; end?: string };
  };
  policy?: string[];
  reviews?: Review;
}

//pacakge detail response

export interface PackageDetailResponse {
  id: number;
  package_type: {
    id: number;
    name: string;
    color: string;
    rate_depends_per_person: boolean;
  };
  user_property: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
      icon: string | null;
      color: string;
    };
    photo_url: string;
    location: {
      city: string;
      country: string;
      zipcode: string | null;
      latitude: number | null;
      longitude: number | null;
      street_name: string;
      street_number: string | null;
      bf_unit_number: string | null;
      continent: string;
    };
    min_room_price: number;
    ratings: number;
    user_review_count: number;
  };
  title: string;
  description: string;
  booking_start_date: string; // ISO 8601 date string
  booking_end_date: string; // ISO 8601 date string
  number_of_nights: number;
  number_of_days: number;
  price: number;
  actual_price: number;
  number_of_guests: number;
  validate_daily: boolean;
  checkin_valid_start_date: string | null; // ISO 8601 date string
  checkin_valid_end_date: string | null; // ISO 8601 date string
  avg_rating: number;
  user_review_count: number;
  package_policy: string; // HTML string
  package_images: Array<{
    id: number;
    url: string;
  }>;
  user_reviews: Array<{
    id: 1;
    review_by: {
      id: number;
      first_name: string;
      last_name: string;
      display_name: null;
      email: string;
      profile_picture: string;
    };
    rating: number;
    review: string;
  }>;
  amenities: Array<{
    id: number;
    title: string;
    category: string;
    amenities_for: string;
    icon: string;
  }>;
  whats_included: string; // HTML string
  where_you_will_be: {
    latitude: number | null;
    longitude: number | null;
  };
  minimum_pre_payment: number | null;
  cancellation_charge: number;
  allowed_booking_dates: string[];
  featured_image_url?: string; // Array of ISO 8601 date strings
}

export interface checkPackageAvailabilityResponseType {
  available_quantity: number;
  allowed_number_of_guests: number;
  total_amount: number;
}
export interface checkPackageAvailabilityBodyType {
  packageId: number;
  number_of_guests: number;
  date: string;
}

export interface packageBookingResponseType {
  booking_detail: {
    id: number;
    booked_on: string;
    user_info: {
      email: string;
      mobile_number: string;
      name: string;
      is_account_holder_phone_verified: boolean;
    };
    booking_id: string;
    booked_by: {
      id: number;
      first_name: string;
      last_name: string;
      display_name: string | null;
      email: string;
      profile_picture: string | null;
    };
    package: {
      id: number;
      package_type: {
        id: number;
        name: string;
        color: string;
        rate_depends_per_person: boolean;
      };
      user_property: {
        id: number;
        name: string;
        category: {
          id: number;
          name: string;
          icon: string | null;
          color: string;
        };
        photo_url: string;
        location: {
          city: string;
          country: string;
          zipcode: null;
          latitude: number;
          continent: string;
          longitude: number;
          street_name: string;
          street_number: number | null;
          bf_unit_number: number | null;
        };
        min_room_price: number;
        ratings: number;
        user_review_count: number;
      };
      title: string;
      number_of_nights: number;
      number_of_days: number;
      price: number;
      actual_price: number;
      validate_daily: boolean;
      avg_rating: number;
      user_review_count: number;
      package_images: [];
      amenities: [
        {
          id: number;
          title: string;
          category: string;
          amenities_for: string;
          icon: string;
        }
      ];
      featured_image_url: string;
    };
    booking_status: string;
    reserve_expires_in: string;
    number_of_guests: number;
    cancelled: boolean;
  };
  total_amount: number;
  payment_options: string[];
  base_url: string;
  minimum_payment: number | null;
}

export interface packageBookingBodyType {
  packageId: number;
  number_of_guests: number;
  date: string | Date;
  discount_code: string | null;
}

export default PackageResponse;
