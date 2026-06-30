import "./App.css";
import "./Home.css";
import Home from "./Home";
import Notifications from "./Notifications";
import ExplorePlaces from "./ExplorePlaces";
import HistoricalMuseum from "./HistoricalMuseum";
import GreenGardens from "./GreenGardens";
import CornichePage from "./CornichePage";
import ShoppingCenterPage from "./ShoppingCenterPage";
import ReligiousLandmarksPage from "./ReligiousLandmarksPage";
import YouthfulPlaces from "./YouthfulPlaces";
import RomanticPlaces from "./RomanticPlaces";
import FamilyPlaces from "./FamilyPlaces";
import ReligiousPlaces from "./ReligiousPlaces";
import PopularRestaurants from "./PopularRestaurants";
import MuseumDetails from "./MuseumDetails";
import ReligiousDetails from "./ReligiousDetails";
import CornicheDetails from "./CornicheDetails";
import ShoppingDetails from "./ShoppingDetails";
import GardenDetails from "./GardenDetails";

// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

          <Route path="/gardens" element={<GreenGardens />} />

          <Route path="/corniche" element={<CornichePage />} />

          <Route path="/shopping" element={<ShoppingCenterPage />} />

          <Route path="/religious" element={<ReligiousLandmarksPage />} />

          <Route path="/youthful" element={<YouthfulPlaces />} />

          <Route path="/family" element={<FamilyPlaces />} />

          <Route path="/romantic" element={<RomanticPlaces />} />

          <Route path="/religious-mood" element={<ReligiousPlaces />} />

          <Route path="/popular-restaurants" element={<PopularRestaurants />} />

          <Route path="/museum-details" element={<MuseumDetails />} />

          <Route path="/religious-details" element={<ReligiousDetails />} />

          <Route path="/corniche-details" element={<CornicheDetails />} />

          <Route path="/shopping-details" element={<ShoppingDetails />} />

          <Route path="/garden-details" element={<GardenDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
