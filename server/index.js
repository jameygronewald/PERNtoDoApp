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
      'INSERT INTO todo (description) VALUES($1) RETURNING *', [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.messsage);
  }
});
// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await pool.query(
      `SELECT * FROM todo WHERE todo_id = ${req.params.id}`
    );
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const updatedTodo = await pool.query(
      `UPDATE todo SET description = $1 WHERE todo_id = ${req.params.id}`,
      [description]
    );
    res.json("Successfully updated todo!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await pool.query(
      `DELETE FROM todo WHERE todo_id = ${req.params.id}`
    );
    res.json("Successfully deleted todo.")
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
