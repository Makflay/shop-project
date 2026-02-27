import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { JSX } from "react/jsx-dev-runtime";
import { isTokenValid } from "../utils/is-token-valid";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" />;
  }

  return children;
};

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token && isTokenValid(token)) {
    return <Navigate to="/" />;
  }

  return children;
};

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        {/* Private */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <Home />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
