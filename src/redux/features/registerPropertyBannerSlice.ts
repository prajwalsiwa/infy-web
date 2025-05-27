import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faqsList: [],
};

const RegisterPropertyBannerSlice = createSlice({
  name: "RegisterPropertyBanner",
  initialState,
  reducers: {
    setFaqsList: (state, action) => {
      state.faqsList = action.payload;
    },
  },
});

export default RegisterPropertyBannerSlice.reducer;
export const { setFaqsList } = RegisterPropertyBannerSlice.actions;
