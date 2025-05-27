import { setAuth, setAuthStateResponse } from "../features/authSlice";
import { UserProfileResponse } from "../features/Types/auth";
import { setUserProfile } from "../features/userSlice";
import { rootApi } from "../root.api";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      setAuthStateResponse,
      { username: string; password: string }
    >({
      query: (credentials) => {
        const basicAuth = btoa(
          `${credentials.username}:${credentials.password}`
        );
        return {
          url: "/auth/login/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuth}`,
          },
        };
      },

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));
        } catch (error) {
          console.error("Error login", error);
        }
      },
    }),
    refreshAuth: builder.mutation<setAuthStateResponse, { token: string }>({
      query: ({ token }) => ({
        url: "/auth/refresh/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));
        } catch (error) {
          console.error("Refresh auth faild", error);
        }
      },
    }),
    authUserProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "/user/profile/",
        method: "GET",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserProfile(data));
        } catch (error) {
          console.error(" Error fetching User Profile", error);
        }
      },
    }),
    register: builder.mutation<
      {
        full_name: string;
        email: string;
        confirm_password: string;
        password: string;
      },
      {
        username: string;
        password: string;
        full_name: string;
        email: string;
        confirm_password: string;
      }
    >({
      query: (credentials) => {
        return {
          url: "auth/user/register/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            username: credentials.username,
            password: credentials.password,
            full_name: credentials.full_name,
            email: credentials.email,
            confirm_password: credentials.confirm_password,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshAuthMutation,
  useRegisterMutation,
  useLazyAuthUserProfileQuery,
} = authApi;
