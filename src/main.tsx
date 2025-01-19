import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RootRoutes } from "./system/routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RootRoutes />
  </BrowserRouter>
);
