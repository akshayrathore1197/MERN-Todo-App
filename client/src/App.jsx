import { useState, useEffect } from "react";
import Todo from "./Todo";

export default function App() {
  let backendURL = "/api/todos";
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      const res = await fetch(backendURL);
      const todo = await res.json();

      setTodos(todo); // Use setTodo instead of setMessage
    }
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch(backendURL, {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <>
      <main className="container">
        <h1 className="title">MERN Todo</h1>
        <form className="form" onSubmit={createNewTodo}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter a new todo..."
            className="form__input"
            required
          />
          <button type="submit">Add Todo</button>
        </form>
        <div className="todos">
          {todos.length > 0 &&
            todos.map((todo) => (
              <Todo todo={todo} key={todo._id} setTodos={setTodos} />
            ))}
        </div>
      </main>
    </>
  );
}
