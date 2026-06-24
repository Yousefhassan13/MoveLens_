import "./App.css";
import "./Home.css";
import Home from "./Home";
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
import PopularRestaurants from "./PopularRestaurants"

// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

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

        </Routes>
      </Router>
    </div>
  );
}

export default App;
