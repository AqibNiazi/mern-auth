import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { AppContextProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <ToastContainer />
    <App />
  </AppContextProvider>
);
