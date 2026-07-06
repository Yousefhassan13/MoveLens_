import React, { useState, useMemo } from "react";
import '../explore/MoodPage.css';
import { useNavigate } from "react-router-dom";
import { FiSearch, FiChevronLeft } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoTimeOutline, IoAccessibilityOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

import cornicheWalkImg  from "../../assets/Religious Sites/mosque1.jpg";
import fineDiningImg    from "../../assets/Religious Sites/mosque3.jpg";
import quietGardensImg  from "../../assets/Religious Sites/mosque4.jpg";

const religiousPlacesData = [
  {
    id: 1,
    title: "Corniche Walks",
    image: cornicheWalkImg,
    rating: "4.8",
    reviews: "3,120",
    distance: "0.8 km Away",
    availability: "Open Daily",
    visitors: "1,950 Visitors",
    popular: true,
    path: "/corniche",
  },
  {
    id: 2,
    title: "Fine Dining Restaurants",
    image: fineDiningImg,
    rating: "4.6",
    reviews: "840",
    distance: "1.9 km Away",
    availability: "Open Daily",
    visitors: "620 Visitors",
    popular: true,
    path: "/shopping",
  },
  {
    id: 3,
    title: "Quiet Botanical Gardens",
    image: quietGardensImg,
    rating: "4.7",
    reviews: "1,430",
    distance: "2.5 km Away",
    availability: "Open Daily 7AM–8PM",
    visitors: "1,100 Visitors",
    popular: false,
    path: "/gardens",
  },
];

export default function ReligiousPlaces() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return religiousPlacesData;
    return religiousPlacesData.filter((p) => p.title.toLowerCase().includes(q));
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
        <h1>Religious Places</h1>
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