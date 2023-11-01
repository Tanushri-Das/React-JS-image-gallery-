// import React, { useState, useEffect, useRef } from "react";
// import Image from "../Image/Image";

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [isReordering, setIsReordering] = useState(false);
//   const fileInputRef = useRef();

//   const handleDeleteImages = () => {
//     const updatedImages = images.filter(
//       (image) => !selectedImages.includes(image.id)
//     );
//     setImages(updatedImages);
//     setSelectedImages([]);
//   };

//   const handleImageSelect = (id) => {
//     if (selectedImages.includes(id)) {
//       setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
//     } else {
//       setSelectedImages([...selectedImages, id]);
//     }
//   };

//   const handleImageUpload = (files) => {
//     const newImages = [];
//     for (let i = 0; i < files.length; i++) {
//       const newImage = {
//         id: images.length + i + 1,
//         src: URL.createObjectURL(files[i]),
//         isFeature: false,
//       };
//       newImages.push(newImage);
//     }
//     setImages([...images, ...newImages]);
//   };

//   useEffect(() => {
//     // Fetch data from data.json
//     fetch("/data.json")
//       .then((response) => response.json())
//       .then((data) => setImages(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h3 className="mb-4">
//         {selectedImages.length > 0 ? (
//           <div className="flex items-center justify-between">
//             <div>
//               <input type="checkbox" className="m-2 cursor-pointer" checked />
//               {`${selectedImages.length} Files Selected`}
//             </div>
//             <div className="cursor-pointer" onClick={handleDeleteImages}>
//               Delete Selected Images
//             </div>
//           </div>
//         ) : (
//           "Gallery"
//         )}
//       </h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {images.map((image) => (
//           <Image
//             key={image.id}
//             image={image}
//             onSelect={handleImageSelect}
//             selected={selectedImages.includes(image.id)}
//             isReordering={isReordering}
//           />
//         ))}
//       </div>
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         style={{ display: "none" }}
//         onChange={(e) => handleImageUpload(e.target.files)}
//         ref={fileInputRef}
//         id="fileInput"
//       />
//       <label
//         htmlFor="fileInput"
//         className="mb-4 p-2 bg-green-500 text-white cursor-pointer"
//       >
//         Add Images
//       </label>
//     </div>
//   );
// };

// export default ImageGallery;

// import React, { useState, useEffect, useRef } from "react";
// import Image from "../Image/Image";

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [draggedImage, setDraggedImage] = useState(null);
//   const fileInputRef = useRef();

//   const handleDeleteImages = () => {
//     const updatedImages = images.filter(
//       (image) => !selectedImages.includes(image.id)
//     );
//     setImages(updatedImages);
//     setSelectedImages([]);
//   };

//   const handleImageSelect = (id) => {
//     if (selectedImages.includes(id)) {
//       setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
//     } else {
//       setSelectedImages([...selectedImages, id]);
//     }
//   };

//   const handleImageUpload = (files) => {
//     const newImages = [];
//     for (let i = 0; i < files.length; i++) {
//       const newImage = {
//         id: images.length + i + 1,
//         src: URL.createObjectURL(files[i]),
//         isFeature: false,
//       };
//       newImages.push(newImage);
//     }
//     setImages([...images, ...newImages]);
//   };

//   const onDragStart = (e, image) => {
//     setDraggedImage(image);
//   };

//   const onDragOver = (e) => {
//     e.preventDefault();
//   };

//   const onDrop = (e, targetImage) => {
//     const updatedImages = images.slice();
//     const draggedIndex = images.findIndex((image) => image === draggedImage);
//     const targetIndex = images.findIndex((image) => image === targetImage);

//     if (draggedIndex !== -1 && targetIndex !== -1) {
//       updatedImages.splice(draggedIndex, 1);
//       updatedImages.splice(targetIndex, 0, draggedImage);
//       setImages(updatedImages);
//     }
//   };

//   useEffect(() => {
//     // Fetch data from data.json
//     fetch("/data.json")
//       .then((response) => response.json())
//       .then((data) => setImages(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h3 className="mb-4">
//         {selectedImages.length > 0 ? (
//           <div className="flex items-center justify-between">
//             <div>
//               <input
//                 type="checkbox"
//                 className="m-2 cursor-pointer"
//                 checked
//               />
//               {`${selectedImages.length} Files Selected`}
//             </div>
//             <div className="cursor-pointer" onClick={handleDeleteImages}>
//               Delete Selected Images
//             </div>
//           </div>
//         ) : (
//           "Gallery"
//         )}
//       </h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {images.map((image) => (
//           <div
//             key={image.id}
//             onDragStart={(e) => onDragStart(e, image)}
//             onDragOver={onDragOver}
//             onDrop={(e) => onDrop(e, image)}
//             draggable
//           >
//             <Image
//               image={image}
//               onSelect={handleImageSelect}
//               selected={selectedImages.includes(image.id)}
//             />
//           </div>
//         ))}
//       </div>
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         style={{ display: "none" }}
//         onChange={(e) => handleImageUpload(e.target.files)}
//         ref={fileInputRef}
//         id="fileInput"
//       />
//       <label
//         htmlFor="fileInput"
//         className="mb-4 p-2 bg-green-500 text-white cursor-pointer"
//       >
//         Add Images
//       </label>
//     </div>
//   );
// };

// export default ImageGallery;

import React, { useState, useEffect, useRef } from "react";
import Image from "../Image/Image";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const fileInputRef = useRef();

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

  const handleImageUpload = (files) => {
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const newImage = {
        id: images.length + i + 1,
        src: URL.createObjectURL(files[i]),
        isFeature: false,
      };
      newImages.push(newImage);
    }
    setImages([...images, ...newImages]);
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
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h3 className="mb-4 font-semibold text-lg">
        {selectedImages.length > 0 ? (
          <div className="flex items-center justify-between">
            <div className="font-semibold text-lg">
              <input type="checkbox" className="m-2 cursor-pointer" checked />
              {`${selectedImages.length} Files Selected`}
            </div>
            <div
              className="cursor-pointer text-red-500 font-semibold text-lg"
              onClick={handleDeleteImages}
            >
              Delete Selected Images
            </div>
          </div>
        ) : (
          "Gallery"
        )}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            onDragStart={(e) => onDragStart(e, image)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, image)}
            draggable
            style={{
              gridColumn: index === 0 ? "1 / 3" : "auto",
              gridRow: index === 0 ? "1 / 3" : "auto",
            }}
          >
            <Image
              image={image}
              onSelect={handleImageSelect}
              selected={selectedImages.includes(image.id)}
            />
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => handleImageUpload(e.target.files)}
        ref={fileInputRef}
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="mb-4 p-2 bg-green-500 text-white cursor-pointer"
      >
        Add Images
      </label>
    </div>
  );
};

export default ImageGallery;
