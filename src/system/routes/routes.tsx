import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useEffect } from "react";
import Seasons from "../modules/seasons/Seasons";

export const RootRoutes = () => {
  const navigate = useNavigate();

  // Check if the current location is the root path ("/")
  useEffect(() => {
    if (window.location.pathname === "/") {
      // Redirect to "/home" if the path is "/"
      navigate("/seasons");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/seasons" index element={<Seasons/>} />
        <Route path="/:season/races" index element={<>race</>} />
        <Route path="/:season/:round/results" index element={<>resault</>} />
      </Route>
    </Routes>
  );
};
