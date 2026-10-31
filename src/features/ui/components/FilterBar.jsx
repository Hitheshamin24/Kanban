import React from "react";
import { Filter } from "lucide-react";

const PRIORITIES = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "todo", label: "To Do" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const FilterBar = ({ priority, onPriorityChange, status, onStatusChange }) => {
  return (
    <div className="flex gap-2 w-full sm:w-auto">
      {/* Priority filter */}
      <div className="relative flex-1 sm:flex-initial">
        <Filter
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="cursor-pointer w-full pl-8 pr-4 py-2.5 rounded-md border border-gray-300 bg-white text-sm text-gray-700 font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors appearance-none"
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status filter */}
      <div className="relative flex-1 sm:flex-initial">
        <Filter
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="cursor-pointer w-full pl-8 pr-4 py-2.5 rounded-md border border-gray-300 bg-white text-sm text-gray-700 font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors appearance-none"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
