import React, { useState } from 'react';
import Todo from './Todo';
import './Style.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex].text = newTask;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
    setNewTask('');
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggle = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  return (
    <div className="app">
      <h2>To-Do List</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task, index) => (
          <Todo
            key={index}
            task={task}
            onDelete={() => handleDelete(index)}
            onToggle={() => handleToggle(index)}
            onEdit={() => handleEdit(index)}
          />
        ))
      )}
    </div>
  );
}

export default App;
