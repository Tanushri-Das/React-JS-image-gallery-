import React, { useState, useRef } from "react";

const Image = ({ image, onSelect, selected, onAddImage, nextId }) => {

  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
      onAddImage(URL.createObjectURL(selectedFile)); // Add the selected image to the gallery
      fileInputRef.current.value = null; // Clear the input field
    }
  };

  const handleImageClick = () => {
    // Programmatically trigger a click on the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div
      className={`relative ${
        selected ? "opacity-60" : ""
      } border-2 border-gray-300 rounded-md`}
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
            className="flex flex-col items-center justify-center w-full h-full pt-12 rounded-md"
            onClick={handleImageClick} // Trigger the file input click when this div is clicked
          >
            {image.img} {/* Render the JSX stored in the img property */}
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

      {/* Hidden file input (visually hidden) */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />

      {/* Display the selected image or file name */}
      {selectedFileName ? (
        <img
        src={image.img}
        alt="Gallery Images"
        className="w-full h-full rounded-md"
      />
      ) : null}
    </div>
  );
};

export default Image;