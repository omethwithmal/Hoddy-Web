import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import HoddyNaveBar from "./Components/Hoddy Nave Bar/HoddyNaveBar";
import Home from "./Components/Home/Home";







function App() {
  return (
    <Router>
      <Routes>
        <Route path="HoddyNaveBar" element={<HoddyNaveBar />} />
        <Route path="Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
