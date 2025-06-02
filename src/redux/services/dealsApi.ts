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
      {
        city: string;
        sort_by: string;
        checkin_date?: string;
        checkout_date?: string;
        adults?: string;
        children?: string;
        infants?: string;
      }
    >({
      query: ({
        city,
        sort_by,
        checkin_date,
        checkout_date,
        adults,
        children,
        infants,
      }) => {
        const params = new URLSearchParams({
          city,
          sort_by,
        });

        if (checkin_date) params.set("checkin_date", checkin_date);
        if (checkout_date) params.set("checkout_date", checkout_date);
        if (adults) params.set("adults", adults);
        if (children) params.set("children", children);
        if (infants) params.set("infants", infants);

        return `top-deals-detail/?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetTopDealsQuery, useGetHotelDealsQuery } = dealsApi;
