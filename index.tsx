import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./src/App";

const root = createRoot(document.querySelector("#root") as Element);
root.render(<App />);
