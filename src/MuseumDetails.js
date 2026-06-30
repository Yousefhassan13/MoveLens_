import React, { useState } from 'react';
import './MuseumDetails.css';
import { useNavigate, useLocation } from 'react-router-dom';

import { FiChevronLeft, FiWifi, FiCoffee } from 'react-icons/fi';
import { FaStar, FaUsers, FaCar, FaTree, FaUtensils, FaBath, FaHiking, FaBuilding } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

import defaultMuseumImg from './assets/Historical Musium Places/gem 1.jpg';
import gem2Img from './assets/Historical Musium Places/gem 2.jpg';
import gem3Img from './assets/Historical Musium Places/gem 3.png';


const museumGalleries = {
  1: [defaultMuseumImg, gem2Img, gem3Img],
  2: [gem2Img, gem3Img, defaultMuseumImg],
  3: [gem3Img, defaultMuseumImg, gem2Img],
  4: [defaultMuseumImg, gem3Img, gem2Img],
  5: [gem2Img, defaultMuseumImg, gem3Img],
  6: [gem3Img, gem2Img, defaultMuseumImg],
  7: [defaultMuseumImg, gem2Img, gem3Img],
  8: [gem2Img, gem3Img, defaultMuseumImg],
  9: [gem3Img, defaultMuseumImg, gem2Img],
};


const museumDescriptions = {
  1: "The Grand Egyptian Museum is the largest archaeological museum in the world, housing over 100,000 artifacts including the complete treasures of Tutankhamun. It offers a breathtaking journey through 3,000 years of ancient Egyptian civilization.",
  2: "The Egyptian Museum in Tahrir Square has been Cairo's iconic landmark since 1902. Its vast collection includes royal mummies, the Rosetta Stone replica, and countless treasures from pharaonic Egypt.",
  3: "The Nubia Museum in Aswan celebrates the rich heritage of ancient Nubian civilization, with exhibits spanning prehistoric times through the Islamic era, set against the backdrop of beautiful Aswan landscapes.",
  4: "Luxor Museum stands as one of Egypt's finest provincial museums, displaying exquisite artifacts from Thebes including statues, jewelry, and mummies found in the Valley of the Kings.",
  5: "The Coptic Museum in Old Cairo holds the world's largest collection of Coptic art and artifacts, tracing the history of Egyptian Christians from the 3rd to the 19th century.",
  6: "The Museum of Islamic Art houses one of the most important collections of Islamic art in the world, with over 100,000 artifacts spanning 1,400 years of Islamic civilization.",
  7: "The Military Museum at the Citadel documents Egypt's military history from Pharaonic times to the modern era, with impressive displays of weapons, uniforms, and historical documents.",
  8: "The Alexandria National Museum showcases Alexandria's rich multicultural past across three floors, covering Pharaonic, Roman, Coptic, and Islamic periods of the city's history.",
  9: "The Mummification Museum in Luxor offers a fascinating insight into the ancient Egyptian art of mummification, displaying tools, rituals, and mummified humans and animals.",
};


const museumFacilities = [
  { icon: <FiWifi />, label: "Free Wi-Fi" },
  { icon: <FaTree />, label: "Garden View" },
  { icon: <FaCar />, label: "Free Parking" },
  { icon: <FaUsers />, label: "Guided Tours" },
  { icon: <FaUtensils />, label: "Cafeteria" },
  { icon: <FaBath />, label: "Restrooms" },
  { icon: <IoEyeSharp />, label: "Panoramic View" },
  { icon: <FaHiking />, label: "Audio Guide" },
  { icon: <FaBuilding />, label: "Gift Shop" },
];

