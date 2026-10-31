import React, { useState, useMemo } from "react";
import { Plus, LayoutDashboard, SearchX } from "lucide-react";
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
  const [deleteConfirm, setDeleteConfirm] = useState(null); // id of task to delete

  /* ── Derived filtered tasks ── */
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

  /* ── Handlers ── */
  const handleAddTask = (form) => {
    const newTask = {
      id: String(idCounter++),
      ...form,
      status: "todo",
    };
    setTasks((prev) => [...prev, newTask]);
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

  const openEdit = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditTask(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTask(null);
  };

  /* ── Stats ── */
  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inprogress: tasks.filter((t) => t.status === "inprogress").length,
    done: tasks.filter((t) => t.status === "done").length,
  }), [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-50">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-300">
              <LayoutDashboard size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-bold text-gray-900">KanbanBoard</h1>
              <p className="text-[10px] text-gray-400 hidden sm:block">Project task manager</p>
            </div>
          </div>

          {/* Stats pills — hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">
              {stats.total} Total
            </span>
            <span className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700">
              {stats.inprogress} In Progress
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
              {stats.done} Done
            </span>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-150 shadow-sm shadow-indigo-200 shrink-0"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar value={priorityFilter} onChange={setPriorityFilter} />
        </div>

        {/* Active filter info */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Showing{" "}
              <span className="font-semibold text-indigo-600">{totalFiltered}</span>{" "}
              {totalFiltered === 1 ? "result" : "results"}
              {search && (
                <> for <span className="font-semibold">"{search}"</span></>
              )}
              {priorityFilter !== "all" && (
                <> · <span className="capitalize font-semibold">{priorityFilter}</span> priority</>
              )}
            </span>
            <button
              onClick={() => { setSearch(""); setPriorityFilter("all"); }}
              className="text-xs text-indigo-600 hover:underline font-semibold"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── No results state ── */}
        {hasActiveFilters && totalFiltered === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <SearchX size={28} className="text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-700 mb-1">No tasks found</h3>
            <p className="text-sm text-gray-400 max-w-xs">
              No tasks match your current search or filter. Try different keywords or adjust the priority filter.
            </p>
            <button
              onClick={() => { setSearch(""); setPriorityFilter("all"); }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* ── Kanban Columns ── */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-2xl">🗑️</span>
              </div>
              <h3 className="text-base font-bold text-gray-900">Delete task?</h3>
              <p className="text-sm text-gray-500">
                This action cannot be undone. The task will be permanently removed.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTask(deleteConfirm)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 active:scale-95 transition-all duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
