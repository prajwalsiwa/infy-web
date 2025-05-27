/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AddRoomBody,
  AddRoomResponse,
  AmenitiesCategory,
  AmenitiesOption,
  Amenity,
  getMembershipPlansResponse,
  PolicyCategory,
  submitAmenitiesResponse,
} from "../features/Types/listYourProperty";
import { rootApi } from "../root.api";

export interface GetPropertyTypeListResponse {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const listYourPropertyApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getPropertyListings: builder.query<any,void>({
      query: () => ({
        url: "my/properties/",
        method: "GET",
      }),
    }),

    // Step 1: Basic info property type get API
    getPropertyTypeList: builder.query<GetPropertyTypeListResponse[], void>({
      query: () => "property-category/", // Simplified as GET is the default method
    }),

    // Step 1 final submit API
    submitPropertyInfo: builder.mutation({
      query: ({
        category,
        name,
        size,
        website,
        checkin_time,
        checkout_time,
        legal_documents,
        property_images,
      }) => ({
        url: "/property-basic-info/",
        method: "POST",
        body: {
          category,
          name,
          size,
          website,
          checkin_time,
          checkout_time,
          legal_documents,
          property_images,
        },
      }),
    }),

    // step 2 Submit Location list
    submitLocation: builder.mutation({
      query: ({
        city,
        street_name,
        street_no,
        country,
        zip_code,
        additional_information,
        latitude,
        longitude,
        property,
      }) => ({
        url: "property-location/",
        method: "POST",
        body: {
          city,
          street_name,
          street_no,
          country,
          zip_code,
          additional_information,
          latitude,
          longitude,
          property,
        },
      }),
    }),

    // Step 3: Get amenities list
    getAmenitiesList: builder.query<AmenitiesCategory[], void>({
      query: () => ({
        url: "/amenities/",
        method: "GET",
      }),
    }),

    // Step 3: Submit amenities API
    submitAmenities: builder.mutation<
      submitAmenitiesResponse,
      submitAmenitiesResponse
    >({
      query: ({ property, amenities }) => ({
        url: "/property-amenities/",
        method: "POST",
        body: {
          property,
          amenities,
        },
      }),
    }),

    // Step 4: Add room amenities
    getRoomAmenities: builder.query<AmenitiesOption[], number | null>({
      query: (property) => ({
        url: "property-amenities/",
        method: "GET",
        params: { property },
      }),
      transformResponse: (apiAmenities: Amenity[]): AmenitiesOption[] => {
        const groupedByCategory = apiAmenities.reduce((acc, amenity) => {
          const { category, id, title } = amenity;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({ id, name: title });
          return acc;
        }, {} as Record<string, { id: number; name: string }[]>);

        return Object.entries(groupedByCategory).map(
          ([category, amenities], index) => ({
            id: index + 1,
            category,
            amenities,
          })
        );
      },
    }),

    // Step 4: Add room final submit
    submitAddRoom: builder.mutation<AddRoomResponse, AddRoomBody>({
      query: ({
        organisation,
        name,
        size,
        room_numbers,
        amenities,
        photo_url,
        number_of_beds,
        price,
        children,
        infants,
        adults,
      }) => ({
        url: "rooms/",
        method: "POST",
        body: {
          organisation,
          name,
          size,
          room_numbers,
          number_of_beds,
          amenities,
          photo_url,
          price,
          children,
          infants,
          adults,
        },
      }),
    }),

    // step 5 get all polcies list
    getPolicies: builder.query<PolicyCategory[], void>({
      query: () => ({
        url: "policies/",
        method: "GET",
      }),
    }),

    //step 5 policies final submit
    submitPolicies: builder.mutation<
      { property: number; policies: number[] },
      { property: number; policies: number[] }
    >({
      query: ({ property, policies }) => ({
        url: "property-policies/",
        method: "POST",
        body: {
          property,
          policies,
        },
      }),
    }),

    // step 7 get membership plans
    getMembershipPlans: builder.query<getMembershipPlansResponse[], void>({
      query: () => ({
        url: "membership-plan/",
        method: "GET",
      }),
    }),

    // step 6 submit other info
    submitOtherInfo: builder.mutation({
      query: ({ property, description, nearby_attractions }) => ({
        url: "property-other-info/",
        method: "POST",
        body: {
          property,
          description,
          nearby_attractions,
        },
      }),
    }),

    // step 8 get all data for submit
    getSubmitDetails: builder.query<any, { propertyId: number }>({
      query: ({ propertyId }) => ({
        url: `listed-property/${propertyId}/`,
        method: "GET",
      }),
    }),

    // step 8 final submit
    submitDetails: builder.mutation({
      query: ({ is_accepted, property: propertyId }) => ({
        url: "submit-for-review/",
        method: "POST", // Make sure to specify the HTTP method
        body: {
          is_accepted,
          property: propertyId, // Correctly reference propertyId here
        },
      }),
    }),
  }),
});

export const {
  useGetPropertyListingsQuery,
  useGetPropertyTypeListQuery,
  useSubmitPropertyInfoMutation,
  useGetAmenitiesListQuery,
  useSubmitAmenitiesMutation,
  useGetRoomAmenitiesQuery,
  useSubmitAddRoomMutation,
  useGetPoliciesQuery,
  useSubmitPoliciesMutation,
  useGetMembershipPlansQuery,
  useSubmitOtherInfoMutation,
  useSubmitLocationMutation,
  useGetSubmitDetailsQuery,
  useSubmitDetailsMutation,
} = listYourPropertyApi;
