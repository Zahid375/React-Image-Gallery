import React, { useState } from 'react';
import '../css/style.css';
import Image from './Image';

function Gallery() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([
    {
      id: 1,
      url: '/images/image-1.webp',
      alt: 'Image 1 Alt Text',
    },
    {
      id: 2,
      url: '/images/image-2.webp',
      alt: 'Image 2 Alt Text',
    },
    {
      id: 3,
      url: '/images/image-3.webp',
      alt: 'Image 3 Alt Text',
    },
    {
      id: 4,
      url: '/images/image-4.webp',
      alt: 'Image 4 Alt Text',
    },
    {
      id: 5,
      url: '/images/image-5.webp',
      alt: 'Image 5 Alt Text',
    },
  ]);

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
      const checkbox = document.getElementById(index);
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
      (image) => !selectedFiles.includes(image.id.toString())
    );
    setImages(updatedImages);

    // Clear the selectedFiles array
    setSelectedFiles([]);
    images.forEach((image, index) => {
      const checkbox = document.getElementById(index);
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
      <div className="gallery-body">
        {images.map((image, index) => (
          <Image
            key={index}
            id={image.id}
            src={image.url}
            alt={image.alt}
            onChange={handleCheckboxChange}
          />
        ))}
        <div id="uplaod-area" className="add-image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="upload-image"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <input type="file" name="image" id="image-input" className="hidden" />
          <p>Add Image</p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
