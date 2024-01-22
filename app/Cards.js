// Cards.js
"use client";
import { Close } from "@mui/icons-material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Cards = ({ tasks, index, onRemove }) => {
  return (
    <Draggable draggableId={tasks.id} key={tasks.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="p-2 w-full bg-white mt-3">
            <div className="flex flex-row w-full">
              <img src={tasks.imgUrl} className="w-12 h-12 rounded-full mr-2" />
              <div className="w-full p-2">
                <div className="flex flex-row justify-between">
                  <p className="text-gray-900 text-sm not-italic font-normal w-64">
                    {tasks.note}
                  </p>
                  <button key={tasks.id} onClick={onRemove}>
                    <Close className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-row justify-between mt-2">
                  <p className="text-gray-700 text-xs not-italic font-semibold bg-yellow-100 p-1">
                    {tasks.personName}
                  </p>
                  <p className="text-gray-700 text-xs not-italic font-semibold ">
                    id:{tasks.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Cards;
