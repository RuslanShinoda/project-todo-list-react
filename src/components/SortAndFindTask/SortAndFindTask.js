import React from 'react';
import './SortAndFindTask.css';

export default function SortAndFindTask({ setSortValue, setFindValue }) {
  const handleSortValue = (elem) => {
    setSortValue(elem.target.value);
  };
  const handleFindValue = (elem) => {
    setFindValue(elem.target.value);
  };

  return (
    <div id="sortAndFindContainer">
      <label htmlFor="sortList" className="sortContainer">
        Sort
        <select name="sortList" id="sortList" className="form-control" onChange={handleSortValue}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
          <option value="favorite">Favorite</option>
          <option value="perDay">Per day</option>
          <option value="forWeek">For a week</option>
          <option value="perMonth">Per month</option>
        </select>
      </label>

      <label htmlFor="findInput" className="sortContainer">
        Find
        <input
          type="text"
          name="findInput"
          id="findInput"
          className="form-control"
          placeholder="Task name, words, #tags"
          onChange={handleFindValue}
        />
      </label>
    </div>
  );
}
