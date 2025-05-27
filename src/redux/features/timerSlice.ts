import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: 900,
};

const TimerSlice = createSlice({
  name: "timerSlice",
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
  },
});

export default TimerSlice.reducer;
export const { setTimer } = TimerSlice.actions;
