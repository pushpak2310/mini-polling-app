import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  // hide navbar completely if not logged in
  if (!role) return null;

  return (
    <AppBar position="static" elevation={4}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          🗳️ Mini Polling App
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {/* POLLS - admin + user */}
          <Button
            color="inherit"
            component={Link}
            to="/polls"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Polls
          </Button>

          {/* CREATE POLL - admin only */}
          {role === "admin" && (
            <Button
              color="inherit"
              component={Link}
              to="/create"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Create Poll
            </Button>
          )}

          {/* LOGOUT */}
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
