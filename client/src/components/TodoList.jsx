import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, [todos]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const JSONData = await response.json();
      setTodos(JSONData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async id => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <button className="btn btn-secondary">Edit</button>
              </td>
              <td>
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
