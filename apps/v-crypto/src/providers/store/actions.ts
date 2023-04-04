import { createAction } from "@reduxjs/toolkit";

import { User } from "src/types/user";

export const updateUser = createAction<User>("updateUser");

export const clearStore = createAction("clearStore");
