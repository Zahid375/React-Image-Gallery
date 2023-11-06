import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, { useState, useEffect } from 'react';

function SortableImage({ id, src, alt, onChange }) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  
    return (
      <div
        className="image-item"
        ref={setNodeRef}
        style={{ transform, touchAction: 'none' }}
        {...attributes}
        {...listeners}
      >
        <input
          type="checkbox"
          className="image-selector"
          id={id}
          onChange={onChange}
        />
        <img src={src} alt={alt} />
      </div>
    );
  }

  export default SortableImage;
  