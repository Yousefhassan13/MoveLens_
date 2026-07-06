import React, { useState } from 'react';
import './CornicheDetails.css';
import { useNavigate, useLocation } from 'react-router-dom';

import { FiChevronLeft, FiWifi } from 'react-icons/fi';

import { FaStar, FaUsers, FaCar, FaTree, FaUtensils, FaBath, FaHiking, FaBuilding, FaWater, FaUmbrella } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

import cornicheImg1 from '../../assets/Pedestrian Paths/corniche1.png';
import cornicheImg2 from '../../assets/Pedestrian Paths/corniche2.jpg';
import cornicheImg3 from '../../assets/Pedestrian Paths/corniche3.png';
import cornicheImg4 from '../../assets/Pedestrian Paths/corniche4.png';
import cornicheImg5 from '../../assets/Pedestrian Paths/corniche5.png';
import cornicheImg6 from '../../assets/Pedestrian Paths/corniche6.png';
import cornicheImg7 from '../../assets/Pedestrian Paths/corniche7.png';

import defaultCornicheImg from '../../assets/Pedestrian Paths/corniche1.png';


const cornicheGalleries = {
  1: [cornicheImg1, cornicheImg2, cornicheImg3, cornicheImg4],
  2: [cornicheImg2, cornicheImg3, cornicheImg4, cornicheImg5],
  3: [cornicheImg3, cornicheImg4, cornicheImg5, cornicheImg6],
  4: [cornicheImg4, cornicheImg5, cornicheImg6, cornicheImg7],
  5: [cornicheImg5, cornicheImg6, cornicheImg7, cornicheImg1],
  6: [cornicheImg6, cornicheImg7, cornicheImg1, cornicheImg2],
  7: [cornicheImg7, cornicheImg1, cornicheImg2, cornicheImg3],
};


const cornicheDescriptions = {
  1: "Alexandria Corniche is one of Egypt's most iconic seaside promenades, stretching along the Mediterranean coast. Enjoy refreshing sea breezes, stunning sunset views, and a lively atmosphere with cafes, street vendors, and historic landmarks along the way.",
  2: "The Nile Corniche in Cairo offers a scenic riverside walkway with breathtaking views of the Nile. Perfect for evening strolls, cycling, and family outings, lined with elegant restaurants and vibrant cultural spots.",
  3: "Ain Sokhna Promenade is a stunning Red Sea coastal path with crystal-clear turquoise waters. A favorite weekend escape from Cairo, offering beach access, water sports, and beautiful sunrise views over the sea.",
  4: "Hurghada Marina Walk is a lively waterfront promenade filled with yacht berths, seafood restaurants, and boutique shops. The vibrant atmosphere and sea views make it a popular spot day and night.",
  5: "Sharm El-Sheikh Naama Bay Promenade is a world-famous coastal walk with stunning views of the Red Sea. Surrounded by diving centers, beach resorts, and colorful coral reef views, it's a top destination for nature lovers.",
  6: "Port Said Corniche stretches along the Suez Canal, offering a unique view of international ships passing through one of the world's busiest waterways. A peaceful walkway with rich maritime history.",
  7: "Luxor Nile Corniche runs along the East Bank of the Nile with views of feluccas sailing past ancient temples. The serene promenade connects major Luxor landmarks and is perfect for a historic riverside stroll.",
};


const cornicheFacilities = [
  { icon: <FiWifi />,      label: "Free Wi-Fi" },
  { icon: <IoEyeSharp />,  label: "Sea View" },
  { icon: <FaCar />,       label: "Free Parking" },
  { icon: <FaUmbrella />,  label: "Beach Access" },
  { icon: <FaUtensils />,  label: "Restaurants" },
  { icon: <FaBath />,      label: "Restrooms" },
  { icon: <FaTree />,      label: "Green Areas" },
  { icon: <FaHiking />,    label: "Walking Paths" },
  { icon: <FaBuilding />,  label: "Cafes" },
];


