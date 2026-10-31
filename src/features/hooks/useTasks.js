import { useState, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

const generateId = () =>
  `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage("kanban-tasks", []);

  // task counts per column
  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      inprogress: tasks.filter((t) => t.status === "inprogress").length,
      done: tasks.filter((t) => t.status === "done").length,
    }),
    [tasks]
  );

  const addTask = (form) => {
    setTasks((prev) => [...prev, { id: generateId(), ...form, status: "todo" }]);
  };

  const editTask = (id, form) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...form } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const changeStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const getTaskById = (id) => tasks.find((t) => t.id === id) ?? null;

  return { tasks, stats, addTask, editTask, deleteTask, changeStatus, getTaskById };
};

export default useTasks;
