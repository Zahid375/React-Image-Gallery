import React, {useState} from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import {Grid} from './Grid';
import {SortablePhoto} from './SortablePhoto';
import {Photo} from './Photo';
import photos from './photos.json';
import './css/style.css';

const UploadGallery = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleCheckboxChange = (event) => {
    console.log(click)
    const { id, checked } = event.target;
    if (checked) {
      setSelectedFiles([...selectedFiles, id]);
      event.target.style.display = 'inline-block';
      event.target.parentElement.style.opacity = '0.6';
    } else {
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id));
      event.target.style.display = '';
      event.target.parentElement.style.opacity = '1';
    }
  };

  const uncheckedall = () => {
    setSelectedFiles([]);
    items.forEach((image, index) => {
      const checkbox = document.getElementById(image.id);
      console.log(checkbox);
      if (checkbox) {
        checkbox.checked = false;
        checkbox.style.display = '';
        checkbox.parentElement.style.opacity = '1';
      }
    });
  };

  const handleDeleteFiles = () => {
    if (selectedFiles.length === 0) {
      console.log('No files selected for deletion.');
      return;
    }

    const updatedImages = items.filter(
      (image) => !selectedFiles.includes(image.id)
    );
    setImages(updatedImages);

    // Clear the selectedFiles array
    setSelectedFiles([]);
    items.forEach((image, index) => {
      const checkbox = document.getElementById(image.id);
      if (checkbox) {
        checkbox.checked = false;
        checkbox.style.display = '';
        checkbox.parentElement.style.opacity = '1';
      }
    });
  };

  return (
    <div className="container">
      <div className="gallery-header">
        <div>
          {selectedFiles.length === 0 ? (
            <h2>Gallery</h2>
          ) : (
            <div className="total-selector">
              <input
                type="checkbox"
                onChange={uncheckedall}
                id="total_selected_item"
                checked
              />
              <label htmlFor="total_selected_item">{`${selectedFiles.length} Files Selected`}</label>
            </div>
          )}
        </div>
        <div>
          {selectedFiles.length != 0 ? (
            <p className="delete-files" onClick={handleDeleteFiles}>
              Delete Files
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    <DndContext
      
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid columns={4}>
          {items.map((url, index) => (
            <SortablePhoto key={url} url={url} onChange={handleCheckboxChange} index={index} />
          ))}
        </Grid>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Photo url={activeId} index={items.indexOf(activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
    </div>
  );

  function handleDragStart(event) {
   
    setActiveId(event.active.id);
   
  }

  function handleDragEnd(event) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
};

export default UploadGallery;
