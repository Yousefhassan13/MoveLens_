import React, { useState, useMemo } from "react";
import "./GreenGardens.css";
import { useNavigate } from "react-router-dom";

import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaStar, FaHeart } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi2";

import zooImg1 from "../../assets/Green Garden/zoo1.jpg";
import zooImg2 from "../../assets/Green Garden/zoo2.png";
import zooImg3 from "../../assets/Green Garden/zoo3.jpg";
import zooImg4 from "../../assets/Green Garden/zoo4.jpg";
import zooImg5 from "../../assets/Green Garden/zoo5.jpg";
import zooImg6 from "../../assets/Green Garden/zoo6.jpg";
import zooImg7 from "../../assets/Green Garden/zoo7.jpg";
import zooImg8 from "../../assets/Green Garden/zoo8.jpg";

const gardensData = [
  {
    id: 1,
    name: "Giza Zoo",
    location: "Giza",
    rating: "4.6",
    discount: "10% Off",
    price: "30 EGP",
    tag: "Most Visited",
    image: zooImg1,
  },
  {
    id: 2,
    name: "Orman Garden",
    location: "Giza",
    rating: "4.4",
    discount: "5% Off",
    price: "5 EGP",
    tag: "Recommended",
    image: zooImg2,
  },
  {
    id: 3,
    name: "Al-Azhar Park",
    location: "Cairo",
    rating: "4.7",
    discount: "15% Off",
    price: "25 EGP",
    tag: "Most Visited",
    image: zooImg3,
  },
  {
    id: 4,
    name: "Merryland Park",
    location: "Heliopolis",
    rating: "4.3",
    discount: "10% Off",
    price: "20 EGP",
    tag: "Recommended",
    image: zooImg4,
  },
  {
    id: 5,
    name: "Montaza Gardens",
    location: "Alexandria",
    rating: "4.8",
    discount: "10% Off",
    price: "15 EGP",
    tag: "Most Visited",
    image: zooImg5,
  },
  {
    id: 6,
    name: "Fish Garden",
    location: "Zamalek, Cairo",
    rating: "4.2",
    discount: "20% Off",
    price: "10 EGP",
    tag: "Recommended",
    image: zooImg6,
  },
  {
    id: 7,
    name: "Cairo Safari Park",
    location: "New Cairo",
    rating: "4.5",
    discount: "10% Off",
    price: "50 EGP",
    tag: "Most Visited",
    image: zooImg7,
  },
  {
    id: 8,
    name: "Shallalat Garden",
    location: "Alexandria",
    rating: "4.4",
    discount: "10% Off",
    price: "10 EGP",
    tag: "Recommended",
    image: zooImg8,
  },
];

const TABS = ["All", "Recommended", "Most Visited"];

export default function GreenGardens() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = useMemo(() => {
    return gardensData.filter((g) => {
      const matchesTab = activeTab === "All" || g.tag === activeTab;
      const matchesQuery = g.name.toLowerCase().includes(query.toLowerCase()) ||
                           g.location.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [activeTab, query]);

  return (
    <div className="gardens-container">
      <header className="gardens-header">
        <button
          className="gardens-back-btn"
          onClick={() => navigate("/explore")}
          aria-label="Go back"
        >
          <FiChevronLeft />
        </button>
        <h1>Green Gardens</h1>
      </header>

      <div className="gardens-search-box">
        <FiSearch className="gardens-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search gardens..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search gardens"
        />
        {query && (
          <button
            className="gardens-clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="gardens-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`gardens-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="gardens-no-results">
          <p>
            No gardens found for "<strong>{query}</strong>"
          </p>
          <button
            onClick={() => {
              setQuery("");
              setActiveTab("All");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="gardens-list">
          {filtered.map((garden) => (
            <div key={garden.id} className="gardens-card">
              <div className="gardens-img-wrapper">
                <img
                  src={garden.image}
                  alt={garden.name}
                  className="gardens-card-img"
                />
                <button
                  className={`gardens-fav-btn ${favorites[garden.id] ? "active" : ""}`}
                  onClick={() => toggleFavorite(garden.id)}
                  aria-label={
                    favorites[garden.id]
                      ? `Remove ${garden.name} from favorites`
                      : `Save ${garden.name} to favorites`
                  }
                >
                  <FaHeart />
                </button>
              </div>

              <div className="gardens-details">
                <div>
                  <div className="gardens-top-row">
                    <span className="gardens-discount">{garden.discount}</span>
                    <div
                      className="gardens-rating"
                      aria-label={`Rated ${garden.rating}`}
                    >
                      <FaStar aria-hidden="true" />
                      {garden.rating}
                    </div>
                  </div>
                  <h2 className="gardens-name">{garden.name}</h2>
                  <div className="gardens-location">
                    <GoLocation aria-hidden="true" />
                    {garden.location}
                  </div>
                </div>

                <div className="gardens-bottom-row">
                  <div className="gardens-price">
                    {garden.price}
                    <HiOutlineTicket aria-hidden="true" />
                  </div>
                  <button
                    className="gardens-action-btn"
                    aria-label={`View details for ${garden.name}`}
                    onClick={() =>
                      navigate("/garden-details", { state: { place: garden } })
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