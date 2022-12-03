import { createRoot } from "react-dom/client";
import { SaveProvider } from "./SaveContext";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <SaveProvider>
    <App />
  </SaveProvider>
);
