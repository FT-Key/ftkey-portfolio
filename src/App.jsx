import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
