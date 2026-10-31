import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/state/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// sync redux state changes to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("kanban-tasks", JSON.stringify(state.tasks.tasks));
  } catch (err) {
    console.warn("Failed to save tasks to localStorage:", err);
  }
});
