import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

// Simple direct rendering
const root = document.getElementById("root")
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
