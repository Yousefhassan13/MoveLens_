import React, { useState } from 'react';
import './ReligiousDetails.css';
import { useNavigate, useLocation } from 'react-router-dom';

import { FiChevronLeft, FiWifi } from 'react-icons/fi';

import { FaStar, FaUsers, FaCar, FaTree, FaUtensils, FaBath, FaBookOpen, FaMosque, FaCross, FaLandmark } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

import mosqueImg1 from './assets/Religious Sites/mosque1.jpg';
import mosqueImg2 from './assets/Religious Sites/mosque2.jpg';
import mosqueImg3 from './assets/Religious Sites/mosque3.jpg';
import mosqueImg4 from './assets/Religious Sites/mosque4.jpg';

import defaultMosqueImg from './assets/Religious Sites/mosque1.jpg';


const religiousGalleries = {
  1: [mosqueImg1, mosqueImg2, mosqueImg3, mosqueImg4],
  2: [mosqueImg2, mosqueImg3, mosqueImg4, mosqueImg1],
  3: [mosqueImg3, mosqueImg4, mosqueImg1, mosqueImg2],
  4: [mosqueImg4, mosqueImg1, mosqueImg2, mosqueImg3],
  5: [mosqueImg1, mosqueImg3, mosqueImg2, mosqueImg4],
  6: [mosqueImg2, mosqueImg4, mosqueImg1, mosqueImg3],
  7: [mosqueImg3, mosqueImg1, mosqueImg4, mosqueImg2],
  8: [mosqueImg4, mosqueImg2, mosqueImg3, mosqueImg1],
};


const religiousDescriptions = {
  1: "Al-Azhar Mosque is one of the oldest universities and mosques in the world, founded in 970 AD. A spiritual and intellectual heart of Sunni Islam, it draws millions of visitors and students from across the globe to its magnificent Islamic architecture and historic courtyards.",
  2: "The Muhammad Ali Mosque, also known as the Alabaster Mosque, stands majestically atop the Cairo Citadel. Built between 1830 and 1848, its Ottoman-style domes and soaring minarets offer breathtaking panoramic views of Cairo and the surrounding desert.",
  3: "Sultan Hassan Mosque is considered one of the greatest architectural masterpieces of the Islamic world, built in 1356 AD. Its enormous scale, intricate stone carvings, and harmonious proportions make it a timeless symbol of Mamluk Islamic architecture.",
  4: "Amr Ibn Al-As Mosque is the first mosque ever built in Egypt and Africa, established in 641 AD. Located in Old Cairo, it holds immense historical significance as a cornerstone of Islamic civilization in the African continent.",
  5: "Al-Rifa'i Mosque is a grand royal mosque adjacent to Sultan Hassan Mosque, serving as the burial site of the Egyptian royal family and Shah Mohammad Reza Pahlavi of Iran. Its stunning neo-Mamluk architecture and ornate interiors are truly awe-inspiring.",
  6: "The Hanging Church, built atop the gatehouse of Babylon Fortress, is one of the oldest and most famous Coptic Christian churches in Egypt. Dating to the 3rd century, it houses remarkable icons, ancient manuscripts, and beautifully carved screens.",
  7: "Saint Catherine's Monastery in South Sinai is one of the oldest working Christian monasteries in the world, founded in the 6th century. Built at the foot of Mount Sinai, it houses a priceless collection of ancient manuscripts and sacred Christian art.",
  8: "Ben Ezra Synagogue in Old Cairo is one of the oldest synagogues in Egypt, dating back to the 9th century. Famous for the discovery of the Cairo Geniza — a treasure trove of medieval Jewish manuscripts — it stands as a remarkable testament to Egypt's rich Jewish heritage.",
};


const religiousFacilities = [
  { icon: <FiWifi />,       label: "Free Wi-Fi" },
  { icon: <IoEyeSharp />,   label: "Historic View" },
  { icon: <FaCar />,        label: "Free Parking" },
  { icon: <FaBookOpen />,   label: "Audio Guide" },
  { icon: <FaUtensils />,   label: "Cafeteria" },
  { icon: <FaBath />,       label: "Restrooms" },
  { icon: <FaTree />,       label: "Gardens" },
  { icon: <FaUsers />,      label: "Guided Tours" },
  { icon: <FaLandmark />,   label: "Gift Shop" },
];


const sampleReviews = [
  { name: "Fatima A.", stars: 5, comment: "A deeply spiritual and humbling experience. The architecture is absolutely breathtaking." },
  { name: "David M.",  stars: 5, comment: "One of the most historically significant places I have ever visited. Truly awe-inspiring." },
  { name: "Yasmine S.", stars: 4, comment: "Beautiful and serene atmosphere. A must-visit for anyone interested in history and faith." },
];


