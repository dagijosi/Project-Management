'use client'
import React, { useState } from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
const ProjectManagementPage = () => {
  const board = [
    { id: 1, title: "TODO" },
    { id: 2, title: "IN PROGRESS" },
    { id: 3, title: "DONE" },
  ];
  const [completed,setCompleted] = useState([]);
  const [incomplete,setIncomplete] = useState([]);
  return (
    <DragDropContext>
    <div className="bg-blue-500 h-screen p-4">
      <div className="ml-6">
        <p className="text-3xl not-italic font-semibold text-white mb-4">
          Project Management
        </p>
        <div className="flex flex-row">
          {board.map((item) => (
            <List key={item.id} title={item.title} />
          ))}
        </div>
      </div>
    </div>
    </DragDropContext>
  );
};

export default ProjectManagementPage;
