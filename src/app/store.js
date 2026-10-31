import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/state/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
