import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addTask as addTaskAction,
  removeTask as removeTaskAction,
  updateTask as updateTaskAction,
} from "../state/taskSlice";

const generateId = () =>
  `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

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
    dispatch(addTaskAction({ id: generateId(), ...form, status: "todo" }));
  };

  const editTask = (id, form) => {
    dispatch(updateTaskAction({ id, ...form }));
  };

  const deleteTask = (id) => {
    dispatch(removeTaskAction(id));
  };

  const changeStatus = (id, newStatus) => {
    dispatch(updateTaskAction({ id, status: newStatus }));
  };

  const getTaskById = (id) => tasks.find((t) => t.id === id) ?? null;

  return { tasks, stats, addTask, editTask, deleteTask, changeStatus, getTaskById };
};

export default useTasks;
