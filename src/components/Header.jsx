import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function getNavigationClass({ isActive }) {
  const baseClasses =
    "rounded-lg px-4 py-2 text-sm font-medium transition-colors";

  return isActive
    ? `${baseClasses} bg-indigo-600 text-white`
    : `${baseClasses} text-slate-600 hover:bg-slate-100 hover:text-slate-900`;
}

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Unable to log out:", error);
    }
  };
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FlowDesk</h1>
          <p className="mt-1 text-sm text-slate-500">
            Organise, track and complete your work
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="text-sm text-slate-500">{user?.email}</div>

          <nav className="flex w-fit gap-2 rounded-xl bg-slate-50 p-1">
            <NavLink to="/" end className={getNavigationClass}>
              All Tasks
            </NavLink>

            <NavLink to="/completed" className={getNavigationClass}>
              Completed Tasks
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
