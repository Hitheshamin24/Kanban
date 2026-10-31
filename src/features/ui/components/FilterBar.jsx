import React from "react";
import { Filter } from "lucide-react";

const PRIORITIES = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const FilterBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Filter
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer pl-8 pr-4 py-2.5 rounded-md border border-gray-300 bg-white text-sm text-gray-700 font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors appearance-none"
      >
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
