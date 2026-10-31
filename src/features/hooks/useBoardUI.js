import { useState, useMemo } from "react";

const useBoardUI = (tasks) => {
  // filter state
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // delete confirm state
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // filtered task list
  const filteredTasks = useMemo(() => {
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
  const totalFiltered = filteredTasks.length;

  const clearFilters = () => {
    setSearch("");
    setPriorityFilter("all");
  };

  const openAddModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const requestDelete = (id) => setDeleteTargetId(id);
  const cancelDelete = () => setDeleteTargetId(null);

  return {
    search, setSearch,
    priorityFilter, setPriorityFilter,
    filteredTasks, hasActiveFilters, totalFiltered, clearFilters,
    modalOpen, editingTask, openAddModal, openEditModal, closeModal,
    deleteTargetId, requestDelete, cancelDelete,
  };
};

export default useBoardUI;
