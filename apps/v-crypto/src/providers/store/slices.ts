import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "src/types/user";

import { clearStore } from "./actions";

const user = createSlice({
  name: "user",
  initialState: {} as User,
  reducers: {
    setUser: (_state, { payload }: PayloadAction<User>) => {
      console.log("calling update user", payload);
      _state = payload;
      console.log("state updated from reducer", _state);
      return _state;
    },
  },
  extraReducers: {
    [clearStore.type]: () => {},
  },
});

export const { setUser } = user.actions;

export default combineReducers({
  user: user.reducer,
});
