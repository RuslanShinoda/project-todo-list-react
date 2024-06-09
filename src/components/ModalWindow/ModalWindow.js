import React from 'react';
import './ModalWindow.css';

export default function Modal({ isVisible, title, onConfirm, onCancel }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div id="outsideModalWindowContainer">
      <div id="insideModalWindowContainer">
        <h2>Are you sure you want to delete {title ? `"${title}"` : 'this'} reminder?</h2>
        <div>
          <button id="modalWindowDeleteButton" onClick={onConfirm}>
            Delete
          </button>
          <button id="modalWindowCancelButton" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
