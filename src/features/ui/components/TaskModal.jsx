import React, { useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";

const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "",
  duedate: "",
};

const validate = (form) => {
  const errors = {};
  if (!form.title.trim()) errors.title = "Title is required.";
  else if (form.title.trim().length < 3)
    errors.title = "Title must be at least 3 characters.";

  if (!form.description.trim())
    errors.description = "Description is required.";

  if (!form.priority) errors.priority = "Please select a priority.";

  if (!form.duedate) errors.duedate = "Due date is required.";
  else if (new Date(form.duedate) < new Date(new Date().toDateString()))
    errors.duedate = "Due date cannot be in the past.";

  return errors;
};

const inputBase =
  "w-full rounded-md border px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors duration-150 focus:ring-2";
const inputNormal =
  "border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-100";
const inputError =
  "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100";

const TaskModal = ({ isOpen, onClose, onSubmit, editTask }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || "",
        description: editTask.description || "",
        priority: editTask.priority || "",
        duedate: editTask.duedate || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setTouched({});
  }, [editTask, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) setErrors(validate(updated));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(EMPTY_FORM).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    );
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(form);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal panel */}
      <div className="relative w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              {editTask ? "Edit Task" : "Add New Task"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {editTask
                ? "Update the details below and save"
                : "Fill in the details to create a new task"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate className="px-5 py-5 flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Fix login bug"
              className={`${inputBase} ${errors.title && touched.title ? inputError : inputNormal}`}
            />
            {errors.title && touched.title && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={11} /> {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Briefly describe what needs to be done..."
              rows={3}
              className={`${inputBase} resize-none ${errors.description && touched.description ? inputError : inputNormal}`}
            />
            {errors.description && touched.description && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={11} /> {errors.description}
              </p>
            )}
          </div>

          {/* Priority + Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`cursor-pointer ${inputBase} ${errors.priority && touched.priority ? inputError : inputNormal}`}
              >
                <option value="">Select…</option>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
              {errors.priority && touched.priority && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle size={11} /> {errors.priority}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                name="duedate"
                type="date"
                value={form.duedate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`cursor-pointer ${inputBase} ${errors.duedate && touched.duedate ? inputError : inputNormal}`}
              />
              {errors.duedate && touched.duedate && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle size={11} /> {errors.duedate}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer flex-1 px-4 py-2.5 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-150"
            >
              {editTask ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
