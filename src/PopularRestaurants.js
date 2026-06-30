import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./PopularRestaurants.css";

import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";

import abuTarekImg  from "./assets/Koshary.jpg";
import elHatyImg    from "./assets/ElHaty.jpg";
import gadImg       from "./assets/King Burger.png";
import starbucksImg from "./assets/Strubuks.png";

const restaurantsData = [
  { id: 1, name: "Abu Tarek",  location: "Downtown Cairo",      rating: "5.0", discount: "10% Off",   status: "Open Now",        tag: "Most Visited", image: abuTarekImg },
  { id: 2, name: "El Haty",    location: "Heliopolis, Cairo",   rating: "4.8", discount: "5% Off",    status: "Open Now",        tag: "Recommended",  image: elHatyImg },
  { id: 3, name: "Gad",        location: "Mohandessin, Cairo",  rating: "4.6", discount: "15% Off",   status: "Closes at 11 PM", tag: "Recommended",  image: gadImg },
  { id: 4, name: "Starbucks",  location: "City Stars, Cairo",   rating: "4.3", discount: "Free Drink", status: "Open Now",       tag: "Most Visited", image: starbucksImg },
];

const TABS = ["All", "Recommended", "Most Visited"];

export default function PopularRestaurants() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]   = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites]   = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

    const filtered = useMemo(() => {
    let result = activeTab === "All"
      ? restaurantsData
      : restaurantsData.filter((item) => item.tag === activeTab);

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  return (
    <div className="popular-restaurants-container">
      <header className="pr-header">
        <button
          className="pr-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="pr-title">Popular Restaurants</h1>
      </header>

            <div className="pr-search-box" role="search">
        <FiSearch className="pr-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search restaurants"
        />
        {searchQuery && (
          <button
            className="pr-clear-btn"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      
      <div className="pr-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`pr-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="pr-no-results">
          <p>No results for "<strong>{searchQuery}</strong>"</p>
          <button onClick={() => { setSearchQuery(""); setActiveTab("All"); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="pr-list">
          {filtered.map((restaurant) => (
            <div key={restaurant.id} className="pr-card">
              <div className="pr-img-wrapper">
                <img
                  src={restaurant.image}
                  alt={`${restaurant.name} restaurant`}
                  className="pr-card-img"
                />
                
                <button
                  className={`pr-fav-btn ${favorites[restaurant.id] ? "active" : ""}`}
                  onClick={() => toggleFavorite(restaurant.id)}
                  aria-label={
                    favorites[restaurant.id]
                      ? `Remove ${restaurant.name} from favorites`
                      : `Add ${restaurant.name} to favorites`
                  }
                >
                  {favorites[restaurant.id] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <div className="pr-info">
                <div className="pr-top-row">
                  <span className="pr-discount">{restaurant.discount}</span>
                  <div className="pr-rating" aria-label={`Rated ${restaurant.rating} out of 5`}>
                    <AiFillStar aria-hidden="true" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>

                <h3 className="pr-name">{restaurant.name}</h3>

                <div className="pr-location">
                  <HiMapPin aria-hidden="true" />
                  <span>{restaurant.location}</span>
                </div>

                <div className="pr-status">
                  <span className="pr-status-open">{restaurant.status}</span>
                  <span className="pr-status-label">Restaurant Status</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}