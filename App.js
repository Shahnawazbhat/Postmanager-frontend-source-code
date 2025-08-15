
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import PostManager from "./Pages/PostManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/PostManager" element={<PostManager/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
