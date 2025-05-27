import { rootApi } from "../root.api";

export interface FilterOption {
  id?: number;
  name?: string;
  title?: string;
  value: number;
  search_param?: string;
  search_params?: string; 
  category?: string;
}

export interface FilterSection {
  type: string;
  options: FilterOption[];
}

export interface FilterListApiResponse {
  side_filters: FilterSection[];
  filtered_param: Record<string, string | number | boolean | null>;
}


export const filterApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilterList: builder.query<FilterListApiResponse, void>({
      query: () => `/search-params/`,
    }),

  }),
});

export const { useGetFilterListQuery } = filterApi;