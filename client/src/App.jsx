import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />
      <AppRoutes />
    </AppContextProvider>
  );
};

export default App;
