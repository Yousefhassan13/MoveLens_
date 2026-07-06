import "./App.css";

import Home from "./features/home/Home";
import "./features/home/Home.css";

import Notifications from "./features/notifications/Notifications";
import ExplorePlaces from "./features/explore/ExplorePlaces";

import HistoricalMuseum from "./features/museum/HistoricalMuseum";
import MuseumDetails from "./features/museum/MuseumDetails";

import GreenGardens from "./features/gardens/GreenGardens";
import GardenDetails from "./features/gardens/GardenDetails";

import CornichePage from "./features/corniche/CornichePage";
import CornicheDetails from "./features/corniche/CornicheDetails";

import ShoppingCenterPage from "./features/shopping/ShoppingCenterPage";
import ShoppingDetails from "./features/shopping/ShoppingDetails";

import ReligiousLandmarksPage from "./features/religious/ReligiousLandmarksPage";
import ReligiousDetails from "./features/religious/ReligiousDetails";
import ReligiousPlaces from "./features/categories/ReligiousPlaces";
import PopularRestaurants from "./features/restaurants/PopularRestaurants";

import YouthfulPlaces from "./features/categories/YouthfulPlaces";
import RomanticPlaces from "./features/categories/RomanticPlaces";
import FamilyPlaces from "./features/categories/FamilyPlaces";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path="/explore" element={<ExplorePlaces />} />
          <Route path="/museums" element={<HistoricalMuseum />} />
          <Route path="/museum-details" element={<MuseumDetails />} />
          <Route path="/gardens" element={<GreenGardens />} />
          <Route path="/garden-details" element={<GardenDetails />} />
          <Route path="/corniche" element={<CornichePage />} />
          <Route path="/corniche-details" element={<CornicheDetails />} />
          <Route path="/shopping" element={<ShoppingCenterPage />} />
          <Route path="/shopping-details" element={<ShoppingDetails />} />
          <Route path="/religious" element={<ReligiousLandmarksPage />} />
          <Route path="/religious-details" element={<ReligiousDetails />} />
          <Route path="/religious-mood" element={<ReligiousPlaces />} />
          <Route path="/popular-restaurants" element={<PopularRestaurants />} />
          <Route path="/youthful" element={<YouthfulPlaces />} />
          <Route path="/family" element={<FamilyPlaces />} />
          <Route path="/romantic" element={<RomanticPlaces />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
