// import React, { useState } from 'react';

// const Image = ({ image, onSelect, selected }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`relative ${selected ? 'border-2 border-blue-500' : ''}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative">
//         <img src={image.src} alt="Gallery Image" className="w-full h-auto border-2 border-gray-300 rounded-md" />
//         {isHovered && (
//           <div className="absolute inset-0 bg-black opacity-50 transition duration-300" />
//         )}
//       </div>

//       {isHovered && (
//         <div className="absolute top-0 left-0 w-full h-full flex items-start justify-end">
//           <input
//             type="checkbox"
//             className="m-2 cursor-pointer"
//             checked={selected}
//             onChange={() => onSelect(image.id)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Image;




// import React, { useState } from 'react';

// const Image = ({ image, onSelect, selected }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative">
//         <img src={image.src} alt="Gallery Image" className="w-full h-auto border-2 border-gray-300 rounded-md" />
//         {selected && (
//           <div className="absolute top-2 left-2">
//             <input
//               type="checkbox"
//               className="m-2 cursor-pointer"
//               checked
//             />
//           </div>
//         )}
//         {isHovered && !selected && (
//           <div className="absolute inset-0 bg-black opacity-50 transition duration-300 ">
//             <input
//               type="checkbox"
//               className="m-2 cursor-pointer"
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

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={image.src} alt="Gallery Image" className="w-full h-auto border-2 border-gray-300 rounded-md" />
        {selected && (
          <div className="absolute top-2 left-2">
            <input
              type="checkbox"
              className="m-2 cursor-pointer"
              checked={selected}
              onChange={() => onSelect(image.id)}
            />
          </div>
        )}
        {isHovered && !selected && (
          <div className="absolute inset-0 bg-black opacity-50 transition duration-300">
            <input
              type="checkbox"
              className="m-2 cursor-pointer"
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
