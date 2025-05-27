export type Amenity = {
  id: number;
  title: string;
  category: string;
  amenities_for: string;
  icon: string | null;
};

export type AmenitiesCategory = {
  category: string;
  amenities: Amenity[];
};

export type submitAmenitiesResponse = {
  property: number | null;
  amenities: number[] | object;
};

// Define the type for the transformed amenitiesOptions
export type AmenitiesOption = {
  id: number;
  category: string;
  amenities: {
    id: number;
    name: string;
  }[];
};

// Define types for number of beds
interface Bed {
  name: string;
  quantity: number;
}

interface AddRoomBody {
  organisation: number;
  name: string;
  size: number;
  room_numbers: number[];
  amenities: number[];
  number_of_beds: {
    name: string;
    quantity: number;
  }[];
  photo_url: {
    name: string;
    url: string;
    favourite: boolean;
  }[];
  price: number;
  children: number;
  adults: number;
  infants: number;
}

// Define the main room type
export interface AddRoomResponse {
  id: number;
  name: string;
  room_numbers: string[];
  no_of_rooms: number;
  category: string | null;
  price: number;
  size: number;
  amenities: AmenityCategory[];
  room_images: string[]; // You can modify this if the image data is more complex
  number_of_beds: Bed[];
  adults: number;
  children: number;
  infants: number;
}

export interface listPolicy {
  id: number;
  policy_category: string;
  policy_sub_category: string;
  policy: string;
}

// Define the type for the policy sub-category
export interface PolicySubCategory {
  policy_sub_category: string;
  policy: listPolicy[];
}

// Define the type for the policy category
export interface PolicyCategory {
  policy_category: string;
  policy_sub_category: PolicySubCategory[];
}

export interface getMembershipPlansResponse {
  name: string;
  description: string;
  price: number;
  expires_on: number;
}
