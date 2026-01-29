const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.getPolls = async (req, res) => {
  const db = readDB();
  res.json(db.polls.filter((p) => p.isActive));
};

exports.getPollById = async (req, res) => {
  const db = readDB();
  const poll = db.polls.find((p) => p.id == req.params.id);

  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }

  const options = db.options.filter((o) => o.pollId == poll.id);
  res.json({ poll, options });
};

exports.createPoll = async (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || options.length < 2) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const db = readDB();
  const pollId = Date.now();

  db.polls.push({
    id: pollId,
    question,
    isActive: true,
    createdAt: new Date(),
  });

  options.forEach((opt, idx) => {
    db.options.push({
      id: pollId + idx,
      pollId,
      text: opt,
      votes: 0,
    });
  });

  writeDB(db);
  res.status(201).json({ message: "Poll created successfully" });
};

exports.vote = async (req, res) => {
  const { optionId } = req.body;
  const userIp = req.ip;
  const pollId = Number(req.params.id);

  const db = readDB();

  const alreadyVoted = db.votes.find(
    (v) => v.userIp === userIp && v.pollId === pollId
  );

  if (alreadyVoted) {
    return res.status(400).json({ message: "Already voted" });
  }

  const option = db.options.find((o) => o.id == optionId);
  if (!option) {
    return res.status(404).json({ message: "Option not found" });
  }

  option.votes += 1;
  db.votes.push({
    id: Date.now(),
    pollId,
    optionId,
    userIp,
  });

  writeDB(db);
  res.json({ message: "Vote recorded" });
};

exports.getResults = async (req, res) => {
  const db = readDB();
  const pollId = Number(req.params.id);
  const options = db.options.filter((o) => o.pollId === pollId);
  res.json(options);
};

exports.deletePoll = async (req, res) => {
  const db = readDB();
  const pollId = Number(req.params.id);

  const pollIndex = db.polls.findIndex((p) => p.id === pollId);

  if (pollIndex === -1) {
    return res.status(404).json({ message: "Poll not found" });
  }

  db.polls.splice(pollIndex, 1);
  db.options = db.options.filter((o) => o.pollId !== pollId);
  db.votes = db.votes.filter((v) => v.pollId !== pollId);

  writeDB(db);
  res.json({ message: "Poll deleted successfully" });
};
