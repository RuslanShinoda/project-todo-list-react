import React, { useEffect, useState } from 'react';
import './TasksComponent.css';
import editMark from '../../assets/marks/edit-svgrepo-com.svg';
import deleteMark from '../../assets/marks/delete-svgrepo-com.svg';
import FavoriteElement from './usersElements/FavoriteElement';
import CheckboxElement from './usersElements/CheckboxElement';

export default function TasksComponent({
  tasks,
  onDeleteTask,
  onToggleComplete,
  onFavoriteTask,
  sortValue,
  findValue,
}) {
  const [tasksState, setTasksState] = useState([]);
  const [editableTaskId, setEditableTaskId] = useState(null);

  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  useEffect(() => {
    let sortedTasks = [...tasks];

    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(today.getMonth() + 1);

    if (sortValue === 'completed') {
      sortedTasks = tasks.filter((task) => task.completed);
    } else if (sortValue === 'active') {
      sortedTasks = tasks.filter((task) => !task.completed);
    } else if (sortValue === 'favorite') {
      sortedTasks = tasks.filter((task) => task.favorite);
    } else if (sortValue === 'perDay') {
      sortedTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        return (
          taskDate.getFullYear() === today.getFullYear() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getDate() === today.getDate()
        );
      });
    } else if (sortValue === 'forWeek') {
      sortedTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate >= today && taskDate <= oneWeekFromNow;
      });
    } else if (sortValue === 'perMonth') {
      sortedTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate >= today && taskDate <= oneMonthFromNow;
      });
    }

    if (findValue) {
      const lowerCaseFindValue = findValue.toLowerCase();
      sortedTasks = sortedTasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(lowerCaseFindValue) ||
          task.text.toLowerCase().includes(lowerCaseFindValue) ||
          task.tags.toLowerCase().includes(lowerCaseFindValue)
        );
      });
    }

    setTasksState(sortedTasks);
  }, [sortValue, findValue, tasks]);

  const handleEditClick = (taskId) => {
    setEditableTaskId(taskId);
  };

  const handleEditCancel = () => {
    setEditableTaskId(null);
  };

  const handleTitleChange = (taskId, event) => {
    const updatedTasks = tasksState.map((task) => (task.id === taskId ? { ...task, title: event.target.value } : task));
    setTasksState(updatedTasks);
  };

  const handleTextChange = (taskId, event) => {
    const updatedTasks = tasksState.map((task) => (task.id === taskId ? { ...task, text: event.target.value } : task));
    setTasksState(updatedTasks);
  };

  const handleDateChange = (taskId, event) => {
    const updatedTasks = tasksState.map((task) => (task.id === taskId ? { ...task, date: event.target.value } : task));
    setTasksState(updatedTasks);
  };

  const handleTagsChange = (taskId, event) => {
    const updatedTasks = tasksState.map((task) => (task.id === taskId ? { ...task, tags: event.target.value } : task));
    setTasksState(updatedTasks);
  };

  const handleEditSave = (taskId) => {
    setEditableTaskId(null);
    const updatedTask = tasksState.find((task) => task.id === taskId);
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedStoredTasks = storedTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedStoredTasks));
  };

  return (
    <div>
      {tasksState.map((task, index) => (
        <div className="taskContainer" key={index}>
          <div className="checkAndTextTaskContainer">
            <CheckboxElement checked={task.completed} onChange={() => onToggleComplete(task.id)} />
            <div className="taskInfoContainer">
              {editableTaskId === task.id ? (
                <div id="editTaskContainer">
                  <label>
                    Title
                    <input
                      className="form-control"
                      value={task.title}
                      onChange={(e) => handleTitleChange(task.id, e)}
                    />
                  </label>
                  <label>
                    Text
                    <input className="form-control" value={task.text} onChange={(e) => handleTextChange(task.id, e)} />
                  </label>
                  <label>
                    Date
                    <input
                      className="form-control"
                      type="date"
                      value={task.date}
                      onChange={(e) => handleDateChange(task.id, e)}
                    />
                  </label>
                  <label>
                    Tags
                    <input className="form-control" value={task.tags} onChange={(e) => handleTagsChange(task.id, e)} />
                  </label>
                  <div id="editButtonsContainer">
                    <button id="editCancelButton" onClick={() => handleEditSave(task.id)}>
                      Save
                    </button>
                    <button button id="editDeleteButton" onClick={handleEditCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={`taskTitle ${task.completed ? 'completed' : ''}`}>{task.title}</p>
                  <p className={`taskText ${task.completed ? 'completed' : ''}`}>{task.text}</p>
                  <p className="taskDate">{new Date(task.date).toLocaleDateString()}</p>
                  <p className="taskTags">{task.tags}</p>
                </>
              )}
            </div>
          </div>
          <div className="marksTaskContainer">
            <img title="Edit task" src={editMark} alt="Edit" onClick={() => handleEditClick(task.id)} />
            <img title="Delete task" src={deleteMark} alt="Delete" onClick={() => onDeleteTask(task.id)} />
            <FavoriteElement isChecked={task.favorite} onToggleFavorite={() => onFavoriteTask(task.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}
