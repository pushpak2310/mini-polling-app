import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    localStorage.setItem("role", role);

    if (role === "admin") {
      navigate("/create");
    } else {
      navigate("/polls");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={600} mb={1}>
            Login
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Sign in as User or Admin
          </Typography>

          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e, val) => val && setRole(val)}
            sx={{
              backgroundColor: "#f1f3f5",
              borderRadius: 2,
              p: 0.5,
              mb: 3,
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                border: "none",
                borderRadius: 2,
                color: "#555"
              },
              "& .Mui-selected": {
                backgroundColor: "#1976d2 !important",
                color: "#fff !important",
                boxShadow: "0 4px 12px rgba(25,118,210,0.4)"
              }
            }}
          >
            <ToggleButton value="admin">Admin</ToggleButton>
            <ToggleButton value="user">User</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              py: 1.3,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={!!error}
        onClose={() => setError("")}
        PaperProps={{
          sx: {
            position: "absolute",
            top: 0,
            borderRadius: 3,
            minWidth: 360,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.25)"
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningAmberRoundedIcon color="warning" />
            <Typography fontWeight={600}>Warning</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">{error}</Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="contained" onClick={() => setError("")}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
