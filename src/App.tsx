import BottomNav from "./components/layouts/BottomNav";
import Recruiting from "./pages/recruiting/Recruiting";

function App() {
  return (
    <div className="font-sans max-w-md mx-auto w-full min-h-screen">
      <Recruiting />
      <BottomNav />
    </div>
  );
}

export default App;
