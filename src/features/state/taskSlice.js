import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  taskForm: {
    title: "",
    description: "",
    priority: "",
    duedate: "",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /**
     * Add a new task to the tasks array.

    */
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    /**
     * Remove a task by its id.
     */
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    /**
     * Update an existing task by id (partial update).
     */
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },

    /**
     * Delete all tasks.
     */
    deleteAllTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { addTask, removeTask, updateTask, deleteAllTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
