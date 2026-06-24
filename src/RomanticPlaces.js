import React, { useState, useMemo } from "react";
import "./MoodPage.css";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiChevronLeft } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoTimeOutline, IoAccessibilityOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

import shoppingImg  from "./assets/Shopping Centers/mall3.jpg";
import religiousImg from "./assets/Pedestrian Paths/corniche4.png";
import balloonImg   from "./assets/Pedestrian Paths/corniche5.png";

const romanticPlacesData = [
  {
    id: 1,
    title: "Shopping Center",
    image: shoppingImg,
    rating: "4.6",
    reviews: "2,244",
    distance: "0.5 km Away",
    availability: "Open Daily 10AM–11PM",
    visitors: "4,300 Visitors",
    popular: true,
    path: "/shopping",
  },
  {
    id: 2,
    title: "Religious Landmarks",
    image: religiousImg,
    rating: "4.7",
    reviews: "2,560",
    distance: "0.8 km Away",
    availability: "Open Daily",
    visitors: "3,100 Visitors",
    popular: true,
    path: "/religious",
  },
  {
    id: 3,
    title: "Hot Air Balloon",
    image: balloonImg,
    rating: "4.8",
    reviews: "980",
    distance: "3.0 km Away",
    availability: "Available at Sunrise",
    visitors: "860 Visitors",
    popular: false,
    path: "/museums",
  },
];

export default function RomanticPlaces() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return romanticPlacesData;
    return romanticPlacesData.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="mood-page-container">
      <header className="mood-page-header">
        <button
          className="mood-page-back-btn"
          onClick={() => navigate("/")}
          aria-label="Go back to home"
        >
          <FiChevronLeft />
        </button>
        <h1>Romantic Places</h1>
      </header>

      <div className="mood-page-search-box" role="search">
        <FiSearch className="mood-page-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search For Moments"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for places"
        />
        {query && (
          <button
            className="mood-page-clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mood-page-no-results">
          <p>No places found for "<strong>{query}</strong>"</p>
          <button onClick={() => setQuery("")}>Clear search</button>
        </div>
      ) : (
        <div className="mood-page-list">
          {filtered.map((place) => (
            <div key={place.id} className="mood-page-card">
              <div className="mood-page-img-wrapper">
                <img src={place.image} alt={place.title} className="mood-page-img" />
                {place.popular && <div className="popular-badge">Most Popular</div>}
              </div>

              <div className="mood-page-info">
                <div className="mood-page-title-row">
                  <h3>{place.title}</h3>
                  <div className="mood-page-rating" aria-label={`Rated ${place.rating} out of 5`}>
                    <FaStar aria-hidden="true" />
                    <span>{place.rating}</span>
                    <span className="reviews-count">({place.reviews})</span>
                  </div>
                </div>

                <div className="mood-page-details-row">
                  <div className="features-list">
                    <div className="feature-item">
                      <GoLocation aria-hidden="true" />
                      <span>{place.distance}</span>
                    </div>
                    <div className="feature-item">
                      <IoTimeOutline aria-hidden="true" />
                      <span>{place.availability}</span>
                    </div>
                    <div className="feature-item">
                      <IoAccessibilityOutline aria-hidden="true" />
                      <span>{place.visitors}</span>
                    </div>
                  </div>

                  <button
                    className="mood-page-view-btn"
                    onClick={() => navigate(place.path)}
                    aria-label={`View ${place.title}`}
                  >
                    View All
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