const sampleReviews = [
  { name: "Layla H.",  stars: 5, comment: "Absolutely stunning views! Perfect place for an evening walk with the family." },
  { name: "Tarek N.", stars: 4, comment: "Beautiful promenade with great atmosphere. The sea breeze was so refreshing." },
  { name: "Mona R.",  stars: 5, comment: "One of the best spots in Egypt. The sunset views are simply breathtaking!" },
];

export default function CornicheDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPlace = location.state?.place || {
    id: 1,
    name: "Alexandria Corniche",
    price: "Free",
    rating: "4.5",
    image: defaultCornicheImg,
    discount: "10% Off",
  };

  const galleryThumbs = cornicheGalleries[currentPlace.id] || [currentPlace.image, cornicheImg2, cornicheImg3, cornicheImg4];

  const [activeImg, setActiveImg]           = useState(galleryThumbs[0]);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0); 
  const [activeTab, setActiveTab]           = useState('About');

  const description = cornicheDescriptions[currentPlace.id] || cornicheDescriptions[1];

  
  const handleThumbClick = (img, idx) => {
    setActiveImg(img);
    setActiveThumbIdx(idx);
  };

 
  const triggerMobileApplication = () => {
    window.location.href = `movelens://open/corniche/${currentPlace.id || 1}`;
  };

 
  const renderPhotos = () => (
    <div className="corniche-photos-grid">
      {galleryThumbs.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${currentPlace.name} ${i + 1}`}
          className="corniche-photo-grid-img"
          onClick={() => handleThumbClick(img, i)}
        />
      ))}
    </div>
  );


  const renderReviews = () => (
    <div className="corniche-reviews-list">
      {sampleReviews.map((r, i) => (
        <div key={i} className="corniche-review-card">
          <div className="corniche-review-header">
            <div className="corniche-review-avatar">{r.name[0]}</div>
            <div>
              <div className="corniche-review-name">{r.name}</div>
              <div className="corniche-review-stars">
                {Array.from({ length: r.stars }).map((_, s) => <FaStar key={s} />)}
              </div>
            </div>
          </div>
          <p className="corniche-review-comment">{r.comment}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="corniche-details-container">

      <div className="corniche-details-layout">

      
        <div className="corniche-media-section">
          <div className="corniche-main-hero">
            <img src={activeImg} alt={currentPlace.name} className="corniche-hero-img" />
            <button className="corniche-floating-back" onClick={() => navigate(-1)} aria-label="Go back">
              <FiChevronLeft />
            </button>
          </div>

          <div className="corniche-thumbs-list">
            {galleryThumbs.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`corniche-thumb-card ${activeThumbIdx === index ? 'active' : ''}`}
                onClick={() => handleThumbClick(img, index)}
              />
            ))}
          </div>
        </div>

    
        <div className="corniche-content-section">

          <div className="corniche-title-row">
            <h1 className="corniche-main-title">{currentPlace.name}</h1>
            <span className="corniche-main-price">{currentPlace.price}</span>
          </div>

          <div className="corniche-sub-info">
            <span className="corniche-tag-badge">{currentPlace.discount || "Featured"}</span>
            <div className="corniche-rating-info">
              <FaStar />
              <strong>{currentPlace.rating}</strong>
              <span>(2,244 reviews)</span>
            </div>
          </div>

          <div className="corniche-internal-nav">
            {['About', 'Photos', 'Reviews'].map((tab) => (
              <button
                key={tab}
                className={`corniche-nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

         
          {activeTab === 'About' && (
            <>
              <div className="corniche-features-row">
                <div className="corniche-feature-card"><FaUsers /><span>Families</span></div>
             
                <div className="corniche-feature-card"><FaWater /><span>Sea View</span></div>
                <div className="corniche-feature-card"><FaHiking /><span>Walking</span></div>
              </div>

             
              <p className="corniche-desc-para">{description}</p>

              <div className="corniche-facilities-block">
                <h3>Most Popular Facilities</h3>
                <div className="corniche-facilities-layout">
                  {cornicheFacilities.map((f, i) => (
                    <div key={i} className="corniche-facility-cell">
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

          <div className="corniche-actions-block">
            <button className="corniche-how-to-go-btn" onClick={triggerMobileApplication}>
              How To Go
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}