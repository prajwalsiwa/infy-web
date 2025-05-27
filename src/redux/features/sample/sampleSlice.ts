import { rootApi } from "../../root.api";

export const sampleSlice = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoomAmenities: builder.query<[], void>({
      query: () => {
        return {
          url: "/sample/",
          method: "GET",
        };
      },
    }),
    fetchRooms: builder.query<
      {
        total: number;
        total_pages: number;
        per_page: number;
        results: [];
      },
      { organization: number; search: string; page: number; limit: number }
    >({
      query: ({ organization, search, page, limit }) => ({
        url: `/rooms/?organisation=${organization}&search=${search}&page=${page}&per_page=${limit}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "Sample" as const,
                id,
              })),
              "Sample",
            ]
          : ["Sample"],
    }),
    createRoom: builder.mutation<[], []>({
      query: (body) => {
        return {
          url: "/rooms/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Sample"],
    }),
  }),
});

export const {
  useGetRoomAmenitiesQuery,
  useFetchRoomsQuery,
  useLazyFetchRoomsQuery,
  useCreateRoomMutation,
} = sampleSlice;
