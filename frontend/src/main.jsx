import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { AuthProvider } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

import App from "./App"; 
import Home from "./pages/Home";
import AddMenu from "./pages/hotel/AddMenu";
import Menu from "./pages/user/Menu";
import RegisterUser from "./pages/user/RegisterUser";
import RegisterPartner from "./pages/partner/RegisterPartner";
import LoginPartner from "./pages/partner/LoginPartner";
import LoginUser from "./pages/user/LoginUser";
import PartnerHome from "./pages/partner/PartnerHome";
import UserHome from "./pages/user/UserHome";
import RegisterHotel from "./pages/hotel/RegisterHotel";
import LoginHotel from "./pages/hotel/LoginHotel";
import HotelHome from "./pages/hotel/HotelHome";
import Dashboard from "./pages/hotel/Dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
          </Route>

          {/* USER ROUTES */}
          <Route path="/user">
            <Route path="register" element={<RegisterUser />} />
            <Route path="login" element={<LoginUser />} />
            <Route
              path="home"
              element={
                <ProtectedRoute role="user">
                  <UserHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="menu"
              element={
                <ProtectedRoute role="user">
                  <Menu />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* PARTNER ROUTES */}
          <Route path="/partner">
            <Route path="register" element={<RegisterPartner />} />
            <Route path="login" element={<LoginPartner />} />
            <Route
              path="home"
              element={
                <ProtectedRoute role="partner">
                  <PartnerHome />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* HOTEL ROUTES */}
          <Route path="/hotel">
            <Route path="register" element={<RegisterHotel />} />
            <Route path="login" element={<LoginHotel />} />
            <Route path="home" element={<HotelHome />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route
              path="add-menu"
              element={
                <ProtectedRoute role="hotel">
                  <AddMenu />
                </ProtectedRoute>
              }
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
