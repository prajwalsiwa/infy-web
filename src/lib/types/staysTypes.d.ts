/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Amenity {
  id: number;
  title: string;
  category: string;
  amenities_for: string;
  icon: string | null;
}

export interface RoomImage {
  id: number;
  caption: string;
  image_url: string;
  is_primary: boolean;
}

export interface RoomBed {
  id: number;
  room: number;
  number_of_bed: number;
  category: {
    id: number;
    name: string;
  };
}

export interface Room {
  id: number;
  name: string;
  room_numbers: string[];
  guest_capacity: {
    adults: number;
    infants: number;
    children: number;
  };
  no_of_rooms: number;
  category: string;
  price: number;
  size: number;
  amenities: {
    category: string;
    amenities: Amenity[];
  }[];
  room_images: RoomImage[];
  number_of_beds: RoomBed[];
}

export interface Policy {
  policy_category: string;
  policy_sub_category: string;
  policies: string[];
}

export interface RatedOn {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    icon: string | null;
    color: string;
  };
  location: {
    city: string;
    country: string;
    zipcode: string | null;
    latitude: number | null;
    longitude: number | null;
    street_name: string;
    street_number: string | null;
    bf_unit_number: string | null;
  };
  min_room_price: number;
  ratings: number;
  user_review_count: number;
  photo_url: string;
}

export interface RatedBy {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string | null;
  email: string;
  profile_picture: string | null;
}

export interface Rating {
  id: number;
  rated_on: RatedOn;
  rated_by: RatedBy;
  comments: string;
  rating_star: number;
  location: number;
  comfort: number;
  personnel: number;
  cleanliness: number;
  service: number;
  facilities: number;
  value_for_money: number;
}

export interface HotelDetails {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    icon: string | null;
    color: string;
  };
  location: {
    city: string;
    country: string;
    zipcode: string | null;
    latitude: number | null;
    longitude: number | null;
    street_name: string;
    street_number: string | null;
    bf_unit_number: string | null;
  };
  size: number;
  website: string | null;
  photo_url: string;
  description: string;
  is_accepted: boolean;
  checkin_time: string | null;
  checkout_time: string | null;
  views: number;
  ratings: number;
  user_review_count: number;
  rooms: Room[];
  discount_code_prefix: string;
  nearby_attractions: string | null;
  amenities: {
    category: string;
    amenities: Amenity[];
  }[];
  policies: Policy[];
  property_images: RoomImage[];
  special_deals: any[];
  min_room_price: number;
  original_price: number;
  discount_percentage: number;
  rating: Rating[];
}

// Type for the category of a bed
interface BedCategory {
  id: number;
  name: string;
}

// Type for the number of beds in a room
interface NumberOfBeds {
  id: number;
  room: number;
  number_of_bed: number;
  category: BedCategory;
}

// Type for room details
interface Room {
  id: number;
  name: string;
  no_of_rooms: number;
  price: number;
  number_of_beds: NumberOfBeds[];
}

// Type for guest capacity
interface GuestCapacity {
  adults: number;
  infants: number;
  children: number;
}

// Type for the main response
interface RoomBookingDetails {
  room: Room;
  available_count: number;
  nights: number;
  room_count: number;
  total_room_price: number;
  guest_capacity: GuestCapacity;
}

interface BookingResponse {
  booking_detail: {
    id: number;
    booking_id: string;
    property: {
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
        continent: string | null;
        street_name: string;
        street_number: string | null;
        bf_unit_number: string | null;
      };
      min_room_price: number;
      ratings: number;
      user_review_count: number;
    };
    checkin_date: string;
    checkout_date: string;
    booked_by: number;
    booked_on: string;
    reserve_expires_in: string;
    booking_status: string;
    cancelled: boolean;
    adults: number;
    children: number;
    payment_detail: null | any; // Replace `any` with specific type if details are available
    user_info: {
      full_name: string;
      email: string;
      phone: string | null;
      is_account_holder_phone_verified: boolean;
    };
    review: {
      rated_on: string | null;
      comments: string;
      rating_star: number | null;
      location: number | null;
      comfort: number | null;
      facilities: number | null;
      cleanliness: number | null;
      service: number | null;
      value_for_money: number | null;
    };
  };
  total_amount: number;
  pricing_detail: {
    room: number;
    no_of_rooms: number;
    nights: number;
    price: number;
  }[];
  payment_options: string[];
  base_url: string;
  minimum_payment: number;
}

export interface BookingResponse {
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

export interface Property {
  id: number;
  name: string;
  category: Category;
  photo_url: string;
  location: Location;
  min_room_price: number;
  ratings: number;
  user_review_count: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string | null;
  color: string;
}

export interface Location {
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

export interface PaymentDetail {
  id: number;
  paid_amount: number;
  total_amount: number;
  payment_method: string;
  status: string;
  coupon_code: string | null;
  promo_code: string | null;
}

export interface UserInfo {
  name: string;
  email: string;
  mobile_number: string;
}

export interface BookingDetail {
  id: number;
  room: Room;
  no_of_rooms: number;
  no_of_children: number | null;
  no_of_adults: number | null;
  price: number;
}

export interface Room {
  id: number;
  name: string;
  no_of_rooms: number;
  price: number;
  number_of_beds: any[]; // Replace `any[]` with a more specific type if available
}

// Example: Array of the API response
export type RoomBookingResponse = RoomBookingDetails[] | [];
