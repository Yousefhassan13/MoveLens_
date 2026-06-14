import "./App.css";
import "./Home.css"
import Home from "./Home";
import ExplorePlaces from './ExplorePlaces';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">

      <Router>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<ExplorePlaces />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
