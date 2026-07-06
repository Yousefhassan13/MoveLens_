import React, { useState, useMemo } from "react";
import "./ReligiousLandmarksPage.css";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaStar, FaHeart } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi2";

import mosqueImg1 from "../../assets/Religious Sites/mosque1.jpg";
import mosqueImg2 from "../../assets/Religious Sites/mosque2.jpg";
import mosqueImg3 from "../../assets/Religious Sites/mosque3.jpg";
import mosqueImg4 from "../../assets/Religious Sites/mosque4.jpg";

const religiousData = [
  {
    id: 1,
    name: "Al-Azhar Mosque",
    location: "Islamic Cairo",
    rating: "4.9",
    discount: "Free",
    price: "Free",
    image: mosqueImg1,
    tag: "Most Visited",
  },
  {
    id: 2,
    name: "Muhammad Ali Mosque",
    location: "Cairo Citadel",
    rating: "4.8",
    discount: "10% Off",
    price: "200 EGP",
    image: mosqueImg2,
    tag: "Recommended",
  },
  {
    id: 3,
    name: "Sultan Hassan Mosque",
    location: "Islamic Cairo",
    rating: "4.7",
    discount: "10% Off",
    price: "180 EGP",
    image: mosqueImg3,
    tag: "Recommended",
  },
  {
    id: 4,
    name: "Amr Ibn Al-As Mosque",
    location: "Old Cairo",
    rating: "4.5",
    discount: "Free",
    price: "Free",
    image: mosqueImg4,
    tag: "Most Visited",
  },
  {
    id: 5,
    name: "Al-Rifa'i Mosque",
    location: "Cairo Citadel",
    rating: "4.6",
    discount: "10% Off",
    price: "150 EGP",
    image: mosqueImg1,
    tag: "Recommended",
  },
  {
    id: 6,
    name: "Hanging Church",
    location: "Old Cairo",
    rating: "4.7",
    discount: "Free",
    price: "Free",
    image: mosqueImg2,
    tag: "Most Visited",
  },
  {
    id: 7,
    name: "Saint Catherine's",
    location: "South Sinai",
    rating: "4.8",
    discount: "15% Off",
    price: "250 EGP",
    image: mosqueImg3,
    tag: "Recommended",
  },
  {
    id: 8,
    name: "Ben Ezra Synagogue",
    location: "Old Cairo",
    rating: "4.4",
    discount: "Free",
    price: "Free",
    image: mosqueImg4,
    tag: "Most Visited",   },
];

const TABS = ["All", "Recommended", "Most Visited"];

export default function ReligiousLandmarksPage() {
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
        ? religiousData
        : religiousData.filter((item) => item.tag === activeTab);

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeTab, query]);

  return (
    <div className="religious-container">
      <header className="religious-header">
        <button
          className="religious-back-btn"
          onClick={() => navigate("/explore")}
          aria-label="Go back to explore"
        >
          <FiChevronLeft />
        </button>
        <h1>Religious Sites</h1>
      </header>

            <div className="religious-search-box" role="search">
        <FiSearch className="religious-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search sites..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search religious sites"
        />
        {query && (
          <button
            className="religious-clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

            <div className="religious-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`religious-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="religious-no-results">
          <p>
            No results for "<strong>{query}</strong>"
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
        <div className="religious-list">
          {filtered.map((mosque) => (
            <div key={mosque.id} className="religious-card">
              <div className="religious-img-wrapper">
                <img
                  src={mosque.image}
                  alt={mosque.name}
                  className="religious-card-img"
                />
                                <button
                  className={`religious-fav-btn ${favorites[mosque.id] ? "active" : ""}`}
                  onClick={() => toggleFavorite(mosque.id)}
                  aria-label={
                    favorites[mosque.id]
                      ? `Remove ${mosque.name} from favorites`
                      : `Save ${mosque.name} to favorites`
                  }
                >
                  <FaHeart />
                </button>
              </div>

              <div className="religious-details">
                <div>
                  <div className="religious-top-row">
                    <span className="religious-discount">
                      {mosque.discount}
                    </span>
                    <div
                      className="religious-rating"
                      aria-label={`Rated ${mosque.rating} out of 5`}
                    >
                      <FaStar aria-hidden="true" />
                      {mosque.rating}
                    </div>
                  </div>
                  <h2 className="religious-name">{mosque.name}</h2>
                  <div className="religious-location">
                    <GoLocation aria-hidden="true" />
                    {mosque.location}
                  </div>
                </div>

                <div className="religious-bottom-row">
                  <div className="religious-price">
                    {mosque.price}
                    <HiOutlineTicket aria-hidden="true" />
                  </div>
                  <button
                    className="religious-action-btn"
                    aria-label={`View details for ${mosque.name}`}
                    onClick={() =>
                      navigate("/religious-details", {
                        state: { place: mosque },
                      })
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