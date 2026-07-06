import React, { useState } from 'react';
import './GardenDetails.css';
import { useNavigate, useLocation } from 'react-router-dom';

import { FiChevronLeft, FiWifi } from 'react-icons/fi';
import { FaStar, FaCar, FaTree, FaUtensils, FaBath, FaHiking, FaBuilding, FaCompass, FaPaw, FaChild } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

import zooImg1 from '../../assets/Green Garden/zoo1.jpg';
import zooImg2 from '../../assets/Green Garden/zoo2.png';
import zooImg3 from '../../assets/Green Garden/zoo3.jpg';
import zooImg4 from '../../assets/Green Garden/zoo4.jpg';
import zooImg5 from '../../assets/Green Garden/zoo5.jpg';
import zooImg6 from '../../assets/Green Garden/zoo6.jpg';
import zooImg7 from '../../assets/Green Garden/zoo7.jpg';
import zooImg8 from '../../assets/Green Garden/zoo8.jpg';

import defaultZooImg from '../../assets/Green Garden/zoo1.jpg';


const gardenGalleries = {
  1: [zooImg1, zooImg2, zooImg3, zooImg4],
  2: [zooImg2, zooImg3, zooImg4, zooImg1],
  3: [zooImg3, zooImg4, zooImg5, zooImg2],
  4: [zooImg4, zooImg5, zooImg6, zooImg3],
  5: [zooImg5, zooImg6, zooImg7, zooImg4],
  6: [zooImg6, zooImg7, zooImg8, zooImg5],
  7: [zooImg7, zooImg8, zooImg1, zooImg6],
  8: [zooImg8, zooImg1, zooImg2, zooImg7],
};


const gardenDescriptions = {
  1: "Giza Zoo is one of the oldest and largest zoos in Africa, established in 1891. Home to over 6,000 animals including lions, elephants, giraffes, and rare white tigers. A perfect family destination offering a fun and educational experience for all ages.",
  2: "Orman Garden is a stunning botanical garden in Giza established in 1875, featuring rare plant species from around the world. Its serene pathways, shaded walkways, and colorful flower beds make it a peaceful escape from the city's hustle.",
  3: "Al-Azhar Park is Cairo's green gem, offering 74 acres of beautifully landscaped gardens with stunning views of historic Islamic Cairo. The park features wide open spaces, children's play areas, and elegant restaurants.",
  4: "Merryland Park in Heliopolis is a charming family park featuring lush greenery, walking paths, and recreational facilities. Its well-maintained gardens and playgrounds make it a favorite weekend retreat for Cairo families.",
  5: "Montaza Gardens in Alexandria is a magnificent royal garden spanning 150 acres along the Mediterranean coast. Surrounding the historic Montaza Palace, it offers breathtaking sea views, manicured lawns, and scenic pathways.",
  6: "Fish Garden in Zamalek is Cairo's unique underground aquarium garden, built in 1867 inside a grotto. It features colorful fish displays, tropical plants, and a charming atmosphere perfect for a quiet afternoon.",
  7: "Cairo Safari Park in New Cairo is Egypt's premier wildlife safari experience. Visitors can observe African wildlife including zebras, rhinos, and cheetahs in spacious natural enclosures across this expansive modern park.",
  8: "Shallalat Garden in Alexandria is a beautifully designed urban park built on the ancient walls of Alexandria. Featuring waterfalls, ponds, and scenic walking paths, it offers a refreshing natural escape in the heart of the city.",
};


const gardenFacilities = [
  { icon: <FiWifi />,    label: "Free Wi-Fi" },
  { icon: <FaTree />,    label: "Green Areas" },
  { icon: <FaCar />,     label: "Free Parking" },
  { icon: <FaChild />,   label: "Play Areas" },
  { icon: <FaUtensils />,label: "Cafeteria" },
  { icon: <FaBath />,    label: "Restrooms" },
  { icon: <IoEyeSharp />,label: "Scenic View" },
  { icon: <FaHiking />,  label: "Walking Paths" },
  { icon: <FaBuilding />,label: "Gift Shop" },
];


