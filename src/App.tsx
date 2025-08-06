import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="font-sans max-w-md mx-auto w-full min-h-screen pt-safe pb-safe flex flex-col">
      <Outlet />
    </div>
  );
}

export default App;
