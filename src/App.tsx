import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import Homepage from "./pages/Homepage/Homepage"
import OfferPage from "./pages/Offerpage/OfferPage";
import DestinationPage from "./pages/DestinationPage/DestinationPage"
import AboutUsPage from "./pages/AboutUs/AboutUsPage"
import PersonalAccount from "./pages/AccountCart/PersonalAccount"
import Register from "./pages/Register"
import Login from "./pages/Login";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Homepage />} />
          <Route path="offers" element={<OfferPage />} />
          <Route path="destinations" element={<DestinationPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="personal-account" element={<PersonalAccount />} />  
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
