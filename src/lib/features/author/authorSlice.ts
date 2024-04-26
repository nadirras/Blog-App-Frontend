import { createSlice } from "@reduxjs/toolkit";

export interface AuthorSlice {
  value: {
    id: number | null;
    name: string;
    email: string;
  };
}

const initialState: AuthorSlice = {
  value: {
    id: null,
    name: "",
    email: "",
  },
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = authorSlice.actions;
