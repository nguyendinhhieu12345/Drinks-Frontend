import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

interface CallRealTime {
  incomingCall: boolean;
  callerID: string;
}

export interface SocketState {
  socket: Socket | null;
  callRealTime: CallRealTime;
}

const initialState: SocketState = {
  socket: null,
  callRealTime: {
    incomingCall: false,
    callerID: "",
  },
};

export const connectSocket = createAsyncThunk<
  void,
  void,
  { state: { socket: SocketState } }
>("socket/connect", async (_, thunkAPI) => {
  try {
    const socket = io("ws://localhost:8900");
    thunkAPI.dispatch(connected(socket as any));
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const socketSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    connected: (state, action: any) => {
      state.socket = action?.payload;
    },
    disconnected: (state) => {
      state.socket = null;
      state.callRealTime = {
        incomingCall: false,
        callerID: "",
      };
    },
  },
});

export const { connected, disconnected } = socketSlice.actions;

export default socketSlice.reducer;
