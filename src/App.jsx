import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AllTasks />} />
        <Route path="completed" element={<CompletedTasks />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
