import React, { useEffect, useState } from 'react';
import './App.css';
import HeaderTodoList from './components/HeaderTodoList/HeaderTodoList';
import SortAndFindTask from './components/SortAndFindTask/SortAndFindTask';
import TasksComponent from './components/TasksComponent/TasksComponent';
import ModalWindow from './components/ModalWindow/ModalWindow';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [sortValue, setSortValue] = useState('');
  const [findValue, setFindValue] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [setTasks]);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  const handleAddTaskClick = (newTask) => {
    addTask(newTask);
  };

  const handleDeleteTask = (taskId, taskTitle) => {
    setTaskToDelete({ id: taskId, title: taskTitle });
    setModalVisible(true);
  };

  const confirmDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
    setTasks(updatedTasks);
    setModalVisible(false);
    setTaskToDelete(null);
  };

  const cancelDeleteTask = () => {
    setModalVisible(false);
    setTaskToDelete(null);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
  };

  const handleFavoriteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, favorite: !task.favorite } : task));
    setTasks(updatedTasks);
  };

  return (
    <div>
      <HeaderTodoList onAddTask={handleAddTaskClick} />
      <main>
        <SortAndFindTask setSortValue={setSortValue} setFindValue={setFindValue} />
        <TasksComponent
          tasks={tasks}
          sortValue={sortValue}
          findValue={findValue}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onFavoriteTask={handleFavoriteTask}
        />
      </main>
      <ModalWindow
        isVisible={isModalVisible}
        title={taskToDelete?.title}
        onConfirm={confirmDeleteTask}
        onCancel={cancelDeleteTask}
      />
    </div>
  );
}
