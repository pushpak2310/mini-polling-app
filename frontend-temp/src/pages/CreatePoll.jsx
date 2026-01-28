import {
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useState } from "react";
import api from "../services/api";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  const addOption = () => setOptions([...options, ""]);

  const removeOption = i => {
    if (options.length > 2) {
      setOptions(options.filter((_, idx) => idx !== i));
    }
  };

  const submit = async () => {
    if (!question.trim()) {
      setError("Poll question is required");
      return;
    }

    const filledOptions = options.filter(opt => opt.trim());

    if (filledOptions.length < 2) {
      setError("At least two options are required");
      return;
    }

    try {
      await api.post("/polls", {
        question,
        options: filledOptions
      });
      alert("Poll created!");
      setQuestion("");
      setOptions(["", ""]);
    } catch (err) {
      setError("Failed to create poll. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight={600}>
        Create Poll
      </Typography>

      <TextField
        fullWidth
        label="Poll Question"
        sx={{ mt: 3 }}
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />

      {options.map((opt, i) => (
        <Box key={i} sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField
            fullWidth
            label={`Option ${i + 1}`}
            value={opt}
            onChange={e => {
              const copy = [...options];
              copy[i] = e.target.value;
              setOptions(copy);
            }}
          />
          <IconButton onClick={() => removeOption(i)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={addOption}>
        Add Option
      </Button>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" size="large" onClick={submit}>
          Create Poll
        </Button>
      </Box>

      <Dialog
        open={!!error}
        onClose={() => setError("")}
        PaperProps={{
          sx: {
            position: "absolute",
            top: 30,
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
          <Typography color="text.secondary">
            {error}
          </Typography>
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
