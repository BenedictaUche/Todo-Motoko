import React, { useState, useEffect } from 'react';
import { Todo_backend } from '../../declarations/Todo_backend';

const App = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todosList = await Todo_backend.getTodos();
    setTodos(todosList);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const todoInput = e.target.elements.todo;
    const newTodo = todoInput.value.trim();
    if (newTodo) {
      await Todo_backend.addTodo(newTodo);
      todoInput.value = '';
      fetchTodos();
    }
  };

  const handleRemoveTodo = async (index) => {
    await Todo_backend.removeTodo(index);
    fetchTodos();
  };

  return (
    <main>
      <img src='../public/logo2.svg' alt="DFINITY logo" />
      <br />
      <br />
      <form id="todo-form" onSubmit={handleAddTodo}>
        <label htmlFor="todo">Create a to-do list &nbsp;</label>
        <br />
        <div className="input">
          <input id="todo" name="todo" type="text" />
          <button type="submit">Add</button>
        </div>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
