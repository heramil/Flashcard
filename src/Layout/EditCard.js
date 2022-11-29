import React, { useState, useEffect } from "react";
import { readDeck, readCard, updateCard } from "../utils/api";
import { useHistory, useParams, Link } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({});
  const [updatedCard, setUpdatedCard] = useState({});
  const { deckId, cardId } = useParams();

  useEffect(() => {
    async function fetchDeck() {
      const currDeck = await readDeck(deckId);
      setNewDeck(currDeck);
    }
    fetchDeck();
  }, [deckId]);

  useEffect(() => {
    async function fetchCard() {
      const currCard = await readCard(cardId);
      setUpdatedCard(currCard);
    }
    fetchCard();
  }, [cardId]);

  async function handleEditCard(event) {
    event.preventDefault();
    await updateCard(updatedCard);
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-house-door-fill"
                viewBox="0 2 18 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
              </svg>
              {"Home"}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{newDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card #{cardId}
          </li>
        </ol>
      </nav>

      <h1>Edit Card</h1>

      <CardForm
        saveHandler={handleEditCard}
        handleCancel={() => history.push(`/decks/${deckId}`)}
        newCard={updatedCard}
        setNewCard={setUpdatedCard}
        doneLabel="Cancel"
        saveLabel="Submit"
      />
    </div>
  );
}

export default EditCard;
