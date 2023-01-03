import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.js";
import Wordle from "./routes/Wordle.js";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/wordle" element={<Wordle />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;