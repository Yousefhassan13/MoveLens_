import React from "react";
import "./ExploreByMood.css";
import { useNavigate } from "react-router-dom"; 
import youthfulBg from "./assets/youthful-bg.png";
import familyBg from "./assets/family-bg.png";
import religiousBg from "./assets/religious-bg.png";
import romanticBg from "./assets/romantic-bg.jpg";

import youthfulIcon from "./assets/youthful-icon.png";
import familyIcon from "./assets/family-icon.png";
import religiousIcon from "./assets/religious-icon.png";
import romanticIcon from "./assets/romantic-icon.png";

const moodData = [
  { id: 1, name: "Youthful", bg: youthfulBg, icon: youthfulIcon, path: "/youthful" },
  { id: 2, name: "Family", bg: familyBg, icon: familyIcon, path: "/family" },
  { id: 3, name: "Religious", bg: religiousBg, icon: religiousIcon, path: "/religious-mood" },
  { id: 4, name: "Romantic", bg: romanticBg, icon: romanticIcon, path: "/romantic" },
];

export default function ExploreByMood() {
  const navigate = useNavigate(); 
  const handleMoodClick = (path) => {
    if (path) {
      navigate(path); 
      }
  };

  return (
    <div className="mood-section">
      <h2 className="mood-title">Explore By Mood</h2>

      <div className="mood-grid">
        {moodData.map((mood) => (
          <div
            key={mood.id}
            className="mood-card"
            onClick={() => handleMoodClick(mood.path)} 
            onKeyDown={(e) => e.key === "Enter" && handleMoodClick(mood.path)}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${mood.name} places`}
          >
            <img
              src={mood.bg}
              alt={`${mood.name} mood background`}
              className="mood-bg-img"
            />

            <div className="mood-overlay">
              <div className="mood-icon-wrapper">
                <img src={mood.icon} alt="" aria-hidden="true" />
              </div>
              <p className="mood-text">{mood.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
