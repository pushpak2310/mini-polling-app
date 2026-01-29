import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function PollCard({ poll }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [warningOpen, setWarningOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = () => {
    if (role !== "admin") {
      setWarningOpen(true);
    } else {
      setConfirmOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/polls/${poll.id}`);
      window.location.reload();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            {poll.question}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={() => navigate(`/polls/${poll.id}`)}
            >
              Vote Now
            </Button>

            <Button
              variant="outlined"
              color="error"
              sx={{ ml: "auto" }}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 🔒 PROFESSIONAL WARNING DIALOG */}
      <Dialog
        open={warningOpen}
        onClose={() => setWarningOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            px: 3,
            py: 2,
            minWidth: 360
          }
        }}
      >
        <DialogContent sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "#fff3e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2
            }}
          >
            <WarningAmberRoundedIcon
              sx={{ fontSize: 32, color: "#f57c00" }}
            />
          </Box>

          <Typography variant="h6" fontWeight={600} mb={1}>
            Access Restricted
          </Typography>

          <Typography color="text.secondary">
            You don’t have permission to delete polls.
            <br />
            Please log in as an administrator.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setWarningOpen(false)}
            sx={{ px: 4, textTransform: "none", fontWeight: 600 }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ ADMIN CONFIRM DELETE */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogContent>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Confirm Delete
          </Typography>

          <Typography color="text.secondary">
            Are you sure you want to permanently delete this poll?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
