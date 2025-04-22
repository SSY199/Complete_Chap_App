import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Pages/Auth";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";
//import PrivateRoute from "./components/PrivateRoute";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <Auth />
          }
        />
        <Route
          path="/chat"
          element={
            <Chat />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile />
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
