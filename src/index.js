// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SaveProvider } from "./SaveContext";
import Header from "./pages/header";
import Place from "./pages/place";
import Nav from "./pages/nav";
import "./assets/css/index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  // <StrictMode>
  <SaveProvider>
    <Header />
    <Place />
    <Nav />
  </SaveProvider>
  // </StrictMode>
);
