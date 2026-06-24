import React, { useState, useMemo } from 'react';
import './ShoppingCenterPage.css';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { FaStar, FaHeart } from 'react-icons/fa';
import { HiOutlineTicket } from 'react-icons/hi2';

import mallImg1 from './assets/Shopping Centers/mall1.jpg';
import mallImg2 from './assets/Shopping Centers/mall2.jpg';
import mallImg3 from './assets/Shopping Centers/mall3.jpg';
import mallImg4 from './assets/Shopping Centers/mall4.jpg';
import mallImg5 from './assets/Shopping Centers/mall5.jpg';
import mallImg6 from './assets/Shopping Centers/mall6.jpg';
import mallImg7 from './assets/Shopping Centers/mall7.jpg';
import mallImg8 from './assets/Shopping Centers/mall8.jpg';

// ✅ بيانات مختلفة وواقعية لكل مول
const shoppingData = [
  { id: 1, name: 'City Stars Mall',      location: 'Nasr City, Cairo',   rating: '4.7', discount: '10% Off', price: '200 EGP',  image: mallImg1, tag: 'Most Visited' },
  { id: 2, name: 'Mall of Egypt',         location: '6th October City',   rating: '4.8', discount: '15% Off', price: '150 EGP',  image: mallImg2, tag: 'Most Visited' },
  { id: 3, name: 'Cairo Festival City',   location: 'New Cairo',          rating: '4.6', discount: '10% Off', price: '200 EGP',  image: mallImg3, tag: 'Recommended' },
  { id: 4, name: 'Dandy Mega Mall',       location: '6th October City',   rating: '4.3', discount: '5% Off',  price: '150 EGP',  image: mallImg4, tag: '' },
  { id: 5, name: 'Carrefour Maadi',       location: 'Maadi, Cairo',       rating: '4.2', discount: 'Free',    price: '200 EGP',  image: mallImg5, tag: '' },
  { id: 6, name: 'Smouha City Center',    location: 'Alexandria',         rating: '4.5', discount: '10% Off', price: '150 EGP',  image: mallImg6, tag: 'Recommended' },
  { id: 7, name: 'Tanta Galleria',        location: 'Tanta',              rating: '4.1', discount: 'Free',    price: '200 EGP',  image: mallImg7, tag: '' },
  { id: 8, name: 'Hurghada Grand Mall',   location: 'Hurghada',           rating: '4.4', discount: '15% Off', price: '150 EGP',  image: mallImg8, tag: 'Recommended' },
];

const TABS = ['All', 'Recommended', 'Most Visited'];

export default function ShoppingCenterPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [query, setQuery]         = useState('');
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ✅ فلترة حقيقية بالـ tab والـ search
  const filtered = useMemo(() => {
    let result = activeTab === 'All'
      ? shoppingData
      : shoppingData.filter((item) => item.tag === activeTab);

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
    <div className="shopping-container">
      <header className="shopping-header">
        <button
          className="shopping-back-btn"
          onClick={() => navigate('/explore')}
          aria-label="Go back to explore"
        >
          <FiChevronLeft />
        </button>
        <h1>Shopping Centers</h1>
      </header>

      {/* ✅ Search متربط بـ state */}
      <div className="shopping-search-box" role="search">
        <FiSearch className="shopping-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search malls..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search shopping centers"
        />
        {query && (
          <button
            className="shopping-clear-btn"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* ✅ Tabs بتفلتر فعلاً */}
      <div className="shopping-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`shopping-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="shopping-no-results">
          <p>No results for "<strong>{query}</strong>"</p>
          <button onClick={() => { setQuery(''); setActiveTab('All'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="shopping-list">
          {filtered.map((mall) => (
            <div key={mall.id} className="shopping-card">
              <div className="shopping-img-wrapper">
                <img src={mall.image} alt={mall.name} className="shopping-card-img" />
                {/* ✅ زر المفضلة متفاعل */}
                <button
                  className={`shopping-fav-btn ${favorites[mall.id] ? 'active' : ''}`}
                  onClick={() => toggleFavorite(mall.id)}
                  aria-label={favorites[mall.id] ? `Remove ${mall.name} from favorites` : `Save ${mall.name} to favorites`}
                >
                  <FaHeart />
                </button>
              </div>

              <div className="shopping-details">
                <div>
                  <div className="shopping-top-row">
                    <span className="shopping-discount">{mall.discount}</span>
                    <div className="shopping-rating" aria-label={`Rated ${mall.rating} out of 5`}>
                      <FaStar aria-hidden="true" />
                      {mall.rating}
                    </div>
                  </div>
                  <h2 className="shopping-name">{mall.name}</h2>
                  <div className="shopping-location">
                    <GoLocation aria-hidden="true" />
                    {mall.location}
                  </div>
                </div>

                <div className="shopping-bottom-row">
                  <div className="shopping-price">
                    {mall.price}
                    <HiOutlineTicket aria-hidden="true" />
                  </div>
                  <button
                    className="shopping-action-btn"
                    aria-label={`View details for ${mall.name}`}
                    onClick={() => console.log('View:', mall.name)}
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