const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/api/config", (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
