// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"; 
import Home from "./pages/Home";
import Hotels from "./pages/user/Hotels";
import AddMenu from "./pages/hotel/AddMenu";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="hotels" element={<Hotels />} />
        <Route path="/add-menu" element={<AddMenu />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
