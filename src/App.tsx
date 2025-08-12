import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="font-sans max-w-md mx-auto w-full min-h-screen pt-safe pb-safe flex flex-col">
      <Outlet />
      <ToastContainer
        position="bottom-center"
        hideProgressBar={true}
        autoClose={2000}
        closeOnClick={true}
      />
    </div>
  );
}

export default App;
