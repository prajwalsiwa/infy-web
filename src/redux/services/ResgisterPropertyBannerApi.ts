import { faq } from "@/components/home/registerProperty/FAQs";
import { setFaqsList } from "../features/registerPropertyBannerSlice";
import { rootApi } from "../root.api";

export const RegisterPropertyBannerApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    faqsList: builder.query<faq[], void>({
      query: () => ({
        url: "/list-your-property-faq/",
        method: "GET",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setFaqsList(data));
        } catch (error) {
          console.error("Error fetching faqs", error);
        }
      },
    }),
  }),
});

export const { useFaqsListQuery } = RegisterPropertyBannerApi;
