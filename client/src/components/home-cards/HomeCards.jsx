import React from "react";
import "./HomeCards.scss";
import useHomeCards from "./useHomeCards";

const HomeCards = () => {
  const {cardItems} =useHomeCards();
  return (
    <div className="cards-container">
      {cardItems?.map((item) => (
        <div className="cards" key={item.title}>
         <div className="cards-icon">{item.logo}</div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeCards;
