import React, { useState, useEffect } from "react";
import Image from "../Image/Image";
import "./ImageGallery.css";
import Spinner from "../Spinner/Spinner";

const ImageGallery = () => {
  // State variables
  const [images, setImages] = useState([]); // Store the list of images
  const [selectedImages, setSelectedImages] = useState([]); // Store selected image IDs
  const [draggedImage, setDraggedImage] = useState(null); // Store the image being dragged
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Function to handle deleting selected images
  const handleDeleteImages = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  // Function to toggle image selection
  const handleImageSelect = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  // Function to handle drag start
  const onDragStart = (e, image) => {
    setDraggedImage(image);
  };

  // Function to handle drag over
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop
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

  // Fetch images from data.json using the useEffect hook
  useEffect(() => {
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
      <hr className="border-2 border-gray-100"/>
      {isLoading ? ( // Conditional rendering based on loading state
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-6">
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