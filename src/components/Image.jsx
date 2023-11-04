import React from 'react';
import '../css/style.css';

function Image({ src, alt, id, onChange }) {
  return (
    <div className="image-item">
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

export default Image;
