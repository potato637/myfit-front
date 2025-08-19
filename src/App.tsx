import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Zoom } from "react-toastify";

function App() {
  
  return (
    <div className="font-sans max-w-md mx-auto w-full min-h-screen pt-safe pb-safe flex flex-col">
      <Outlet />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick={false}
        closeButton={false}
        transition={Zoom}
      />
    </div>
  );
}

export default App;
