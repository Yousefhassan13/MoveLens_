import { useNavigate } from "react-router-dom";
import "./Home.css";
import pyramidsImg from "./assets/pyramids.jpg";
import logo from "./assets/logo.png";
import RestaurantList from "./RestaurantList";
import ExploreByMood from "./ExploreByMood";

import { FiSearch, FiX } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Museums",
  "Gardens",
  "Religious",
  "Corniche",
  "Shopping",
];
const DISTANCES = ["Any", "< 1 km", "< 3 km", "< 5 km", "< 10 km"];
const RATINGS = ["Any", "3+", "4+", "4.5+"];

export default function Home() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDistance, setActiveDistance] = useState("Any");
  const [activeRating, setActiveRating] = useState("Any");

  const hasActiveFilters =
    activeCategory !== "All" ||
    activeDistance !== "Any" ||
    activeRating !== "Any";

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClearSearch = () => setQuery("");

  const handleResetFilters = () => {
    setActiveCategory("All");
    setActiveDistance("Any");
    setActiveRating("Any");
  };

  const handleApplyFilters = () => {
    setFilterOpen(false);
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div>
          <div className="logo-container">
            <img
              src={logo}
              alt="Egypt Travel Guide Logo"
              className="logo-img"
            />
          </div>
          <p className="subtitle">Your smart guide in Egypt</p>
        </div>
        <button
          className="notification"
          onClick={() => navigate("/notifications")} 
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
        
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>

        
        <button
          className={`filter-btn ${hasActiveFilters ? "filter-btn--active" : ""}`}
          type="button"
          onClick={() => setFilterOpen(true)}
          aria-label="Open filters"
        >
          <HiAdjustmentsHorizontal />
          {hasActiveFilters && <span className="filter-badge" />}
        </button>
      </form>

      {/* Title */}
      <h2 className="section-title">Discover New Places</h2>

      {/* Hero Card */}
      <div className="hero-card">
        <img src={pyramidsImg} alt="The Pyramids of Giza at sunset" />
        <div className="overlay">
          <button className="explore-btn" onClick={() => navigate("/explore")}>
            Explore Now
            <FaArrowRight className="arrow" aria-hidden="true" />
          </button>
          <h3>Hidden Gems of Cairo</h3>
        </div>
      </div>

      <RestaurantList />
      <ExploreByMood />

      {/* Filter Drawer Overlay */}
      {filterOpen && (
        <div
          className="filter-overlay"
          onClick={() => setFilterOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Filter Drawer */}
      <div
        className={`filter-drawer ${filterOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Filter options"
      >
        <div className="filter-drawer-header">
          <h2>Filters</h2>
          <button
            className="filter-drawer-close"
            onClick={() => setFilterOpen(false)}
            aria-label="Close filters"
          >
            <FiX />
          </button>
        </div>

        {/* Category */}
        <div className="filter-group">
          <h3 className="filter-group-title">Category</h3>
          <div className="filter-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div className="filter-group">
          <h3 className="filter-group-title">Distance</h3>
          <div className="filter-chips">
            {DISTANCES.map((d) => (
              <button
                key={d}
                className={`filter-chip ${activeDistance === d ? "active" : ""}`}
                onClick={() => setActiveDistance(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="filter-group">
          <h3 className="filter-group-title">Rating</h3>
          <div className="filter-chips">
            {RATINGS.map((r) => (
              <button
                key={r}
                className={`filter-chip ${activeRating === r ? "active" : ""}`}
                onClick={() => setActiveRating(r)}
              >
                {r === "Any" ? r : `⭐ ${r}`}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="filter-actions">
          <button className="filter-reset-btn" onClick={handleResetFilters}>
            Reset
          </button>
          <button className="filter-apply-btn" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
