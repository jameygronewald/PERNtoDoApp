import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const body = { description };
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    window.location = '/';
  };

  return (
    <>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default InputTodo;
