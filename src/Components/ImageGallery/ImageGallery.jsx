import React, { useState, useEffect } from "react";
import Image from "../Image/Image";
import "./ImageGallery.css";
import Spinner from "../Spinner/Spinner";
import { FaImage } from "react-icons/fa";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addedImage, setAddedImage] = useState(null);

  // Start the ID numbering from 12
  let nextId = 12; // Change const to let


// Generate the placeholder data for next ID
const placeholderData = {
  id: nextId,
  img: (
    <div className="flex flex-col items-center justify-center w-full h-64 sm:h-[307px] md:h-[241px] lg:h-[180px] rounded-md">
      <FaImage size={32} />
      <h3 className="mt-4 text-lg font-bold">Add Image</h3>
    </div>
  ),
  isFeature: false,
};



  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setIsLoading(false);
        const combinedData = [...data, placeholderData];
        setImages(combinedData);
      });
  }, []);

  const handleDeleteImages = () => {
    // Remove selected images
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

  const handleAddImage = (imageData) => {
    // Create a copy of the current images array
    const updatedImages = [...images];

    // Find the index of the image with id equal to nextId
    const indexToReplace = updatedImages.findIndex((image) => image.id === nextId);

    if (indexToReplace >= 0) {
      // Replace the image at the found index with the new image
      updatedImages[indexToReplace] = {
        img: imageData, // Use the provided imageData
        isFeature: false,
      };

      // Add the new image to the existing images
      setImages(updatedImages);

      setAddedImage(imageData);

      // Increment the nextId for the next image
      nextId++;

      console.log("Next ID:", nextId); // Log the incremented nextId value
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

  return (
    <div className="container mx-auto lg:pt-5 lg:px-5 lg:pb-[1px]">
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
      <hr className="border-2 border-gray-100" />
      {isLoading ? (
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
                key={image.id}
                image={image}
                onSelect={handleImageSelect}
                selected={selectedImages.includes(image.id)}
                onAddImage={image.id === nextId ? handleAddImage : undefined}
                nextId={nextId} // Pass the nextId prop to the Image component
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;






