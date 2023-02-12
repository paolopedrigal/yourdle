import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.js";
import CreateYourdle from "./routes/CreateYourdle.js";
import Yourdle from "./routes/Yourdle.js";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route path="/create-yourdle/:name" element={<CreateYourdle />} />
                <Route path="/yourdle/:code" element={<Yourdle />} />
            </Routes>
        </Router>
    );
}

export default App;