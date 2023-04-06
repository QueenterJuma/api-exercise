import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "users/getusers",
  async (thunkAPI) => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=5");
      const { result } = response.data;
      return result;
    } catch (erro) {
      return thunkAPI.rejectWithValue(erro.message);
    }
  }
);

const initialState = {
  users: [],
  isLoading: true,
  error: '',
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => ({
        ...state,
        users: action.payload,
        isLoading: true,
      }))
      .addCase(getUsers.fulfilled, (state, action) => ({
        ...state,
        users: action.payload,
        isLoading: false,
      }))
      .addCase(getUsers.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default usersSlice.reducer;