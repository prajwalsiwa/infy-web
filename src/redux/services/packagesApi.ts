import { rootApi } from "../root.api";
import {
  setPackageAvailability,
  setPackageBooking,
  setPackageDetail,
  setPackagesList,
} from "../features/packagesSlice";
import PackageResponse, {
  checkPackageAvailabilityBodyType,
  checkPackageAvailabilityResponseType,
  packageBookingBodyType,
  packageBookingResponseType,
  PackageDetailResponse,
} from "@/lib/types/packagesTypes";

export const packagesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    packageList: builder.query<PackageResponse, void>({
      query: () => ({
        url: "/packages-list/",
        method: "GET",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPackagesList(data));
        } catch (error) {
          console.error("Error fetching trends:", error);
        }
      },
    }),
    packageDetail: builder.query<PackageDetailResponse, number>({
      query: (packageId) => ({
        url: `/package/${packageId}`,
        method: "GET",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPackageDetail(data));
        } catch (error) {
          console.error("Error fetching trends:", error);
        }
      },
    }),
    checkPackageAvailability: builder.mutation<
      checkPackageAvailabilityResponseType,
      checkPackageAvailabilityBodyType
    >({
      query: ({ packageId, number_of_guests, date }) => ({
        url: "/check-package-availability/",
        method: "POST",
        body: {
          package: packageId,
          number_of_guests,
          date,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPackageAvailability(data));
        } catch (error) {
          console.error("Error to check room available or not", error);
        }
      },
    }),
    packageBooking: builder.mutation<
      packageBookingResponseType,
      packageBookingBodyType
    >({
      query: ({ packageId, number_of_guests, date, discount_code }) => {
        return {
          url: "/package-booking/",
          method: "POST",
          body: {
            package: packageId,
            number_of_guests,
            date,
            discount_code,
          },
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          if (data) {
            localStorage.setItem("packageCard", JSON.stringify(data));
          }
          dispatch(setPackageBooking(data));
        } catch (error) {
          console.error("Error booking package:", error);
        }
      },
    }),

    completePackageBooking: builder.mutation({
      query: ({
        bookingId,
        payment_method,
        paying_amount,
        promo_code,
        coupon_code,
        referral_earn_point,
        user_info,
      }) => ({
        url: `/package-booking/${bookingId}/complete-booking/`,
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
    getCompletePackageBooking: builder.query({
      query: (bookId) => ({
        url: `/package-booking/${bookId}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePackageListQuery,
  usePackageDetailQuery,
  useCheckPackageAvailabilityMutation,
  usePackageBookingMutation,
  useCompletePackageBookingMutation,
  useGetCompletePackageBookingQuery,
} = packagesApi;
