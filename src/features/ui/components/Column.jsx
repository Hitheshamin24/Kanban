import React from "react";
import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";

const COLUMN_META = {
  todo: {
    label: "To Do",
    accent: "border-t-slate-500",
    countBg: "bg-slate-100 text-slate-700",
    emptyMsg: "Add a task to get started",
  },
  inprogress: {
    label: "In Progress",
    accent: "border-t-indigo-500",
    countBg: "bg-indigo-100 text-indigo-700",
    emptyMsg: "Move tasks here as work progresses",
  },
  done: {
    label: "Done",
    accent: "border-t-emerald-500",
    countBg: "bg-emerald-100 text-emerald-700",
    emptyMsg: "Completed tasks will appear here",
  },
};

const Column = ({ status, tasks, onEdit, onDelete, onStatusChange }) => {
  const meta = COLUMN_META[status];

  return (
    <div
      className={`bg-gray-50 rounded-lg border border-gray-200 border-t-4 ${meta.accent} flex flex-col min-h-120`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-tr-lg">
        <h2 className="text-sm font-bold text-gray-700 tracking-wide">
          {meta.label}
        </h2>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.countBg}`}>
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-3 p-3 flex-1">
        {tasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
            <ClipboardList size={30} className="text-gray-300 mb-3" />
            <p className="text-sm font-semibold text-gray-400">No tasks here</p>
            <p className="text-xs text-gray-300 mt-1 max-w-40">{meta.emptyMsg}</p>
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
