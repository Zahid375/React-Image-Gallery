import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '../css/style.css';

function Image({ src, alt, id, index, onChange }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`image-item ${snapshot.isDragging ? 'dragging' : ''}`}
        >
          <input
            type="checkbox"
            className="image-selector"
            id={id}
            onChange={onChange}
          />
          <img src={src} alt={alt} />
        </div>
      )}
    </Draggable>
  );
}

export default Image;
