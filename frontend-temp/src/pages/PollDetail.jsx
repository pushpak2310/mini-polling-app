import {
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Card,
  CardContent,
  Divider,
  Stack
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    api.get(`/polls/${id}`).then(res => {
      setPoll(res.data);
      if (localStorage.getItem(`voted_${id}`)) {
        setHasVoted(true);
      }
    });
  }, [id]);

  const vote = async () => {
    try {
      await api.post(`/polls/${id}/vote`, { optionId: selected });
      localStorage.setItem(`voted_${id}`, "true");
      setHasVoted(true);
      setError("Your vote has been submitted successfully");
    } catch {
      setHasVoted(true);
      setError("You have already voted on this poll");
    }
  };

  if (!poll) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {poll.question}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <RadioGroup
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            {poll.options.map(opt => (
              <FormControlLabel
                key={opt.id}
                value={opt.id}
                control={<Radio />}
                label={
                  <Typography fontSize={16}>
                    {opt.text}
                  </Typography>
                }
                disabled={hasVoted}
                sx={{
                  mb: 1,
                  px: 1,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#f5f7fa"
                  }
                }}
              />
            ))}
          </RadioGroup>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={!selected || hasVoted}
              onClick={vote}
            >
              Vote Now
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              disabled={!hasVoted}
              onClick={() => navigate(`/results/${id}`)}
            >
              View Results
            </Button>
          </Stack>

          {!selected && !hasVoted && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              Please select an option to vote
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Warning / Info Dialog */}
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
