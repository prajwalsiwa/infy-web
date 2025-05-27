import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProfileResponse } from "./Types/auth";

interface userStateType {
  user: string | null;
}

const initialState: userStateType = {
  user: null,
};

export const UserSlice = createSlice({
  name: "HotelUser",
  initialState,
  reducers: {
    setUserProfile: (
      state,
      { payload }: PayloadAction<UserProfileResponse>
    ) => {
      state.user = `${payload.first_name} ${payload.last_name}`;
    },
  },
});

export const { setUserProfile } = UserSlice.actions;
export default UserSlice.reducer;
