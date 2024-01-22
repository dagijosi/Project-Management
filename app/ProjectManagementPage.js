"use client";
import React, { useState, useEffect, useCallback } from "react";
import List from "./List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const getInitialCards = (key) => {
  const savedCards = localStorage.getItem(key);
  return savedCards ? JSON.parse(savedCards) : [];
};

const ProjectManagementPage = () => {
  const todoCards = getInitialCards("todoCards");
  const inProgressCards = getInitialCards("inProgressCards");
  const doneCards = getInitialCards("doneCards");
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

  const updateLocalStorage = useCallback((key, items) => {
    localStorage.setItem(key, JSON.stringify(items));
  }, []);

  const addNewCard = useCallback(
    (newCard, listTitle) => {
      setBoard((prevBoard) => {
        return prevBoard.map((boardItem) => {
          if (boardItem.title === listTitle) {
            const maxId = Math.max(
              ...boardItem.items.map((card) => card.id),
              0
            );
            newCard.id = String(maxId + 1);
            const updatedItems = [...boardItem.items, newCard];
            updateLocalStorage(`${listTitle.toLowerCase()}Cards`, updatedItems);
            return { ...boardItem, items: updatedItems };
          }
          return boardItem;
        });
      });
    },
    [updateLocalStorage]
  );

  const removeCard = useCallback(
    (cardId, listTitle) => {
      setBoard((prevBoard) => {
        return prevBoard.map((boardItem) => {
          if (boardItem.title === listTitle) {
            const updatedItems = boardItem.items.filter(
              (card) => card.id !== cardId
            );
            updateLocalStorage(`${listTitle.toLowerCase()}Cards`, updatedItems);
            return { ...boardItem, items: updatedItems };
          }
          return boardItem;
        });
      });
    },
    [updateLocalStorage]
  );

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return; // Card dropped outside any droppable area
    }

    const sourceList = board.find((item) => item.id === source.droppableId);
    const destinationList = board.find((item) => item.id === destination.droppableId);

    const updatedSourceItems = Array.from(sourceList.items);
    updatedSourceItems.splice(source.index, 1);

    const updatedDestinationItems = Array.from(destinationList.items);
    updatedDestinationItems.splice(destination.index, 0, draggableId);

    setBoard((prevBoard) => {
      return prevBoard.map((boardItem) => {
        if (boardItem.id === sourceList.id) {
          return { ...boardItem, items: updatedSourceItems };
        }
        if (boardItem.id === destinationList.id) {
          return { ...boardItem, items: updatedDestinationItems };
        }
        return boardItem;
      });
    });
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
    </DragDropContext>
  );
};

export default ProjectManagementPage;
