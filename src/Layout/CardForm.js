import React from "react";

function CardForm({
  saveHandler,
  handleCancel,
  newCard,
  setNewCard,
  doneLabel,
  saveLabel,
}) {
  function handleInputChange(event) {
    setNewCard({
      ...newCard,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <form onSubmit={saveHandler}>
      <label htmlFor="front">Front</label>
      <textarea
        className="form-control"
        id="front"
        name="front"
        rows="3"
        placeholder="Front side of card"
        value={newCard.front}
        onChange={handleInputChange}
      ></textarea>
      <label htmlFor="back">Back</label>
      <textarea
        className="form-control"
        id="back"
        name="back"
        rows="3"
        placeholder="Back side of card"
        value={newCard.back}
        onChange={handleInputChange}
      ></textarea>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={handleCancel}
      >
        {doneLabel}
      </button>
      <button type="submit" className="btn btn-primary">
        {saveLabel}
      </button>
    </form>
  );
}

export default CardForm;
