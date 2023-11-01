// import React, { useState } from 'react';

// const Image = ({ image, onSelect, selected }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`relative ${selected ? 'opacity-60' : ''}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative">
//         <img src={image.src} alt="Gallery Image" className="w-full h-full border-2 border-gray-300 rounded-md" />
//         {selected && (
//           <div className="absolute top-2 left-2">
//             <input
//               type="checkbox"
//               className="m-3 cursor-pointer w-4 h-4"
//               checked={selected}
//               onChange={() => onSelect(image.id)}
//             />
//           </div>
//         )}
//         {isHovered && !selected && (
//           <div className="absolute inset-0 bg-black opacity-50 transition duration-300 rounded-md">
//             <input
//               type="checkbox"
//               className="m-5 cursor-pointer w-5 h-5"
//               checked={selected}
//               onChange={() => onSelect(image.id)}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Image;




import React, { useState } from 'react';

const Image = ({ image, onSelect, selected }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define a variable to store the border class
  let borderClass = "border-2 border-gray-300 rounded-md";

  // If the image has ID 12, update the border class
  if (image.id === 12) {
    borderClass = "border-2 border-gray-300 border-dashed rounded-md";
  }

  return (
    <div
      className={`relative ${selected ? "opacity-60" : ""} ${borderClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {image.id === 12 ? (
          <div className="flex flex-col items-center justify-center w-full h-full pt-[58px] rounded-md">
            <img
              src={image.src}
              alt="Gallery Image"
              className="w-24 h-24 rounded-md"
            />
            <h3 className='mb-[83px] text-lg font-bold'>Add Images</h3>
          </div>
        ) : (
          <img
            src={image.src}
            alt="Gallery Image"
            className="w-full h-full rounded-md"
          />
        )}

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
