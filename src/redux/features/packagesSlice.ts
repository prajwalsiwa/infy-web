/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface PackagesState {
  packageList: any; 
  packageDetail: any;
  packageAvailable: any;
  packageBooking: any;
  continueBookingBody: any; 
}

const initialState: PackagesState = {
  packageList: null,
  packageDetail: null,
  packageAvailable: null,
  packageBooking: null,
  continueBookingBody: null,
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setPackagesList: (state, action) => {
      state.packageList = action.payload;
    },
    setPackageDetail: (state, action) => {
      state.packageDetail = action.payload;
    },
    setPackageAvailability: (state, action) => {
      state.packageAvailable = action.payload;
    },
    setPackageBooking: (state, action) => {
      state.packageBooking = action.payload;
    },
    setContinueBookingBody: (state, action) => {
      state.continueBookingBody = action.payload;
    },
  },
});

export const {
  setPackagesList,
  setPackageDetail,
  setPackageAvailability,
  setPackageBooking,
  setContinueBookingBody,
} = packagesSlice.actions;
export default packagesSlice.reducer;
