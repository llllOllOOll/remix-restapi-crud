import { useState, useEffect } from "react";
import "./todo.css";

type Todo = {
  id?: string;
  title: string;
  content: string;
  done: boolean;
};

const TodoComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");

  const addTodo = () => {
    if (todo.trim() !== "") {
      const newTodo: Todo = {
        title: todo,
        content: "",
        done: false,
      };

      fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((createdTodo) => {
          setTodos([...todos, createdTodo]);
          setTodo("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const toggleTodo = (id: string) => {
    fetch(`http://localhost:8000/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = (id: string) => {
    fetch(`http://localhost:8000/todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((deletedTodo: Todo) => {
        const updatedTodos = todos.filter((todo) => todo.id !== deletedTodo.id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData = () => {
    fetch("http://localhost:8000/todos")
      .then((res) => res.json())
      .then((jsonData) => setTodos(jsonData))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="todo-container">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="todo-input"
          placeholder="Type your new task"
        />

        <button onClick={addTodo} className="add-todo-button">
          Add Todo
        </button>
        <div className="todo-panel">
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id as string)}
                  className="todo-checkbox"
                />
                <span
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                  className="todo-title"
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id as string)}
                  className="delete-todo-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export { TodoComponent };
