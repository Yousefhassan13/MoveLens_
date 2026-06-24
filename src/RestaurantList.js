import React, { useState } from "react";
import "./RestaurantList.css";
import { useNavigate } from 'react-router-dom';


import abuTarekImg from "./assets/Koshary.jpg";
import elHatyImg from "./assets/ElHaty.jpg";
import gadImg from "./assets/King Burger.png";
import starbucksImg from "./assets/Strubuks.png";


const restaurantsData = [
  {
    id: 1,
    name: "Abu Tarek",
    location: "Downtown Cairo",
    rating: "5.0",
    discount: "10% Off",
    status: "Open Now",
    image: abuTarekImg,
  },
  {
    id: 2,
    name: "El Haty",
    location: "Heliopolis, Cairo",
    rating: "4.8",
    discount: "5% Off",
    status: "Open Now",
    image: elHatyImg,
  },
  {
    id: 3,
    name: "Gad",
    location: "Mohandessin, Cairo",
    rating: "4.6",
    discount: "15% Off",
    status: "Closes at 11 PM",
    image: gadImg,
  },
  {
    id: 4,
    name: "Starbucks",
    location: "City Stars, Cairo",
    rating: "4.3",
    discount: "Free Drink",
    status: "Open Now",
    image: starbucksImg,
  },
];

export default function RestaurantList() {

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleViewAll = () => {
  
    navigate("/popular-restaurants");
  };

  return (
    <div className="restaurant-section">
      <div className="restaurant-header">
        <h2>Restaurants Near You</h2>
        <button className="view-all-btn" onClick={handleViewAll}>
          View All
        </button>
      </div>

      <div className="restaurant-grid">
        {restaurantsData.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">

            <div className="image-wrapper">
              <img
                src={restaurant.image}
                alt={`${restaurant.name} restaurant`}
                className="restaurant-image"
              />
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(restaurant.id)}
                aria-label={
                  favorites[restaurant.id]
                    ? `Remove ${restaurant.name} from favorites`
                    : `Add ${restaurant.name} to favorites`
                }
              >
                <svg
                  fill={favorites[restaurant.id] ? "#2563eb" : "none"}
                  stroke="#2563eb"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>


            <div className="details-wrapper">
              <div>

                <div className="top-row">
                  <span className="discount-badge">{restaurant.discount}</span>
                  <div className="rating-badge" aria-label={`Rating: ${restaurant.rating}`}>
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {restaurant.rating}
                  </div>
                </div>
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <div className="location-wrapper">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {restaurant.location}
                </div>
              </div>

              <div className="status-wrapper">
                <span className="status-link">{restaurant.status}</span>
                <span className="status-label">Restaurant Status</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}