import { rootApi } from "../root.api";

export interface TopDealsResponse {
  links: {
    next: number | null;
    previous: number | null;
  };
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: [
    {
      city: string;
      count: number;
      max: number;
      image_url: string;
    }
  ];
}

export const dealsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopDeals: builder.query<TopDealsResponse, void>({
      query: () => `/top-deals-on-property/`,
    }),
    getHotelDeals: builder.query<
      TopDealsResponse,
      { city: string; sort_by: string }
    >({
      query: ({ city, sort_by }) =>
        `top-deals-detail/?city=${city}&sort_by=${sort_by}`,
    }),
  }),
});

export const { useGetTopDealsQuery, useGetHotelDealsQuery } = dealsApi;