const getFeatureCards = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("church") || n.includes("saint") || n.includes("catherine")) {
    return [
      { icon: <FaCross />,    label: "Christian" },
      { icon: <FaBookOpen />, label: "Scripture" },
      { icon: <FaUsers />,    label: "Families" },
    ];
  }
  if (n.includes("synagogue") || n.includes("ezra")) {
    return [
      { icon: <FaLandmark />, label: "Heritage" },
      { icon: <FaBookOpen />, label: "Manuscripts" },
      { icon: <FaUsers />,    label: "Families" },
    ];
  }

  return [
    { icon: <FaMosque />,     label: "Mosque" },
    { icon: <FaBookOpen />,   label: "Islamic Art" },
    { icon: <FaUsers />,      label: "Families" },
  ];
};

export default function ReligiousDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPlace = location.state?.place || {
    id: 1,
    name: "Al-Azhar Mosque",
    price: "Free",
    rating: "4.9",
    image: defaultMosqueImg,
    discount: "Free",
  };

 
  const galleryThumbs = religiousGalleries[currentPlace.id] || [currentPlace.image, mosqueImg2, mosqueImg3, mosqueImg4];

  const [activeImg, setActiveImg]           = useState(galleryThumbs[0]);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0); 
  const [activeTab, setActiveTab]           = useState('About');

  const description   = religiousDescriptions[currentPlace.id] || religiousDescriptions[1];
  const featureCards  = getFeatureCards(currentPlace.name);

 
  const handleThumbClick = (img, idx) => {
    setActiveImg(img);
    setActiveThumbIdx(idx);
  };

 
  const triggerMobileApplication = () => {
    window.location.href = `movelens://open/religious/${currentPlace.id || 1}`;
  };

 
  const renderPhotos = () => (
    <div className="religious-photos-grid">
      {galleryThumbs.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${currentPlace.name} ${i + 1}`}
          className="religious-photo-grid-img"
          onClick={() => handleThumbClick(img, i)}
        />
      ))}
    </div>
  );

  
  const renderReviews = () => (
    <div className="religious-reviews-list">
      {sampleReviews.map((r, i) => (
        <div key={i} className="religious-review-card">
          <div className="religious-review-header">
            <div className="religious-review-avatar">{r.name[0]}</div>
            <div>
              <div className="religious-review-name">{r.name}</div>
              <div className="religious-review-stars">
                {Array.from({ length: r.stars }).map((_, s) => <FaStar key={s} />)}
              </div>
            </div>
          </div>
          <p className="religious-review-comment">{r.comment}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="religious-details-container">

      <div className="religious-details-layout">


        <div className="religious-media-section">
          <div className="religious-main-hero">
            <img src={activeImg} alt={currentPlace.name} className="religious-hero-img" />
            <button className="religious-floating-back" onClick={() => navigate(-1)} aria-label="Go back">
              <FiChevronLeft />
            </button>
          </div>

          <div className="religious-thumbs-list">
            {galleryThumbs.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`religious-thumb-card ${activeThumbIdx === index ? 'active' : ''}`}
                onClick={() => handleThumbClick(img, index)}
              />
            ))}
          </div>
        </div>


        <div className="religious-content-section">

          <div className="religious-title-row">
            <h1 className="religious-main-title">{currentPlace.name}</h1>

            <span className="religious-main-price">{currentPlace.price}</span>
          </div>

          <div className="religious-sub-info">
            <span className="religious-tag-badge">{currentPlace.discount || "Featured"}</span>
            <div className="religious-rating-info">
              <FaStar />
              <strong>{currentPlace.rating}</strong>
              <span>(2,244 reviews)</span>
            </div>
          </div>

          <div className="religious-internal-nav">
            {['About', 'Photos', 'Reviews'].map((tab) => (
              <button
                key={tab}
                className={`religious-nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>


          {activeTab === 'About' && (
            <>

              <div className="religious-features-row">
                {featureCards.map((card, i) => (
                  <div key={i} className="religious-feature-card">
                    {card.icon}
                    <span>{card.label}</span>
                  </div>
                ))}
              </div>

   
              <p className="religious-desc-para">{description}</p>

              <div className="religious-facilities-block">
                <h3>Most Popular Facilities</h3>
                <div className="religious-facilities-layout">
                  {religiousFacilities.map((f, i) => (
                    <div key={i} className="religious-facility-cell">
                      {f.icon}
                      <span>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'Photos'  && renderPhotos()}
          {activeTab === 'Reviews' && renderReviews()}

          <div className="religious-actions-block">
            <button className="religious-how-to-go-btn" onClick={triggerMobileApplication}>
              How To Go
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}