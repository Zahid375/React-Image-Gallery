import React, { useState, useEffect } from 'react';
import './css/style.css';
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
    {
        id: "item-6",
        url: '/images/image-6.webp',
        alt: 'Image 5 Alt Text',
    },
    {
        id: "item-7",
        url: '/images/image-7.webp',
        alt: 'Image 5 Alt Text',
    },
    {
        id: "item-8",
        url: '/images/image-8.webp',
        alt: 'Image 5 Alt Text',
    },
    {
        id: "item-9",
        url: '/images/image-9.webp',
        alt: 'Image 5 Alt Text',
    },
    {
        id: "item-10",
        url: '/images/image-10.jpeg',
        alt: 'Image 5 Alt Text',
    },
    {
        id: "item-11",
        url: '/images/image-11.jpeg',
        alt: 'Image 5 Alt Text',
    },
];
// a little function to help us with reordering the result

function Gallery() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    useEffect(() => {
        setImages(data);
    }, []);

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

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = images.findIndex((image) => image.id === active.id);
            const newIndex = images.findIndex((image) => image.id === over.id);

            setImages(arrayMove(images, oldIndex, newIndex));
        }
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
            <div className="gallery-body">
                <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={images} strategy={rectSortingStrategy}>
                        {images.map((image, index) => (
                            <SortableImage key={image.id} id={image.id} src={image.url} alt={image.alt} onChange={handleCheckboxChange} />
                        ))}
                        <div id="uplaod-area" className="add-image">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="upload-image"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                            <input type="file" name="image" id="image-input" className="hidden" />
                            <p>Add Image</p>
                        </div>
                    </SortableContext>
                    <DragOverlay adjustScale={true}>
                        {activeId ? (
                            <Photo url={activeId} index={items.indexOf(activeId)} />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}

export default Gallery;
