import React from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

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

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low;
  const isOverdue =
    task.status !== "done" && new Date(task.duedate) < new Date();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3 hover:border-gray-300 hover:shadow-sm transition-all duration-150">
      {/* Top row: Priority badge + Action buttons */}
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

      {/* Due date */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap">
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

        {/* Status navigation buttons */}
        <div className="flex items-center gap-1">
          {task.status === "inprogress" && (
            <button
              onClick={() => onStatusChange(task.id, "todo")}
              className="cursor-pointer flex items-center gap-0.5 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md border border-gray-200 transition-colors"
              title="Move back to To Do"
            >
              <ChevronLeft size={12} />
              To Do
            </button>
          )}

          {task.status === "done" && (
            <button
              onClick={() => onStatusChange(task.id, "inprogress")}
              className="cursor-pointer flex items-center gap-0.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded-md border border-indigo-200 transition-colors"
              title="Move back to In Progress"
            >
              <ChevronLeft size={12} />
              In Progress
            </button>
          )}

          {task.status === "todo" && (
            <button
              onClick={() => onStatusChange(task.id, "inprogress")}
              className="cursor-pointer flex items-center gap-0.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded-md border border-indigo-200 hover:border-indigo-300 transition-colors"
              title="Move to In Progress"
            >
              In Progress
              <ChevronRight size={12} />
            </button>
          )}

          {task.status === "inprogress" && (
            <button
              onClick={() => onStatusChange(task.id, "done")}
              className="cursor-pointer flex items-center gap-0.5 text-xs font-semibold text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 hover:border-emerald-300 transition-colors"
              title="Move to Done"
            >
              Done
              <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
