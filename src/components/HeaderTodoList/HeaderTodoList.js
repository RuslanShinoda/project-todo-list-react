import React, { useState, useRef, useEffect } from 'react';
import './HeaderTodoList.css';
import projectLogo from '../../assets/logo/todo_logo.jpg';
import { v4 as uuidv4 } from 'uuid';

export default function HeaderTodoList({ onAddTask }) {
  const [newTask, setNewTask] = useState({
    id: '',
    title: '',
    text: '',
    tags: '',
    date: '',
    completed: false,
    favorite: false,
  });
  const [allNewTask, setAllNewTask] = useState(false);
  const [shake, setShake] = useState(false);

  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);

  const handleAddTaskClick = () => {
    if (!newTask.text) {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
      return;
    }

    if (newTask.text.trim()) {
      let formattedDate = newTask.date;
      if (!formattedDate) {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        formattedDate = `${year}-${month}-${day}`;
      }
      onAddTask({
        ...newTask,
        id: uuidv4(),
        date: formattedDate,
      });
      setNewTask({
        id: '',
        title: '',
        text: '',
        tags: '',
        date: '',
        completed: false,
        favorite: false,
      });
      setAllNewTask(false);
    }
  };

  const openAddingNewTask = () => {
    setAllNewTask(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (allNewTask) {
      titleInputRef.current.focus();
    }
  }, [allNewTask]);

  return (
    <header>
      <div id="headerTitle">
        <img src={projectLogo} alt="Logo for Todo list" className="mainLogo" />
        <h1>I must do...</h1>
      </div>

      <div id="addNewTaskContainer">
        {!allNewTask && (
          <input
            type="text"
            name="addNewTaskInput"
            id="addNewTaskInput"
            className="form-control"
            placeholder="Add new..."
            onFocus={openAddingNewTask}
          />
        )}

        {allNewTask && (
          <div id="inputsAddTaskContainer">
            <input
              type="text"
              name="title"
              id="addTitleForTask"
              className="form-control"
              placeholder="Title"
              value={newTask.title}
              onChange={handleChange}
              ref={titleInputRef}
            />
            <input
              type="text"
              name="text"
              id="addTextForTask"
              className={`${shake ? 'shake' : 'form-control'}`}
              placeholder="Text"
              value={newTask.text}
              onChange={handleChange}
              ref={textInputRef}
            />
            <input
              type="text"
              name="tags"
              id="addTagsForTask"
              className="form-control"
              placeholder="#tags"
              value={newTask.tags}
              onChange={handleChange}
            />
            <div id="inputDateContainer">
              <input
                type="date"
                name="date"
                id="addCompletionForTask"
                className="form-control"
                placeholder="Completion"
                value={newTask.date}
                onChange={handleChange}
              />
            </div>

            <button type="button" className="addNewTask" onClick={handleAddTaskClick}>
              <span className="addNewTask__text">Add</span>
              <span className="addNewTask__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                  height="24"
                  fill="none"
                  className="svg"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
