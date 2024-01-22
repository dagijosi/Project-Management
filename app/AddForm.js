import { Input, Textarea } from "@mui/joy";
import React, { useState }  from "react";

const AddForm = ({ onAddCard, closeModal }) => {
  const [note, setNote] = useState("");
  const [personName, setPersonName] = useState("");
  const [imgUrl, setImgUrl] = useState("/image/Profile_pic.png");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      id: 2,
      note: note,
      personName: personName,
      imgUrl: imgUrl,
    };
    onAddCard(newCard);
    closeModal();
 };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Add New Card</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="note" className=" text-base font-medium">
          Note
        </label>
        <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} required variant="outlined" size="lg" />

        <label htmlFor="personName" className=" text-base font-medium">
          Person Name:
        </label>
        <Input id="personName" value={personName} onChange={(e) => setPersonName(e.target.value)} required variant="outlined" size="lg" />

        <label htmlFor="imgUrl" className=" text-base font-medium">
          Image URL:
        </label>
        <input type="text" id="imgUrl" name="imgUrl" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} required />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddForm;
