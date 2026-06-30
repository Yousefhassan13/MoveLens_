import React, { useState, useMemo } from "react";
import "./HistoricalMuseum.css";
import { useNavigate } from "react-router-dom";

import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaStar, FaHeart } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi2";

import gemImg  from "./assets/Historical Musium Places/gem 1.jpg";
import gem2Img from "./assets/Historical Musium Places/gem 2.jpg";
import gem3Img from "./assets/Historical Musium Places/gem 3.png";

const museumsData = [
  { id: 1, name: "Grand Egyptian Museum", location: "Giza",          rating: "4.9", discount: "10% Off", price: "200 EGP", tag: "Recommended",  image: gemImg  },
  { id: 2, name: "Egyptian Museum",        location: "Tahrir, Cairo", rating: "4.7", discount: "5% Off",  price: "150 EGP", tag: "Most Visited", image: gem2Img },
  { id: 3, name: "Nubia Museum",           location: "Aswan",         rating: "4.6", discount: "15% Off", price: "120 EGP", tag: "Recommended",  image: gem3Img },
  { id: 4, name: "Luxor Museum",           location: "Luxor",         rating: "4.8", discount: "10% Off", price: "180 EGP", tag: "Most Visited", image: gemImg  },
  { id: 5, name: "Coptic Museum",          location: "Old Cairo",     rating: "4.5", discount: "10% Off", price: "100 EGP", tag: "Recommended",  image: gem2Img },
  { id: 6, name: "Islamic Art Museum",     location: "Cairo",         rating: "4.4", discount: "20% Off", price: "80 EGP",  tag: "Most Visited", image: gem3Img },
  { id: 7, name: "Military Museum",        location: "Citadel, Cairo",rating: "4.3", discount: "10% Off", price: "60 EGP",  tag: "Recommended",  image: gemImg  },
  { id: 8, name: "Alexandria Museum",      location: "Alexandria",    rating: "4.6", discount: "10% Off", price: "140 EGP", tag: "Most Visited", image: gem2Img },
  { id: 9, name: "Mummification Museum",   location: "Luxor",         rating: "4.7", discount: "10% Off", price: "160 EGP", tag: "Recommended",  image: gem3Img },
];

const TABS = ["All", "Recommended", "Most Visited"];

export default function HistoricalMuseum() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery]         = useState("");
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = useMemo(() => {
    return museumsData.filter((m) => {
      const matchesTab   = activeTab === "All" || m.tag === activeTab;
      const matchesQuery = m.name.toLowerCase().includes(query.toLowerCase()) ||
                           m.location.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [activeTab, query]);

  return (
    <div className="museum-container">
      <header className="museum-header">
        <button
          className="museum-back-btn"
          onClick={() => navigate("/explore")}
          aria-label="Go back to explore"
        >
          <FiChevronLeft />
        </button>
        <h1>Historical Museums</h1>
      </header>

      <div className="museum-search-box" role="search">
        <FiSearch className="museum-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search museums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search museums"
        />
        {query && (
          <button
            className="museum-clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="museum-no-results">
          <p>No museums found for "<strong>{query}</strong>"</p>
          <button onClick={() => { setQuery(""); setActiveTab("All"); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="museum-list">
          {filtered.map((museum) => (
            <div key={museum.id} className="museum-card">
              <div className="museum-img-wrapper">
                <img src={museum.image} alt={museum.name} className="museum-card-img" />
                <button
                  className={`museum-fav-btn ${favorites[museum.id] ? "active" : ""}`}
                  onClick={() => toggleFavorite(museum.id)}
                  aria-label={favorites[museum.id] ? `Remove ${museum.name} from favorites` : `Save ${museum.name} to favorites`}
                >
                  <FaHeart />
                </button>
              </div>

              <div className="museum-details">
                <div>
                  <div className="museum-top-row">
                    <span className="museum-discount">{museum.discount}</span>
                    <div className="museum-rating" aria-label={`Rated ${museum.rating} out of 5`}>
                      <FaStar aria-hidden="true" />
                      {museum.rating}
                    </div>
                  </div>
                  <h2 className="museum-name">{museum.name}</h2>
                  <div className="museum-location">
                    <GoLocation aria-hidden="true" />
                    {museum.location}
                  </div>
                </div>

                <div className="museum-bottom-row">
                  <div className="museum-price">
                    {museum.price}
                    <HiOutlineTicket aria-hidden="true" />
                  </div>
                  {/* ✅ بيمرر بيانات المتحف الكامل للصفحة التالية */}
                  <button
                    className="museum-action-btn"
                    aria-label={`View details for ${museum.name}`}
                    onClick={() => navigate("/museum-details", { state: { place: museum } })}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}