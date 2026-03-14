import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef(null);

  const save = () => {
    if (!text.trim()) return;
    onUpdate(todo.id, text.trim());
    setEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`toggle ${todo.text}`}
      />
      {editing ? (
        <>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") {
                setText(todo.text);
                setEditing(false);
              }
            }}
          />
          <button onClick={save}>Save</button>
          <button onClick={() => { setText(todo.text); setEditing(false); }}>Cancel</button>
        </>
      ) : (
        <>
          <span
            onDoubleClick={() => {
              setEditing(true);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [task, setTask] = useState("");
  const inputRef = useRef(null);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;
    const newTodo = { id: Date.now(), text: task.trim(), completed: false };
    setTodos([newTodo, ...todos]);
    setTask("");
    inputRef.current?.focus();
  };

  const toggleTodo = (id) => setTodos(
    todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
  );

  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));

  const updateTodo = (id, newText) => setTodos(
    todos.map(t => t.id === id ? { ...t, text: newText } : t)
  );

  return (
    <div className="app">
      <h1>React Todo List (CRUD + localStorage)</h1>
      <div className="input-area">
        <input
          ref={inputRef}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new task"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
}