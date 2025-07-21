import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GeneralProduct from "./product-lists/index.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GeneralProduct />
  </StrictMode>
);
