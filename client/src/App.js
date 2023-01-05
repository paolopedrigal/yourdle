import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.js";
import Yourdle from "./routes/Yourdle.js";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/yourdle" element={<Yourdle />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;