import React, { useState } from 'react';
import './ShoppingDetails.css';
import { useNavigate, useLocation } from 'react-router-dom';

import { FiChevronLeft, FiWifi } from 'react-icons/fi';

import { FaStar, FaUsers, FaCar, FaTree, FaUtensils, FaBath, FaBuilding, FaShoppingBag, FaFilm } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

import mallImg1 from './assets/Shopping Centers/mall1.jpg';
import mallImg2 from './assets/Shopping Centers/mall2.jpg';
import mallImg3 from './assets/Shopping Centers/mall3.jpg';
import mallImg4 from './assets/Shopping Centers/mall4.jpg';
import mallImg5 from './assets/Shopping Centers/mall5.jpg';
import mallImg6 from './assets/Shopping Centers/mall6.jpg';
import mallImg7 from './assets/Shopping Centers/mall7.jpg';
import mallImg8 from './assets/Shopping Centers/mall8.jpg';

import defaultMallImg from './assets/Shopping Centers/mall1.jpg';


const shoppingGalleries = {
  1: [mallImg1, mallImg2, mallImg3, mallImg4],
  2: [mallImg2, mallImg3, mallImg4, mallImg5],
  3: [mallImg3, mallImg4, mallImg5, mallImg6],
  4: [mallImg4, mallImg5, mallImg6, mallImg7],
  5: [mallImg5, mallImg6, mallImg7, mallImg8],
  6: [mallImg6, mallImg7, mallImg8, mallImg1],
  7: [mallImg7, mallImg8, mallImg1, mallImg2],
  8: [mallImg8, mallImg1, mallImg2, mallImg3],
};


const shoppingDescriptions = {
  1: "City Stars Mall is one of the largest shopping destinations in the Middle East, featuring over 600 stores, an indoor theme park, and a multiplex cinema. A perfect blend of shopping, dining, and entertainment under one roof in Nasr City.",
  2: "Mall of Egypt is home to Egypt's only indoor ski slope, Ski Egypt, alongside hundreds of international brands, restaurants, and a 21-screen cinema complex. A premier shopping and entertainment destination in 6th October City.",
  3: "Cairo Festival City combines upscale retail, dining, and entertainment in a beautifully landscaped open-air and indoor setting. With its iconic fountain shows and diverse brand selection, it's a favorite destination in New Cairo.",
  4: "Dandy Mega Mall offers a relaxed shopping experience with a wide range of local and international stores, family entertainment areas, and a variety of dining options, making it a popular spot in 6th October City.",
  5: "Carrefour Maadi combines a major hypermarket with a vibrant shopping mall, offering groceries, fashion, electronics, and dining options all in one convenient location in the heart of Maadi.",
  6: "Smouha City Center is Alexandria's premier shopping destination, featuring a wide selection of fashion, electronics, and entertainment options along with a spacious food court overlooking the city.",
  7: "Tanta Galleria offers a modern shopping experience in the Delta region, featuring popular retail brands, a cinema, and family-friendly entertainment, making it a key destination for shoppers in Tanta.",
  8: "Hurghada Grand Mall blends shopping with seaside leisure, offering international brands, restaurants, and entertainment just steps away from the Red Sea coast, perfect for tourists and locals alike.",
};


const shoppingFacilities = [
  { icon: <FiWifi />,        label: "Free Wi-Fi" },
  { icon: <FaFilm />,        label: "Cinema" },
  { icon: <FaCar />,         label: "Free Parking" },
  { icon: <FaShoppingBag />, label: "300+ Stores" },
  { icon: <FaUtensils />,    label: "Food Court" },
  { icon: <FaBath />,        label: "Restrooms" },
  { icon: <IoEyeSharp />,    label: "Kids Area" },
  { icon: <FaTree />,        label: "Indoor Garden" },
  { icon: <FaBuilding />,    label: "ATMs" },
];


