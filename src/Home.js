import { useNavigate } from 'react-router-dom';
import "./Home.css";
import pyramidsImg from "./assets/pyramids.jpg";
import logo from "./assets/logo.png";
import RestaurantList from "./RestaurantList";
import ExploreByMood from "./ExploreByMood";

// icons
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa6";

import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log("Searching for:", query);
  };

  const handleFilter = () => {
    
    console.log("Filter button clicked");
  };

  const handleNotification = () => {
   
    console.log("Notifications clicked");
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div>
          <div className="logo-container">
            <img src={logo} alt="Egypt Travel Guide Logo" className="logo-img" />
          </div>
          <p className="subtitle">Your smart guide in Egypt</p>
        </div>

        <button
          className="notification"
          onClick={handleNotification}
          aria-label="Open notifications"
        >
          <IoNotificationsOutline />
        </button>
      </header>

      {/* Search */}
      <form className="search-section" onSubmit={handleSearch} role="search">
        <div className="search-box">
          <FiSearch className="search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Where do you want to go today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for places"
          />
        </div>

        <button
          className="filter-btn"
          type="button"
          onClick={handleFilter}
          aria-label="Open filters"
        >
          <HiAdjustmentsHorizontal />
        </button>
      </form>

      {/* Title */}
      <h2 className="section-title">Discover New Places</h2>

      {/* Hero Card */}
      <div className="hero-card">
        <img src={pyramidsImg} alt="The Pyramids of Giza at sunset" />

        <div className="overlay">
          <button
            className="explore-btn"
            onClick={() => navigate('/explore')}
          >
            Explore Now
            <FaArrowRight className="arrow" aria-hidden="true" />
          </button>

          <h3>Hidden Gems of Cairo</h3>
        </div>
      </div>

      <RestaurantList />
      <ExploreByMood />
    </div>
  );
}