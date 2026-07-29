import { NavLink } from "react-router-dom";

function getNavigationClass({ isActive }) {
  const baseClasses =
    "rounded-lg px-4 py-2 text-sm font-medium transition-colors";

  return isActive
    ? `${baseClasses} bg-indigo-600 text-white`
    : `${baseClasses} text-slate-600 hover:bg-slate-100 hover:text-slate-900`;
}

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
        <p className="mt-1 text-sm text-slate-500">
          Organise, track and complete your work
        </p>
      </div>
      <nav className="flex w-fit gap-2 rounded-xl bg-slate-50 p-1">
        <NavLink to="/" end className={getNavigationClass}>
          All Tasks
        </NavLink>
        <NavLink to="/completed" className={getNavigationClass}>
          Completed Tasks
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
