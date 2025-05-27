/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingResponse, HotelDetails } from "@/lib/types/staysTypes";
import { BookingCardProps } from "@/components/checkout/components/BookingCard";

interface BookingState {
  checkin_date: string | null;
  checkout_date: string | null;
  property?: number;
  room_details: { room: number; room_count: number | null }[];
  adults: number;
  children: number;
  infants: number;
}

export interface userInfoState {
  email: string;
  mobile_number: string;
  name: string;
}

interface StaysState {
  hotels: any | null;
  hotelDetails: HotelDetails | null; // Added hotelDetails state
  pendingBooking: BookingState | null;
  userInfo: userInfoState | null;
  rooms: { roomId: number | null; room: number | null };
  availableRooms: any;
  bookingDetail: BookingResponse | null;
  booking: BookingCardProps | null;
  bookingConfirmDetails: any | null;
}

const initialState: StaysState = {
  hotels: null,
  hotelDetails: null, // Initialize hotelDetails as null
  pendingBooking: null,
  userInfo: null,
  rooms: { roomId: null, room: null },
  availableRooms: [],
  bookingDetail: null,
  booking: null,
  bookingConfirmDetails: null,
};

const staysSlice = createSlice({
  name: "stays",
  initialState,
  reducers: {
    setHotelList: (state, action: PayloadAction<any>) => {
      state.hotels = action.payload;
    },
    setAvailableRooms: (state, action: PayloadAction<any>) => {
      state.availableRooms = action.payload;
    },

    setNumberOfRooms: (state, action) => {
      state.rooms = action.payload;
    },

    // New reducer for setting hotel details
    setHotelDetails: (state, action: PayloadAction<HotelDetails | null>) => {
      state.hotelDetails = action.payload;
    },

    setBookingDetails: (state, action) => {
      state.bookingDetail = action.payload;
    },

    setPendingBooking: (state, action: PayloadAction<BookingState>) => {
      state.pendingBooking = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<userInfoState>) => {
      state.userInfo = action.payload;
    },
    setBooking: (state, action) => {
      state.booking = action.payload;
    },
    setBookingConfirmDetails: (state, action) => {
      state.bookingConfirmDetails = action.payload;
    },
  },
});

export const {
  setHotelList,
  setHotelDetails,
  setPendingBooking,
  setUserInfo,
  setNumberOfRooms,
  setAvailableRooms,
  setBookingDetails,
  setBooking,
  setBookingConfirmDetails,
} = staysSlice.actions;

export default staysSlice.reducer;
