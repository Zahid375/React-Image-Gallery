import React, {forwardRef} from 'react';
export const Photo = forwardRef(({url, index, faded,onChange, style, ...props}, ref) => {
    const handleInputChange = (event) => {
        event.stopPropagation();
        onChange(event); 
      };
    const inlineStyles = {
      opacity: faded ? '0.2' : '1',
      transformOrigin: '0 0',
      height: index === 0 ? 410 : 200,
      gridRowStart: index === 0 ? 'span 2' : null,
      gridColumnStart: index === 0 ? 'span 2' : null,
      backgroundImage: `url("${url}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'grey',
      ...style,
    };
  
    return (
        <div className="image-item" ref={ref} {...props} >
      <input
        type="checkbox"
        className="image-selector"
        id={url}
        onChange={onChange}
      />
      <img src={url} />
    </div>
    );
  });