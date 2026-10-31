import React from "react";
import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";

const COLUMN_META = {
  todo: {
    label: "To Do",
    color: "bg-slate-500",
    light: "bg-slate-50 border-slate-200",
    countBg: "bg-slate-100 text-slate-600",
  },
  inprogress: {
    label: "In Progress",
    color: "bg-indigo-500",
    light: "bg-indigo-50 border-indigo-200",
    countBg: "bg-indigo-100 text-indigo-700",
  },
  done: {
    label: "Done",
    color: "bg-emerald-500",
    light: "bg-emerald-50 border-emerald-200",
    countBg: "bg-emerald-100 text-emerald-700",
  },
};

const Column = ({ status, tasks, onEdit, onDelete, onStatusChange }) => {
  const meta = COLUMN_META[status];

  return (
    <div className={`rounded-2xl border ${meta.light} flex flex-col min-h-125`}>
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-inherit">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${meta.color}`} />
          <h2 className="text-sm font-bold text-gray-700 tracking-wide uppercase">
            {meta.label}
          </h2>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.countBg}`}>
          {tasks.length}
        </span>
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-3 p-3 flex-1">
        {tasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
            <ClipboardList size={32} className="text-gray-300 mb-2" />
            <p className="text-sm text-gray-400 font-medium">No tasks here</p>
            <p className="text-xs text-gray-300 mt-1">
              {status === "todo"
                ? "Add a task to get started"
                : "Move tasks here as work progresses"}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
