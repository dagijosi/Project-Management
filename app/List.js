"use client";
import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { Add, Close } from "@mui/icons-material";
import AddForm from "./AddForm";
import { Droppable } from "react-beautiful-dnd";

const List = ({ title, task, id, addNewCard,removeCard }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col items-start rounded bg-gray-100 w-96 p-2 mr-16">
      <p className="text-black text-lg not-italic font-semibold capitalize">
        {title}
      </p>
            {task
              ? task.map((item, index) => (
                  <Cards key={index} tasks={item} index={index} onRemove={() => removeCard(item.id, title)}  />
                ))
              : null}
      <button
        onClick={openModal}
        className="bg-transparent w-full hover:bg-slate-300 flex justify-start p-2 text-sm font-semibold mt-4"
      >
        <Add className="w-5 h-5 mr-2" />
        Add New
      </button>
      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg relative">
            <button onClick={closeModal} className="absolute top-0 right-0 m-2">
              <Close />
            </button>
            <AddForm onAddCard={(card) => addNewCard(card, title)} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
