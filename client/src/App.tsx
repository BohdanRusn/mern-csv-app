import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { DataProvider } from "./context/dataContext";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import PrivateRoute from "./components/rout/PrivateRoute";

const AppContent: React.FC = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DataProvider>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
