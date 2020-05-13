import React from "react";
import "./Game.css";

export default function Game(props) {
  return (
    <div className="game">
      <h2>{props.App}</h2>
      <div className="game_rating">Rated: {props.Rating}</div>
      <div className="game_genre">Genre: {props.Genres}</div>
      <div className="content_rating">by {props.Content_Rating}</div>
      
    </div>
  );
}
