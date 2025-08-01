import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import HoddyNaveBar from "./Components/Hoddy Nave Bar/HoddyNaveBar";
import Home from "./Components/Home/Home";
import AuthPage from "./Components/User Access/AuthPage";
import Men from "./Components/Shop/men";
import Women from "./Components/Shop/women";
import Bags from "./Components/Shop/bag";
import HomeDec from "./Components/Shop/homeDec";
import ShopFooter from "./Components/Shop/ShopFooter";
import AboutUs from "./Components/Home/aboutUs";
import ProfilePage from "./Components/Profile/ProfilePage";
import OrdersPage from "./Components/Profile/OrdersPage";











function App() {
  return (
    <Router>
      <Routes>
        <Route path="HoddyNaveBar" element={<HoddyNaveBar />} />
        <Route path="Home" element={<Home />} />
        <Route path="AuthPage" element={<AuthPage />} />
        <Route path="Men" element={<Men />} />
        <Route path="Women" element={<Women />} />
        <Route path="Bags" element={<Bags />} />
        <Route path="HomeDec" element={<HomeDec />} />
        <Route path="ShopFooter" element={<ShopFooter />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="ProfilePage" element={<ProfilePage />} />
        <Route path="OrdersPage" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
