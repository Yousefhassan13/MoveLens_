import React from "react";
import "./ExploreByMood.css";

import youthfulBg from "./assets/youthful-bg.png";
import familyBg from "./assets/family-bg.png";
import religiousBg from "./assets/religious-bg.png";
import romanticBg from "./assets/romantic-bg.jpg";

import youthfulIcon from "./assets/youthful-icon.png";
import familyIcon from "./assets/family-icon.png";
import religiousIcon from "./assets/religious-icon.png";
import romanticIcon from "./assets/romantic-icon.png";

const moodData = [
  { id: 1, name: "Youthful", bg: youthfulBg, icon: youthfulIcon },
  { id: 2, name: "Family", bg: familyBg, icon: familyIcon },
  { id: 3, name: "Religious", bg: religiousBg, icon: religiousIcon },
  { id: 4, name: "Romantic", bg: romanticBg, icon: romanticIcon },
];

export default function ExploreByMood() {
  const handleMoodClick = (moodName) => {
    console.log(`Exploring mood: ${moodName}`);
  };

  return (
    <div className="mood-section">
      <h2 className="mood-title">Explore By Mood</h2>

      <div className="mood-grid">
        {moodData.map((mood) => (
          <div
            key={mood.id}
            className="mood-card"
            onClick={() => handleMoodClick(mood.name)}
            onKeyDown={(e) => e.key === "Enter" && handleMoodClick(mood.name)}
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