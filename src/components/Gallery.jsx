import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Image from './Image';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const data = [
  {
    id: "item-1",
    url: '/images/image-1.webp',
    alt: 'Image 1 Alt Text',
  },
  {
    id: "item-2",
    url: '/images/image-2.webp',
    alt: 'Image 2 Alt Text',
  },
  {
    id: "item-3",
    url: '/images/image-3.webp',
    alt: 'Image 3 Alt Text',
  },
  {
    id: "item-4",
    url: '/images/image-4.webp',
    alt: 'Image 4 Alt Text',
  },
  {
    id: "item-5",
    url: '/images/image-5.webp',
    alt: 'Image 5 Alt Text',
  },
];
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});
function Gallery() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(data);
  },[]);

  const handleCheckboxChange = (event) => {
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
    images.forEach((image, index) => {
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

    const updatedImages = images.filter(
      (image) => !selectedFiles.includes(image.id)
    );
    setImages(updatedImages);

    // Clear the selectedFiles array
    setSelectedFiles([]);
    images.forEach((image, index) => {
      const checkbox = document.getElementById(image.id);
      if (checkbox) {
        checkbox.checked = false;
        checkbox.style.display = '';
        checkbox.parentElement.style.opacity = '1';
      }
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      images,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });
    setImages(reorderedItems);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery">
          {(provided,snapshot) => (
            <div
              className="gallery-body"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {images.map((image, index) => (
                <Image
                  key={image.id}
                  id={image.id}
                  src={image.url}
                  alt={image.alt}
                  index={index}
                  onChange={handleCheckboxChange}
                  
                />
              ))}
              {provided.placeholder}
             
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Gallery;
