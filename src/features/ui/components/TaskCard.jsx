import React from "react";
import { CalendarDays, ChevronRight, Pencil, Trash2 } from "lucide-react";

const PRIORITY_STYLES = {
  high: {
    badge: "bg-red-100 text-red-700 border border-red-200",
    dot: "bg-red-500",
    label: "High",
  },
  medium: {
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
    label: "Medium",
  },
  low: {
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
    label: "Low",
  },
};

const STATUS_NEXT = {
  todo: { label: "Move to In Progress", next: "inprogress" },
  inprogress: { label: "Move to Done", next: "done" },
  done: null,
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low;
  const nextStatus = STATUS_NEXT[task.status];
  const isOverdue =
    task.status !== "done" && new Date(task.duedate) < new Date();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3 hover:border-gray-300 hover:shadow-sm transition-all duration-150">
      {/* Top row: Priority + Action buttons */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md ${priority.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="cursor-pointer p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit task"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="cursor-pointer p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 leading-snug mb-1">
          {task.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      </div>

      {/* Footer: Due date + Move button */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            isOverdue ? "text-red-500" : "text-gray-400"
          }`}
        >
          <CalendarDays size={12} />
          {isOverdue && <span>Overdue · </span>}
          {new Date(task.duedate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })}
        </span>

        {nextStatus && (
          <button
            onClick={() => onStatusChange(task.id, nextStatus.next)}
            className="cursor-pointer flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 hover:border-indigo-300 transition-colors"
            title={nextStatus.label}
          >
            {nextStatus.label.replace("Move to ", "")}
            <ChevronRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
