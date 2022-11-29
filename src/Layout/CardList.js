import React, { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

function CardList({ deckName }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [cardIndex, setCardIndex] = useState(0);
  const [side, setSide] = useState(true);

  const cards = deckName.cards || [];
  function handleFlip(event) {
    setSide(!side);
  }

  function nextHandler() {
    setCardIndex((cardIndex) => cardIndex + 1);
    setSide(true);
    if (cardIndex === cards.length - 1) {
      return window.confirm(
        "Restart Cards?\n\n Click 'cancel' to return to the home page"
      )
        ? setCardIndex(0)
        : history.push("/");
    }
  }

  if (cards.length && cards.length > 2) {
    return (
      <div key={deckId} className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {cards.length}
          </h5>
          <p className="card-text">
            {side ? cards[cardIndex].front : cards[cardIndex].back}
          </p>
          {/* Flip card button */}
          <button className="btn btn-secondary mr-2" onClick={handleFlip}>
            Flip
          </button>
          {/* IF card is on backside, provide a button to go to next card*/}
          {side ? null : (
            <button className="btn btn-primary" onClick={nextHandler}>
              Next
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Not enough cards.</h5>
          <p className="card-text">
            You need atleast 3 cards to study. There are {cards.length} cards in
            this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
            {" Add Cards"}
          </Link>
        </div>
      </div>
    );
  }
}

export default CardList;
