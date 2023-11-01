
import React, { useState } from 'react';

const Image = ({ image, onSelect, selected }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${selected ? 'opacity-60' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative image-container ">
        <img src={image.src} alt="Gallery Image" className="w-full h-full border-2 border-gray-300 rounded-md" />
        {selected && (
          <div className="absolute top-2 left-2">
            <input
              type="checkbox"
              className="m-3 cursor-pointer w-4 h-4"
              checked={selected}
              onChange={() => onSelect(image.id)}
            />
          </div>
        )}
        {isHovered && !selected && (
          <div className="absolute inset-0 bg-black opacity-50 transition duration-300 rounded-md">
            <input
              type="checkbox"
              className="m-5 cursor-pointer w-5 h-5"
              checked={selected}
              onChange={() => onSelect(image.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;