export default function MuseumDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPlace = location.state?.place || {
    id: 1,
    name: "Grand Egyptian Museum",
    price: "200 EGP",
    rating: "4.9",
    image: defaultMuseumImg,
    discount: "10% Off",
  };

 
  const galleryThumbs = museumGalleries[currentPlace.id] || [currentPlace.image, gem2Img, gem3Img];

  const [activeImg, setActiveImg] = useState(galleryThumbs[0]);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0); 
  const [activeTab, setActiveTab] = useState('About');

  const description = museumDescriptions[currentPlace.id] || museumDescriptions[1];

  
  const handleThumbClick = (img, idx) => {
    setActiveImg(img);
    setActiveThumbIdx(idx);
  };

  
  const triggerMobileApplication = () => {
    window.location.href = `movelens://open/museum/${currentPlace.id || 1}`;
  };


  const renderPhotos = () => (
    <div className="museum-photos-grid">
      {galleryThumbs.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${currentPlace.name} ${i + 1}`}
          className="museum-photo-grid-img"
          onClick={() => handleThumbClick(img, i)}
        />
      ))}
    </div>
  );

 
  const sampleReviews = [
    { name: "Ahmed M.", stars: 5, comment: "Absolutely stunning experience! A must-visit in Egypt." },
    { name: "Sara K.",  stars: 4, comment: "Well-organized and informative. The staff were very helpful." },
    { name: "Omar T.",  stars: 5, comment: "World-class museum with incredible artifacts. Highly recommended!" },
  ];

  const renderReviews = () => (
    <div className="museum-reviews-list">
      {sampleReviews.map((r, i) => (
        <div key={i} className="museum-review-card">
          <div className="museum-review-header">
            <div className="museum-review-avatar">{r.name[0]}</div>
            <div>
              <div className="museum-review-name">{r.name}</div>
              <div className="museum-review-stars">
                {Array.from({ length: r.stars }).map((_, s) => (
                  <FaStar key={s} />
                ))}
              </div>
            </div>
          </div>
          <p className="museum-review-comment">{r.comment}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="museum-details-container">

      <div className="museum-details-layout">


        <div className="museum-media-section">
          <div className="museum-main-hero">
            <img src={activeImg} alt={currentPlace.name} className="museum-hero-img" />
            <button className="museum-floating-back" onClick={() => navigate(-1)} aria-label="Go back">
              <FiChevronLeft />
            </button>
          </div>

          <div className="museum-thumbs-list">
            {galleryThumbs.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`museum-thumb-card ${activeThumbIdx === index ? 'active' : ''}`}
                onClick={() => handleThumbClick(img, index)}
              />
            ))}
          </div>
        </div>


        <div className="museum-content-section">

          <div className="museum-title-row">
            <h1 className="museum-main-title">{currentPlace.name}</h1>
            <span className="museum-main-price">{currentPlace.price}</span>
          </div>

          <div className="museum-sub-info">
            <span className="museum-tag-badge">{currentPlace.discount || "Featured"}</span>
            <div className="museum-rating-info">
              <FaStar />
              <strong>{currentPlace.rating}</strong>
              <span>(2,244 reviews)</span>
            </div>
          </div>

          <div className="museum-internal-nav">
            {['About', 'Photos', 'Reviews'].map((tab) => (
              <button
                key={tab}
                className={`museum-nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>


          {activeTab === 'About' && (
            <>
              <div className="museum-features-row">
                <div className="museum-feature-card"><FaUsers /><span>Families</span></div>
                <div className="museum-feature-card"><FiCoffee /><span>Coffee</span></div>
                <div className="museum-feature-card"><FaCar /><span>Parking</span></div>
              </div>


              <p className="museum-desc-para">{description}</p>

              <div className="museum-facilities-block">
                <h3>Most Popular Facilities</h3>
                <div className="museum-facilities-layout">
                  {museumFacilities.map((f, i) => (
                    <div key={i} className="museum-facility-cell">
                      {f.icon}
                      <span>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'Photos' && renderPhotos()}
          {activeTab === 'Reviews' && renderReviews()}

          <button className="museum-how-to-go-btn" onClick={triggerMobileApplication}>
            How To Go
          </button>

        </div>
      </div>
    </div>
  );
}