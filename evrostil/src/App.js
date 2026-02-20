import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/footer";

import HomePage from "./Pages/Home";
import Stanovi from "./Pages/Stanovi";
import Mebel from "./Pages/Mebel";

function App() {
    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stanovi" element={<Stanovi />} />
                <Route path="/mebel" element={<Mebel />} />
            </Routes>
        </div>
    );
}

export default App;
