import React, { useState, useMemo } from "react";
import "./CornichePage.css";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaStar, FaHeart } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi2";

import cornicheImg1 from "./assets/Pedestrian Paths/corniche1.png";
import cornicheImg2 from "./assets/Pedestrian Paths/corniche2.jpg";
import cornicheImg3 from "./assets/Pedestrian Paths/corniche3.png";
import cornicheImg4 from "./assets/Pedestrian Paths/corniche4.png";
import cornicheImg5 from "./assets/Pedestrian Paths/corniche5.png";
import cornicheImg6 from "./assets/Pedestrian Paths/corniche6.png";
import cornicheImg7 from "./assets/Pedestrian Paths/corniche7.png";

const cornicheData = [
  {
    id: 1,
    name: "Alexandria Corniche",
    location: "Alexandria",
    rating: "4.8",
    discount: "10% Off",
    price: "Free",
    image: cornicheImg1,
    tag: "Recommended",
  },
  {
    id: 2,
    name: "Nile Corniche",
    location: "Cairo",
    rating: "4.7",
    discount: "5% Off",
    price: "Free",
    image: cornicheImg2,
    tag: "Most Visited",
  },
  {
    id: 3,
    name: "Ain Sokhna Promenade",
    location: "Suez",
    rating: "4.5",
    discount: "15% Off",
    price: "20 EGP",
    image: cornicheImg3,
    tag: "Recommended",
  },
  {
    id: 4,
    name: "Hurghada Marina Walk",
    location: "Red Sea",
    rating: "4.6",
    discount: "10% Off",
    price: "Free",
    image: cornicheImg4,
    tag: "Most Visited",
  },
  {
    id: 5,
    name: "Naama Bay Promenade",
    location: "Sharm El-Sheikh",
    rating: "4.9",
    discount: "10% Off",
    price: "Free",
    image: cornicheImg5,
    tag: "Recommended",
  },
  {
    id: 6,
    name: "Port Said Corniche",
    location: "Port Said",
    rating: "4.4",
    discount: "20% Off",
    price: "Free",
    image: cornicheImg6,
    tag: "Most Visited",
  },
  {
    id: 7,
    name: "Luxor Nile Corniche",
    location: "Luxor",
    rating: "4.6",
    discount: "10% Off",
    price: "Free",
    image: cornicheImg7,
    tag: "Recommended", 
  },
];

const TABS = ["All", "Recommended", "Most Visited"];

export default function CornichePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = useMemo(() => {
    let result =
      activeTab === "All"
        ? cornicheData
        : cornicheData.filter((item) => item.tag === activeTab);

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, query]);

  return (
    <div className="corniche-container">
      <header className="corniche-header">
        <button
          className="corniche-back-btn"
          onClick={() => navigate("/explore")}
          aria-label="Go back to explore"
        >
          <FiChevronLeft />
        </button>
        <h1>Pedestrian Paths</h1>
      </header>

      <div className="corniche-search-box" role="search">
        <FiSearch className="corniche-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search paths..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search pedestrian paths"
        />
        {query && (
          <button
            className="corniche-clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="corniche-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`corniche-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="corniche-no-results">
          <p>No results for "<strong>{query}</strong>"</p>
          <button onClick={() => { setQuery(""); setActiveTab("All"); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="corniche-list">
          {filtered.map((item) => (
            <div key={item.id} className="corniche-card">
              <div className="corniche-img-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="corniche-card-img"
                />
                <button
                  className={`corniche-fav-btn ${favorites[item.id] ? "active" : ""}`}
                  onClick={() => toggleFavorite(item.id)}
                  aria-label={
                    favorites[item.id]
                      ? `Remove ${item.name} from favorites`
                      : `Save ${item.name} to favorites`
                  }
                >
                  <FaHeart />
                </button>
              </div>

              <div className="corniche-details">
                <div>
                  <div className="corniche-top-row">
                    <span className="corniche-discount">{item.discount}</span>
                    <div
                      className="corniche-rating"
                      aria-label={`Rated ${item.rating} out of 5`}
                    >
                      <FaStar aria-hidden="true" />
                      {item.rating}
                    </div>
                  </div>
                  <h2 className="corniche-name">{item.name}</h2>
                  <div className="corniche-location">
                    <GoLocation aria-hidden="true" />
                    {item.location}
                  </div>
                </div>

                <div className="corniche-bottom-row">
                  <div className="corniche-price">
                    {item.price}
                    <HiOutlineTicket aria-hidden="true" />
                  </div>
                  <button
                    className="corniche-action-btn"
                    aria-label={`View details for ${item.name}`}
                    onClick={() =>
                      navigate("/corniche-details", { state: { place: item } })
                    }
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