import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="font-sans max-w-sm mx-auto w-full min-h-screen bg-ct-main-blue-100">
      <Outlet />
    </div>
  );
}

export default App;
