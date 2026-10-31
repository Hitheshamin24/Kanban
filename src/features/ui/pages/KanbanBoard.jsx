import React, { useState, useMemo } from "react";
import { Plus, LayoutDashboard, SearchX, Trash2 } from "lucide-react";
import { DUMMY_TASKS } from "../../state/dummyData";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

const COLUMNS = ["todo", "inprogress", "done"];

let idCounter = DUMMY_TASKS.length + 1;

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /* ── Filtered tasks ── */
  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || t.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, priorityFilter]);

  const hasActiveFilters = search !== "" || priorityFilter !== "all";
  const totalFiltered = filtered.length;

  /* ── Stats ── */
  const stats = useMemo(
    () => ({
      total: tasks.length,
      inprogress: tasks.filter((t) => t.status === "inprogress").length,
      done: tasks.filter((t) => t.status === "done").length,
    }),
    [tasks]
  );

  /* ── Handlers ── */
  const handleAddTask = (form) => {
    setTasks((prev) => [
      ...prev,
      { id: String(idCounter++), ...form, status: "todo" },
    ]);
  };

  const handleEditTask = (form) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === editTask.id ? { ...t, ...form } : t))
    );
    setEditTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const openAdd = () => {
    setEditTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTask(null);
  };

  /* ── Task to delete (for confirm dialog title) ── */
  const taskToDelete = tasks.find((t) => t.id === deleteConfirm);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <LayoutDashboard size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-sm font-bold text-gray-900">KanbanBoard</h1>
              <p className="text-[10px] text-gray-500 hidden sm:block">
                Project task manager
              </p>
            </div>
          </div>

          {/* Stats — hidden on small screens */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-gray-100 border border-gray-200 text-gray-600">
              {stats.total} Total
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700">
              {stats.inprogress} In Progress
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700">
              {stats.done} Done
            </span>
          </div>

          {/* Add Task button */}
          <button
            onClick={openAdd}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-150 shrink-0"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      {/* ── Page body ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar value={priorityFilter} onChange={setPriorityFilter} />
        </div>

        {/* Filter result info bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-md px-4 py-2.5 text-sm">
            <span className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-indigo-600">{totalFiltered}</span>{" "}
              {totalFiltered === 1 ? "result" : "results"}
              {search && (
                <>
                  {" "}for{" "}
                  <span className="font-semibold text-gray-800">"{search}"</span>
                </>
              )}
              {priorityFilter !== "all" && (
                <>
                  {" "}·{" "}
                  <span className="font-semibold capitalize text-gray-800">
                    {priorityFilter}
                  </span>{" "}
                  priority
                </>
              )}
            </span>
            <button
              onClick={() => {
                setSearch("");
                setPriorityFilter("all");
              }}
              className="cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline ml-4"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── No results empty state ── */}
        {hasActiveFilters && totalFiltered === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-gray-200 rounded-lg">
            <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
              <SearchX size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">
              No tasks found
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mb-5">
              No tasks match your search or filter. Try adjusting your keywords
              or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setPriorityFilter("all");
              }}
              className="cursor-pointer px-5 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* ── Kanban columns ── */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLUMNS.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={filtered.filter((t) => t.status === status)}
                onEdit={openEdit}
                onDelete={(id) => setDeleteConfirm(id)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Add / Edit Modal ── */}
      <TaskModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={editTask ? handleEditTask : handleAddTask}
        editTask={editTask}
      />

      {/* ── Delete Confirm Dialog ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div
            className="absolute inset-0"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-lg border border-gray-200 shadow-xl w-full max-w-sm p-6 flex flex-col gap-5">
            {/* Icon + text */}
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
                <Trash2 size={20} className="text-red-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Delete this task?
              </h3>
              {taskToDelete && (
                <p className="text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5">
                  "{taskToDelete.title}"
                </p>
              )}
              <p className="text-sm text-gray-500">
                This action is permanent and cannot be undone.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="cursor-pointer flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTask(deleteConfirm)}
                className="cursor-pointer flex-1 px-4 py-2.5 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 active:scale-95 transition-all duration-150"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
