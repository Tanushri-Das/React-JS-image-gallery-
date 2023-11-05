import React, { useState, useRef } from "react";

const Image = ({ image, onSelect, selected, onAddImage, nextId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [imageBorder, setImageBorder] = useState(nextId === image.id ? "border-2 border-dashed" : "border-2 border-gray-300");

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
      onAddImage(URL.createObjectURL(selectedFile));
      fileInputRef.current.value = null;
      setImageBorder("border-2 border-gray-300"); // Change border after image upload
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`relative ${selected ? "opacity-60" : ""} rounded-md ${imageBorder}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {typeof image.img === "string" ? (
          <img
            src={image.img}
            alt="Gallery Images"
            className="w-full h-full rounded-md"
          />
        ) : (
          <div
            className="w-full h-full rounded-md"
            onClick={handleImageClick}
          >
            {image.img}
          </div>
        )}

        {selected && image.id !== nextId && (
          <div className="absolute top-2 left-2">
            <input
              type="checkbox"
              className="m-3 cursor-pointer w-4 h-4"
              checked={selected}
              onChange={() => onSelect(image.id)}
            />
          </div>
        )}

        {isHovered && !selected && image.id !== nextId && (
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

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />

      {selectedFileName ? (
        <img
          src={image.img}
          alt="Gallery Images"
          className="w-full h-full rounded-md border-2 border-gray-300"
        />
      ) : null}
    </div>
  );
};

export default Image;
