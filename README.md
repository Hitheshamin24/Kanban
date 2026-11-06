# KanbanBoard

A clean, minimal **project task manager** built with React, Redux Toolkit, and Tailwind CSS. Manage your tasks across three workflow columns — **To Do**, **In Progress**, and **Done** — with real-time search, priority/status filtering, and persistent local storage.

🔗 **Live Demo:** [kanban-cohort.vercel.app](https://kanban-cohort.vercel.app)

---

## ✨ Features

- **Three-column Kanban layout** — To Do · In Progress · Done
- **Add / Edit tasks** via a validated modal form
- **Delete tasks** with a confirmation dialog to prevent accidents
- **Move tasks** forward/backward between columns using inline arrow buttons
- **Priority levels** — 🔴 High · 🟡 Medium · 🟢 Low — with colour-coded badges
- **Due date tracking** with overdue highlighting
- **Live search** — filters by task title or description as you type
- **Priority & status filters** — combine with search for precise results
- **Active filter banner** — shows result count and a one-click "Clear filters" shortcut
- **Empty states** — friendly prompts for empty columns and zero-result searches
- **Header stats pills** — at-a-glance totals for In Progress and Done tasks
- **Persistent storage** — tasks survive page refreshes via `localStorage`
- **Responsive design** — works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | [React 19](https://react.dev/) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) + React-Redux |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── store.js            # Redux store configuration
│   └── hooks.js            # Typed useAppDispatch / useAppSelector hooks
├── features/
│   ├── state/
│   │   └── taskSlice.js    # Redux slice — addTask, updateTask, removeTask
│   ├── hooks/
│   │   ├── useTasks.js       # Task CRUD actions + per-column stats
│   │   ├── useBoardUI.js     # Search/filter state + modal/delete UI state
│   │   └── useLocalStorage.js # Generic localStorage-backed useState hook
│   └── ui/
│       ├── pages/
│       │   └── KanbanBoard.jsx  # Root page — wires everything together
│       └── components/
│           ├── Column.jsx     # Kanban column with header + task list
│           ├── TaskCard.jsx   # Individual task card with status navigation
│           ├── TaskModal.jsx  # Add / Edit modal with form validation
│           ├── SearchBar.jsx  # Controlled search input
│           └── FilterBar.jsx  # Priority and status filter selects
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/kanban-board.git
cd kanban-board

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🗂️ Task Data Model

Each task stored in Redux (and persisted to `localStorage`) has the following shape:

```js
{
  id: "task-1234567890-abc12", // auto-generated unique ID
  title: "Fix login bug",      // string, min 3 characters (required)
  description: "...",          // string (required)
  priority: "high",            // "high" | "medium" | "low"
  duedate: "2025-12-31",       // ISO date string (required, cannot be in the past)
  status: "todo",              // "todo" | "inprogress" | "done"
}
```

---

## 🧩 Key Architecture Decisions

- **Custom hooks separate concerns** — `useTasks` owns Redux dispatch logic; `useBoardUI` owns local UI state (search, filters, modal open/close, delete confirmation). The page component is thin and just wires them together.
- **Validation on blur + submit** — the task modal shows inline errors field-by-field as the user leaves each input, then validates all fields together on submit.
- **Overdue detection** — a task card shows an "Overdue" label when its `duedate` has passed and it isn't in the Done column.
- **localStorage hydration in the slice** — initial state is loaded from `localStorage` inside `taskSlice.js`; a separate `useLocalStorage` hook syncs the store back to `localStorage` on every change.

---

## 📸 Screenshots

> _Add screenshots or a GIF of the app here._

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
