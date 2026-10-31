import { createSlice } from "@reduxjs/toolkit";

const loadInitialTasks = () => {
  try {
    const saved = localStorage.getItem("kanban-tasks");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  tasks: loadInitialTasks(),
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
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    deleteAllTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { addTask, removeTask, updateTask, deleteAllTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
