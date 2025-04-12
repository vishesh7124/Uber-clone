import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserContext from "./context/UserContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext>
  </StrictMode>
);
