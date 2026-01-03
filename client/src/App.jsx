import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  );
};

export default App;
