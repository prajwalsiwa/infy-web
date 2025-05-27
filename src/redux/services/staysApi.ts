/* eslint-disable @typescript-eslint/no-explicit-any */
import { HotelDetails } from "@/lib/types/staysTypes";
import {
  setAvailableRooms,
  setBookingConfirmDetails,
  setBookingDetails,
  setHotelDetails,
  setHotelList,
} from "../features/staysSlice";
import { rootApi } from "../root.api";
import { HotelRecommendationsResponse } from "./homeApi";

export const staysApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    hotelList: builder.query<HotelRecommendationsResponse, Record<string, any>>(
      {
        query: (params) => {
          const queryString = new URLSearchParams(params).toString();
          return {
            url: `/properties?${queryString}`,
            method: "GET",
          };
        },
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            dispatch(setHotelList(data));
          } catch (error) {
            console.error("Error fetching trends:", error);
          }
        },
      }
    ),
    hotelDetails: builder.query<HotelDetails, number>({
      query: (hotelId) => ({
        url: `/properties/${hotelId}/`,
        method: "GET",
      }),
      onQueryStarted: async (_hotelId, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setHotelDetails(data)); // Dispatch the hotel details to Redux
        } catch (error) {
          console.error("Error fetching hotel details:", error);
        }
      },
    }),
    checkRoomAvailability: builder.mutation({
      query: ({ checkin_date, checkout_date, property, rooms }) => ({
        url: `/check-room-availability/`,
        method: "POST",
        body: {
          checkin_date,
          checkout_date,
          property,
          rooms,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAvailableRooms(data));
        } catch (error) {
          console.error("Error response available rooms", error);
        }
      },
    }),
    continueBooking: builder.mutation({
      query: ({
        checkin_date,
        checkout_date,
        property,
        room_details,
        adults,
        children,
        infants,
      }) => ({
        url: `/booking/`,
        method: "POST",
        body: {
          checkin_date,
          checkout_date,
          property,
          room_details,
          adults,
          children,
          infants,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem("bookId", data?.booking_detail?.id);

          dispatch(setBookingDetails(data));
        } catch (error) {
          console.error("Error response of booking", error);
        }
      },
    }),

    completeBooking: builder.mutation({
      query: ({
        bookingId,
        payment_method,
        paying_amount,
        promo_code,
        coupon_code,
        referral_earn_point,
        user_info,
      }) => ({
        url: `/booking/${bookingId}/complete-booking/`,
        method: "POST",
        body: {
          payment_method,
          paying_amount,
          promo_code,
          coupon_code,
          referral_earn_point,
          user_info,
        },
      }),
    }),

    getCompleteBooking: builder.query({
      query: (bookingId) => ({
        url: `/booking/${bookingId}/`,
        method: "GET",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setBookingConfirmDetails(data));
        } catch (error) {
          console.error("Error fetching bill", error);
        }
      },
    }),
  }),
});

export const {
  useHotelListQuery,
  useHotelDetailsQuery,
  useCheckRoomAvailabilityMutation,
  useContinueBookingMutation,
  useCompleteBookingMutation,
  useGetCompleteBookingQuery,
} = staysApi;
