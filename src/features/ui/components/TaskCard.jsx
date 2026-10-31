import React from "react";
import { CalendarDays, ChevronRight, Pencil, Trash2 } from "lucide-react";

const PRIORITY_STYLES = {
  high: {
    badge: "bg-red-100 text-red-700 border border-red-200",
    dot: "bg-red-500",
    label: "High",
  },
  medium: {
    badge: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    dot: "bg-yellow-500",
    label: "Medium",
  },
  low: {
    badge: "bg-green-100 text-green-700 border border-green-200",
    dot: "bg-green-500",
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 group">
      {/* Priority Badge */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${priority.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit task"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1">
          {task.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      </div>

      {/* Footer: Due date + Move Status */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            isOverdue ? "text-red-500" : "text-gray-400"
          }`}
        >
          <CalendarDays size={12} />
          {isOverdue ? "Overdue · " : ""}
          {new Date(task.duedate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })}
        </span>

        {nextStatus && (
          <button
            onClick={() => onStatusChange(task.id, nextStatus.next)}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors"
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
