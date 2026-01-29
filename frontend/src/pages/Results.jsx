import {
  Container,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Box,
  Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Results() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    api.get(`/polls/${id}`).then(res => setPoll(res.data));
  }, [id]);

  if (!poll) return null;

  const totalVotes = poll.options.reduce(
    (sum, opt) => sum + opt.votes,
    0
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Results
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
          >
            {poll.question}
          </Typography>

          <Stack spacing={3} sx={{ mt: 3 }}>
            {poll.options.map(opt => {
              const percent = totalVotes
                ? Math.round((opt.votes / totalVotes) * 100)
                : 0;

              return (
                <Box key={opt.id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={0.5}
                  >
                    <Typography variant="body1">
                      {opt.text}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {opt.votes} votes • {percent}%
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5
                      }
                    }}
                  />
                </Box>
              );
            })}
          </Stack>

          <Typography
            variant="caption"
            display="block"
            align="right"
            sx={{ mt: 3, color: "text.secondary" }}
          >
            Total votes: {totalVotes}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
