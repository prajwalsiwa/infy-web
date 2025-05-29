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
  }),
});

export const { useGetTopDealsQuery } = dealsApi;
