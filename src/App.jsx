import "./App.css";
import ImageGallery from "./Components/ImageGallery/ImageGallery";

function App() {
  return (
    <div className="lg:bg-slate-200 h-full py-8">
      <div className=" max-w-screen-lg mx-auto rounded-lg bg-white ">
        <ImageGallery />
      </div>
    </div>
  );
}

export default App;
