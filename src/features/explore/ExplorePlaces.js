import React, { useState, useMemo } from "react";
import "./ExplorePlaces.css";
import { useNavigate } from "react-router-dom";

import { FiSearch, FiChevronLeft, FiHeart } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { IoAccessibilityOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

import museumImg from "../../assets/museum.jpg";
import gardenImg from "../../assets/garden.jpg";
import religiousImg from "../../assets/religious-landmark.jpg";
import cornicheImg from "../../assets/corniche.jpg";
import shoppingImg from "../../assets/shopping-center.png";

const placesData = [
  {
    id: 1,
    title: "Historical Museums",
    image: museumImg,
    rating: "4.8",
    reviews: "3,120",
    distance: "0.5 km Away",
    availability: "Open Daily 9AM–5PM",
    visitors: "2,450 Visitors",
    popular: true,
  },
  {
    id: 2,
    title: "Green Gardens",
    image: gardenImg,
    rating: "4.5",
    reviews: "1,870",
    distance: "1.2 km Away",
    availability: "Open Daily 7AM–9PM",
    visitors: "1,900 Visitors",
    popular: false,
  },
  {
    id: 3,
    title: "Religious Landmarks",
    image: religiousImg,
    rating: "4.7",
    reviews: "2,560",
    distance: "0.8 km Away",
    availability: "Open Daily",
    visitors: "3,100 Visitors",
    popular: true,
  },
  {
    id: 5,
    title: "Corniche",
    image: cornicheImg,
    rating: "4.6",
    reviews: "4,200",
    distance: "3.5 km Away",
    availability: "Open Daily",
    visitors: "5,000 Visitors",
    popular: true,
  },
  {
    id: 6,
    title: "Shopping Center",
    image: shoppingImg,
    rating: "4.2",
    reviews: "2,244",
    distance: "1.8 km Away",
    availability: "Open Daily 10AM–11PM",
    visitors: "4,300 Visitors",
    popular: false,
  },
];

export default function ExplorePlaces() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPlaces = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return placesData;
    return placesData.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);


  

  return (
    <div className="explore-container">
      <header className="explore-header">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
          aria-label="Go back to home"
        >
          <FiChevronLeft />
        </button>
        <h1>Explore New Places</h1>
      </header>

      <div className="places-search-box" role="search">
        <FiSearch className="places-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search for places..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for places"
        />

        {query && (
          <button
            className="search-clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {filteredPlaces.length === 0 ? (
        <div className="no-results">
          <p>
            No places found for "<strong>{query}</strong>"
          </p>
          <button className="clear-search-link" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      ) : (
        <div className="places-list">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="place-card">
              <div className="place-img-wrapper">
                <img
                  src={place.image}
                  alt={`${place.title} in Egypt`}
                  className="place-img"
                />

                {place.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}

                <button
                  className={`place-favorite-btn ${favorites[place.id] ? "active" : ""}`}
                  onClick={() => toggleFavorite(place.id)}
                  aria-label={
                    favorites[place.id]
                      ? `Remove ${place.title} from favorites`
                      : `Save ${place.title} to favorites`
                  }
                >
                  <FiHeart />
                </button>
              </div>

              <div className="place-info">
                <div className="place-title-row">
                  <h3>{place.title}</h3>
                  <div
                    className="place-rating"
                    aria-label={`Rated ${place.rating} out of 5`}
                  >
                    <FaStar aria-hidden="true" />
                    <span>{place.rating}</span>
                    <span className="reviews-count">({place.reviews})</span>
                  </div>
                </div>

                <div className="place-details-row">
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
                    className="card-view-btn"
                    onClick={() => {
                      if (place.title === "Historical Museums") {
                        navigate("/museums");
                      } else if (place.title === "Green Gardens") {
                        navigate("/gardens");
                      } else if (place.title === "Corniche") {
                        navigate("/corniche");
                      } else if (place.title === "Shopping Center") {
                        navigate("/shopping");
                      } else if (place.title === "Religious Landmarks") {
                        navigate("/religious"); 
                      }
                    }}
                  >
                    View
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
