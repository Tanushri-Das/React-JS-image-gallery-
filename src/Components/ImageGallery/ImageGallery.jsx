import React, { useState, useEffect, useRef } from "react";
import Image from "../Image/Image";
import "./ImageGallery.css";
import Spinner from "../Spinner/Spinner";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // Add a state for loading

  const handleDeleteImages = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleImageSelect = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const onDragStart = (e, image) => {
    setDraggedImage(image);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetImage) => {
    const updatedImages = images.slice();
    const draggedIndex = images.findIndex((image) => image === draggedImage);
    const targetIndex = images.findIndex((image) => image === targetImage);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(targetIndex, 0, draggedImage);
      setImages(updatedImages);
    }
  };

  useEffect(() => {
    // Fetch data from data.json
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setIsLoading(false); // Set loading to false when images are loaded
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h3 className="mb-4 font-semibold text-xl">
        {selectedImages.length > 0 ? (
          <div className="flex items-center justify-between">
            <div className="font-semibold text-lg">
              <input
                type="checkbox"
                className="me-4 cursor-pointer w-4 h-4"
                checked
              />
              {`${selectedImages.length} Files Selected`}
            </div>
            <div
              className="cursor-pointer text-red-500 font-semibold text-lg"
              onClick={handleDeleteImages}
            >
              Delete files
            </div>
          </div>
        ) : (
          "Gallery"
        )}
      </h3>
      <hr />
      {isLoading ? ( // Conditional rendering based on loading state
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
          {images.map((image, index) => (
            <div
              key={image.id}
              onDragStart={(e) => onDragStart(e, image)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, image)}
              draggable
              className={index === 0 ? "custom-grid" : ""}
            >
              <Image
                image={image}
                onSelect={handleImageSelect}
                selected={selectedImages.includes(image.id)}
                addImageText={true} // Set this prop to true for image with id 12
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
