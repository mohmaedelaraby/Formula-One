import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { useEffect } from "react";
import Seasons from "../modules/seasons/Seasons";
import RacesPerSeason from "../modules/races/RacesPerSeason";
import RaceDetails from "../modules/race details/RaceDetails";

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
        <Route path="/races/:season" index element={<RacesPerSeason/>} />
        <Route path="/results/:season/:round" index element={<RaceDetails/>} />
      </Route>
    </Routes>
  );
};
