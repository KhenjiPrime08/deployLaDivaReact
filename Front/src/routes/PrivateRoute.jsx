import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Simulación de autenticación

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
