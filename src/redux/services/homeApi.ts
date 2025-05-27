/* eslint-disable @typescript-eslint/no-explicit-any */
import { rootApi } from "../root.api";

export type trends = {
  location: string;
  listed_property: number;
  image: string;
};

export type HotelLocation = {
  longitude?: any;
  latitude?: any;
  city: string;
  country: string;
};

export type HotelAmenity = {
  id: number;
  title: string;
  category: string;
  amenities_for: string;
  icon: string | null;
};

export type Hotel = {
  id?: number;
  name: string;
  category: {
    id: number;
    name: string;
    icon: string | null;
    color: string;
  };
  photo_url: string;
  location: HotelLocation;
  ratings?: number;
  user_review_count?: number;
  min_room_price?: number;
  original_price?: number;
  discount_percentage: number;
  is_favourite?: boolean;
  amenities?: HotelAmenity[];
  days?: number;
  night?: number;
};

export type HotelRecommendationsResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: Hotel[];
};

export type NameSuggestionResponse = {
  hotelData: any[];
  locationData: any[];
};

export const homeApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrends: builder.query<trends[], void>({
      query: () => ({
        url: "/city-wise-property/",
        method: "GET",
      }),
    }),

    getHotelRecommendations: builder.query<HotelRecommendationsResponse, void>({
      query: () => ({
        url: "/recommendation/properties/",
        method: "GET",
      }),
    }),

    nameSuggestions: builder.query<NameSuggestionResponse, string>({
      query: (name) => ({
        url: "https://inf.rajeshpudasaini.com.np/api/namesuggestion/",
        method: "GET",
        params: { name },
      }),
    }),
  }),
});

export const { useGetTrendsQuery, useGetHotelRecommendationsQuery, useNameSuggestionsQuery } = homeApi;
