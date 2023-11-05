import "./App.css";
import ImageGallery from "./Components/ImageGallery/ImageGallery";

function App() {
  return (
    // <div className="max-w-[1440px] mx-auto">
    //   <ImageGallery/>
    // </div>

    <div className='lg:bg-green-100 h-full py-8'>
    <div className=" max-w-screen-lg mx-auto rounded-lg bg-white ">
     <ImageGallery/>
   </div>
  </div>
  );
}

export default App;