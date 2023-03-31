import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
