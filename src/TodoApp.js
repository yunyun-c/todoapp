import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");

  useEffect(() => {
    // Load tasks from local storage on initial render
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks state changes
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleRemoveCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = (filter) => {
    switch (filter) {
      case "All":
        return tasks;
      case "Active":
        return tasks.filter((task) => !task.completed);
      case "Completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const setFilter = (filter) => {
    // Update the state to reflect the selected filter
    setCurrentFilter(filter);
  };

  return (
    <div>
      <h1>#todo</h1>
      <div className="todo-info">
        <div className="input-info">
          {currentFilter !== "Completed" && (
            <div className="input">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Add a task"
              />
              <button onClick={handleAddTask}>Add Task</button>
            </div>
          )}
          <ul>
            {filteredTasks(currentFilter).map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task.id)}
                />
                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  <span className="material-icons">delete</span>
                </button>
              </li>
            ))}
          </ul>
          {currentFilter === "Completed" && (
            <button
              className="delete-all-btn"
              onClick={handleRemoveCompletedTasks}
            >
              <span className="material-icons">delete</span> Delete All
            </button>
          )}
        </div>

        <div className="toggle-btn">
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Active")}>Active</button>
          <button onClick={() => setFilter("Completed")}>Completed</button>
        </div>
      </div>
      <footer>
        <p>created by yunyun-c - devChallenges.io</p>
      </footer>
    </div>
  );
};

export default TodoApp;
