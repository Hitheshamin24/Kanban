import React from "react";
import { Plus, LayoutDashboard, SearchX, Trash2 } from "lucide-react";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import useTasks from "../../hooks/useTasks";
import useBoardUI from "../../hooks/useBoardUI";

const COLUMNS = ["todo", "inprogress", "done"];

const KanbanBoard = () => {
  const { tasks, stats, addTask, editTask, deleteTask, changeStatus, getTaskById } =
    useTasks();

  const {
    search, setSearch,
    priorityFilter, setPriorityFilter,
    filteredTasks, hasActiveFilters, totalFiltered, clearFilters,
    modalOpen, editingTask, openAddModal, openEditModal, closeModal,
    deleteTargetId, requestDelete, cancelDelete,
  } = useBoardUI(tasks);

  const handleModalSubmit = (form) => {
    if (editingTask) {
      editTask(editingTask.id, form);
    } else {
      addTask(form);
    }
    closeModal();
  };

  const handleConfirmDelete = () => {
    deleteTask(deleteTargetId);
    cancelDelete();
  };

  const taskToDelete = getTaskById(deleteTargetId);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <LayoutDashboard size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-sm font-bold text-gray-900">KanbanBoard</h1>
              <p className="text-[10px] text-gray-500 hidden sm:block">Project task manager</p>
            </div>
          </div>

          {/* Stats pills */}
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

          {/* Add Task */}
          <button
            onClick={openAddModal}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-150 shrink-0"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar value={priorityFilter} onChange={setPriorityFilter} />
        </div>

        {/* Active filter banner */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-md px-4 py-2.5 text-sm">
            <span className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-indigo-600">{totalFiltered}</span>{" "}
              {totalFiltered === 1 ? "result" : "results"}
              {search && <> for <span className="font-semibold text-gray-800">"{search}"</span></>}
              {priorityFilter !== "all" && (
                <> · <span className="font-semibold capitalize text-gray-800">{priorityFilter}</span> priority</>
              )}
            </span>
            <button
              onClick={clearFilters}
              className="cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline ml-4"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* No results state */}
        {hasActiveFilters && totalFiltered === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-gray-200 rounded-lg">
            <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
              <SearchX size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">No tasks found</h3>
            <p className="text-sm text-gray-500 max-w-xs mb-5">
              No tasks match your search or filter. Try adjusting your keywords or clearing the filters.
            </p>
            <button
              onClick={clearFilters}
              className="cursor-pointer px-5 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* Kanban columns */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLUMNS.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={filteredTasks.filter((t) => t.status === status)}
                onEdit={openEditModal}
                onDelete={requestDelete}
                onStatusChange={changeStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        editTask={editingTask}
      />

      {/* Delete Confirm */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="absolute inset-0" onClick={cancelDelete} />
          <div className="relative bg-white rounded-lg border border-gray-200 shadow-xl w-full max-w-sm p-6 flex flex-col gap-5">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
                <Trash2 size={20} className="text-red-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Delete this task?</h3>
              {taskToDelete && (
                <p className="text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5">
                  "{taskToDelete.title}"
                </p>
              )}
              <p className="text-sm text-gray-500">
                This action is permanent and cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="cursor-pointer flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
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
