import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";
import PollCard from "../components/PollCard";

export default function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    api.get("/polls").then(res => setPolls(res.data));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Active Polls
      </Typography>

      {polls.map(poll => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </Container>
  );
}
