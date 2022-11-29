import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const history = useHistory();
  const [newCard, setNewCard] = useState({});
  const [deckName, setDeckName] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    async function fetchDecks() {
      const currDeck = await readDeck(deckId);
      setDeckName(currDeck);
    }
    fetchDecks();
  }, [deckId, setDeckName]);

  async function saveHandler(event) {
    event.preventDefault();
    await createCard(deckId, newCard);
    history.push(`/decks/${deckId}`);
  }
  function handleCancel(event) {
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
              {'Home'}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h1>{deckName.name}: Add Card</h1>

      <CardForm
        saveHandler={saveHandler}
        handleCancel={handleCancel}
        newCard={newCard}
        setNewCard={setNewCard}
        doneLabel="Done"
        saveLabel="Save"
      />
    </div>
  );
}

export default AddCard;