const sampleReviews = [
  { name: "Nour A.", stars: 5, comment: "Beautiful place! The kids absolutely loved it. Very clean and well-maintained." },
  { name: "Khaled M.", stars: 4, comment: "Great experience overall. Loved the green atmosphere and the variety of activities." },
  { name: "Rania S.", stars: 5, comment: "One of the best places to spend a family day. Highly recommended!" },
];

export default function GardenDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPlace = location.state?.place || {
    id: 1,
    name: "Giza Zoo",
    price: "30 EGP",
    rating: "4.6",
    image: defaultZooImg,
    discount: "10% Off",
  };

 
  const galleryThumbs = gardenGalleries[currentPlace.id] || [currentPlace.image, zooImg2, zooImg3, zooImg4];

  const [activeImg, setActiveImg]       = useState(galleryThumbs[0]);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0); 
  const [activeTab, setActiveTab]       = useState('About');

  const description = gardenDescriptions[currentPlace.id] || gardenDescriptions[1];

 
  const handleThumbClick = (img, idx) => {
    setActiveImg(img);
    setActiveThumbIdx(idx);
  };

 
  const triggerMobileApplication = () => {
    window.location.href = `movelens://open/garden/${currentPlace.id || 1}`;
  };

 
  const renderPhotos = () => (
    <div className="garden-photos-grid">
      {galleryThumbs.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${currentPlace.name} ${i + 1}`}
          className="garden-photo-grid-img"
          onClick={() => handleThumbClick(img, i)}
        />
      ))}
    </div>
  );


  const renderReviews = () => (
    <div className="garden-reviews-list">
      {sampleReviews.map((r, i) => (
        <div key={i} className="garden-review-card">
          <div className="garden-review-header">
            <div className="garden-review-avatar">{r.name[0]}</div>
            <div>
              <div className="garden-review-name">{r.name}</div>
              <div className="garden-review-stars">
                {Array.from({ length: r.stars }).map((_, s) => <FaStar key={s} />)}
              </div>
            </div>
          </div>
          <p className="garden-review-comment">{r.comment}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="garden-details-container">

      <div className="garden-details-layout">

       
        <div className="garden-media-section">
          <div className="garden-main-hero">
            <img src={activeImg} alt={currentPlace.name} className="garden-hero-img" />
            <button className="garden-floating-back" onClick={() => navigate(-1)} aria-label="Go back">
              <FiChevronLeft />
            </button>
          </div>

          <div className="garden-thumbs-list">
            {galleryThumbs.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`garden-thumb-card ${activeThumbIdx === index ? 'active' : ''}`}
                onClick={() => handleThumbClick(img, index)}
              />
            ))}
          </div>
        </div>

       
        <div className="garden-content-section">

          <div className="garden-title-row">
            <h1 className="garden-main-title">{currentPlace.name}</h1>
            <span className="garden-main-price">{currentPlace.price}</span>
          </div>

          <div className="garden-sub-info">
            <span className="garden-tag-badge">{currentPlace.discount || "Featured"}</span>
            <div className="garden-rating-info">
              <FaStar />
              <strong>{currentPlace.rating}</strong>
              <span>(2,244 reviews)</span>
            </div>
          </div>

          <div className="garden-internal-nav">
            {['About', 'Photos', 'Reviews'].map((tab) => (
              <button
                key={tab}
                className={`garden-nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          
          {activeTab === 'About' && (
            <>
              <div className="garden-features-row">
                <div className="garden-feature-card"><FaCompass /><span>Safari</span></div>
                <div className="garden-feature-card"><FaPaw /><span>Animals</span></div>
                <div className="garden-feature-card"><FaTree /><span>Green Areas</span></div>
              </div>

             
              <p className="garden-desc-para">{description}</p>

              <div className="garden-facilities-block">
                <h3>Most Popular Facilities</h3>
                <div className="garden-facilities-layout">
                  {gardenFacilities.map((f, i) => (
                    <div key={i} className="garden-facility-cell">
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

          <div className="garden-actions-block">
            <button className="garden-how-to-go-btn" onClick={triggerMobileApplication}>
              How To Go
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}