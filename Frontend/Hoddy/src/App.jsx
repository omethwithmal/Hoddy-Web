import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import HoddyNaveBar from "./Components/Hoddy Nave Bar/HoddyNaveBar";






function App() {
  return (
    <Router>
      <Routes>
        <Route path="HoddyNaveBar" element={<HoddyNaveBar />} />
      </Routes>
    </Router>
  );
}

export default App;
