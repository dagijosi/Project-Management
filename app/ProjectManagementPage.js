"use client";
import React, { useState, useEffect } from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";

const ProjectManagementPage = () => {
  const [todoCards, setTodoCards] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTodoCards = localStorage.getItem("todoCards");
      return savedTodoCards ? JSON.parse(savedTodoCards) : [];
    }
    return [];
  });

  const [inProgressCards, setInProgressCards] = useState(() => {
    if (typeof window !== "undefined") {
      const savedInProgressCards = localStorage.getItem("inProgressCards");
      return savedInProgressCards ? JSON.parse(savedInProgressCards) : [];
    }
    return [];
  });
  const [doneCards, setDoneCards] = useState(() => {
    if (typeof window !== "undefined") {
      const savedDoneCards = localStorage.getItem("doneCards");
      return savedDoneCards ? JSON.parse(savedDoneCards) : [];
    }
    return [];
  });

  const [board, setBoard] = useState([
    { id: "1", title: "TODO", items: todoCards },
    { id: "2", title: "IN PROGRESS", items: inProgressCards },
    { id: "3", title: "DONE", items: doneCards },
  ]);

  useEffect(() => {
    localStorage.setItem("todoCards", JSON.stringify(todoCards));
    localStorage.setItem("inProgressCards", JSON.stringify(inProgressCards));
    localStorage.setItem("doneCards", JSON.stringify(doneCards));
  }, [todoCards, inProgressCards, doneCards]);

  const addNewCard = (newCard, listTitle) => {
    if (listTitle === "TODO") {
      const maxId = Math.max(...todoCards.map((card) => card.id), 0);
      newCard.id = String(maxId + 1);
      localStorage.setItem(
        "todoCards",
        JSON.stringify([...todoCards, newCard])
      );
      setTodoCards(JSON.parse(localStorage.getItem("todoCards")));
    } else if (listTitle === "IN PROGRESS") {
      const maxId = Math.max(...inProgressCards.map((card) => card.id), 0);
      newCard.id = String(maxId + 1);
      localStorage.setItem(
        "inProgressCards",
        JSON.stringify([...inProgressCards, newCard])
      );
      setInProgressCards(JSON.parse(localStorage.getItem("inProgressCards")));
    } else if (listTitle === "DONE") {
      const maxId = Math.max(...doneCards.map((card) => card.id), 0);
      newCard.id = String(maxId + 1);
      localStorage.setItem(
        "doneCards",
        JSON.stringify([...doneCards, newCard])
      );
      setDoneCards(JSON.parse(localStorage.getItem("doneCards")));
    }
    // Update the board with the new card
setBoard(
  board.map((boardItem) => {
     if (boardItem.title === listTitle) {
       return {
         ...boardItem,
         items: listTitle === "TODO" ? todoCards : listTitle === "IN PROGRESS" ? inProgressCards : doneCards,
       };
     }
     return boardItem;
  })
 );
  };
  const removeCard = (cardId, listTitle) => {
    let updatedCards;
    if (listTitle === "TODO") {
      updatedCards = todoCards.filter((card) => card.id !== cardId);
      setTodoCards(updatedCards);
      localStorage.setItem("todoCards", JSON.stringify(updatedCards));
    } else if (listTitle === "IN PROGRESS") {
      updatedCards = inProgressCards.filter((card) => card.id !== cardId);
      setInProgressCards(updatedCards);
      localStorage.setItem("inProgressCards", JSON.stringify(updatedCards));
    } else if (listTitle === "DONE") {
      updatedCards = doneCards.filter((card) => card.id !== cardId);
      setDoneCards(updatedCards);
      localStorage.setItem("doneCards", JSON.stringify(updatedCards));
    }

    // Update the board without the removed card
    setBoard(
      board.map((boardItem) => {
        if (boardItem.title === listTitle) {
          return {
            ...boardItem,
            items: updatedCards,
          };
        }
        return boardItem;
      })
    );
  };
  return (
      <div className="bg-blue-500 h-screen p-4">
        <div className="ml-6">
          <p className="text-3xl not-italic font-semibold text-white mb-4">
            Project Management
          </p>
          <div className="flex flex-row">
            {board.map((item, index) => (
              <List
                key={index}
                title={item.title}
                task={item.items}
                id={item.id}
                addNewCard={addNewCard}
                removeCard={removeCard}
              />
            ))}
          </div>
        </div>
      </div>
  );
};

export default ProjectManagementPage;
