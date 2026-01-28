import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PollList from "./pages/PollList";
import PollDetail from "./pages/PollDetail";
import CreatePoll from "./pages/CreatePoll";
import Results from "./pages/Results";
import Login from "./pages/Login";

/* ---------- Protected Routes ---------- */

// Any logged-in user (admin or user)
function PrivateRoute({ children }) {
  const role = localStorage.getItem("role");
  return role ? children : <Navigate to="/" />;
}

// Only admin
function AdminRoute({ children }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" />;
  }

  if (role !== "admin") {
    return <Navigate to="/polls" />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Poll list (user + admin) */}
        <Route
          path="/polls"
          element={
            <PrivateRoute>
              <PollList />
            </PrivateRoute>
          }
        />

        {/* Poll detail */}
        <Route
          path="/polls/:id"
          element={
            <PrivateRoute>
              <PollDetail />
            </PrivateRoute>
          }
        />

        {/* Create poll (admin only) */}
        <Route
          path="/create"
          element={
            <AdminRoute>
              <CreatePoll />
            </AdminRoute>
          }
        />

        {/* Results */}
        <Route
          path="/results/:id"
          element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
