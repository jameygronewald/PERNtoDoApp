const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({ success: true });
});

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos

// get a todo

// update a todo

// delete a todo

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