const sampleReviews = [
  { name: "Hadeer K.", stars: 5, comment: "Amazing variety of stores and great food court. Perfect for a full day out with family." },
  { name: "Mostafa Y.", stars: 4, comment: "Clean, modern, and well-organized. Parking was easy to find even on weekends." },
  { name: "Salma F.",  stars: 5, comment: "My favorite mall for shopping and entertainment. The cinema experience is top-notch!" },
];

export default function ShoppingDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPlace = location.state?.place || {
    id: 1,
    name: "City Stars Mall",
    price: "200 EGP",
    rating: "4.7",
    image: defaultMallImg,
    discount: "10% Off",
  };

    const galleryThumbs = shoppingGalleries[currentPlace.id] || [currentPlace.image, mallImg2, mallImg3, mallImg4];

  const [activeImg, setActiveImg]           = useState(galleryThumbs[0]);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);   const [activeTab, setActiveTab]           = useState('About');

  const description = shoppingDescriptions[currentPlace.id] || shoppingDescriptions[1];

    const handleThumbClick = (img, idx) => {
    setActiveImg(img);
    setActiveThumbIdx(idx);
  };

   const triggerMobileApplication = () => {
    window.location.href = `movelens://open/mall/${currentPlace.id || 1}`;
  };

    const renderPhotos = () => (
    <div className="shopping-photos-grid">
      {galleryThumbs.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${currentPlace.name} ${i + 1}`}
          className="shopping-photo-grid-img"
          onClick={() => handleThumbClick(img, i)}
        />
      ))}
    </div>
  );

    const renderReviews = () => (
    <div className="shopping-reviews-list">
      {sampleReviews.map((r, i) => (
        <div key={i} className="shopping-review-card">
          <div className="shopping-review-header">
            <div className="shopping-review-avatar">{r.name[0]}</div>
            <div>
              <div className="shopping-review-name">{r.name}</div>
              <div className="shopping-review-stars">
                {Array.from({ length: r.stars }).map((_, s) => <FaStar key={s} />)}
              </div>
            </div>
          </div>
          <p className="shopping-review-comment">{r.comment}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="shopping-details-container">

      <div className="shopping-details-layout">

                <div className="shopping-media-section">
          <div className="shopping-main-hero">
            <img src={activeImg} alt={currentPlace.name} className="shopping-hero-img" />
            <button className="shopping-floating-back" onClick={() => navigate(-1)} aria-label="Go back">
              <FiChevronLeft />
            </button>
          </div>

          <div className="shopping-thumbs-list">
            {galleryThumbs.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`shopping-thumb-card ${activeThumbIdx === index ? 'active' : ''}`}
                onClick={() => handleThumbClick(img, index)}
              />
            ))}
          </div>
        </div>

               <div className="shopping-content-section">

          <div className="shopping-title-row">
            <h1 className="shopping-main-title">{currentPlace.name}</h1>
                       <span className="shopping-main-price">{currentPlace.price}</span>
          </div>

          <div className="shopping-sub-info">
            <span className="shopping-tag-badge">{currentPlace.discount || "Featured"}</span>
            <div className="shopping-rating-info">
              <FaStar />
              <strong>{currentPlace.rating}</strong>
              <span>(2,244 reviews)</span>
            </div>
          </div>

          <div className="shopping-internal-nav">
            {['About', 'Photos', 'Reviews'].map((tab) => (
              <button
                key={tab}
                className={`shopping-nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

                   {activeTab === 'About' && (
            <>
                            <div className="shopping-features-row">
                <div className="shopping-feature-card"><FaUsers /><span>Families</span></div>
                <div className="shopping-feature-card"><FaShoppingBag /><span>Shopping</span></div>
                <div className="shopping-feature-card"><FaFilm /><span>Cinema</span></div>
              </div>

                            <p className="shopping-desc-para">{description}</p>

              <div className="shopping-facilities-block">
                <h3>Most Popular Facilities</h3>
                <div className="shopping-facilities-layout">
                  {shoppingFacilities.map((f, i) => (
                    <div key={i} className="shopping-facility-cell">
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

          <div className="shopping-actions-block">
            <button className="shopping-how-to-go-btn" onClick={triggerMobileApplication}>
              How To Go
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}