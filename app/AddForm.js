import { Input, Textarea } from "@mui/joy";
import React, { useState } from "react";

const AddForm = ({ onAddCard, closeModal }) => {
  const [note, setNote] = useState("");
  const [personName, setPersonName] = useState("");
  const [imgUrl, setImgUrl] = useState("/image/Profile_pic.png");
  const [selectedImage, setSelectedImage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let reader = new FileReader();
    reader.onloadend = () => {
       const newCard = {
         note: note,
         personName: personName,
         imgUrl: reader.result,
       };
       onAddCard(newCard);
       closeModal();
    };
    if (selectedImage) {
       reader.readAsDataURL(selectedImage);
    } else {

       const response = await fetch(imgUrl);
       const blob = await response.blob();
       reader.readAsDataURL(blob);
    }
   };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Add New Card</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="note" className=" text-base font-medium">
          Note
        </label>
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
          variant="outlined"
          size="lg"
        />

        <label htmlFor="personName" className=" text-base font-medium">
          Person Name:
        </label>
        <Input
          id="personName"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          required
          variant="outlined"
          size="lg"
        />
        <label htmlFor="image" className=" text-base font-medium">
          Select Image
        </label>
        <input
          type="file"
          id="image"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />

        {selectedImage && (
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-48 h-48" />
        )}

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
