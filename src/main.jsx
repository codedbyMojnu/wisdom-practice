import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Add Google Fonts
const link = document.createElement("link");
link.rel = "preconnect";
link.href = "https://fonts.googleapis.com";
document.head.appendChild(link);

const link2 = document.createElement("link");
link2.rel = "preconnect";
link2.href = "https://fonts.gstatic.com";
link2.crossOrigin = "anonymous";
document.head.appendChild(link2);

const link3 = document.createElement("link");
link3.href =
  "https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=PT+Sans:wght@400;700&display=swap";
link3.rel = "stylesheet";
document.head.appendChild(link3);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
