import "./App.css";
import { useEffect, useState } from "react";
import { Route,Routes } from "react-router-dom";
import ToDoList from "./ToDoList";


function App() {





 

  return (
  <>
  <Routes>
    <Route path="/" element={<ToDoList/>}></Route>
  </Routes>
  
  </>

  );
}

export default App;