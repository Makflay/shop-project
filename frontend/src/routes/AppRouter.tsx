import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store";
import type { JSX } from "react/jsx-dev-runtime";
import { isTokenValid } from "../utils/is-token-valid";
import { fetchCurrentUser } from "../store/auth-slice";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/user/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";
//
import Dashboard from "../pages/admin/Dashboard";
import ProductCRUD from "../pages/admin/ProductCRUD";
import ProductList from "../pages/user/ProductList";
import ProductDetails from "../pages/user/ProductDetails";

interface IProtectedRoute {
  children?: JSX.Element;
  roles?: string[]; // Список ролей, которым разрешен доступ
  redirectByRole?: boolean; // Если true, делает авто-редирект по роли
}

const ProtectedRoute = ({
  roles = [],
  redirectByRole = false,
}: IProtectedRoute) => {
  const dispatch = useAppDispatch();
  const { token, user, loading } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const isAuthenticated = token && isTokenValid(token);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, user, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  if (redirectByRole) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (user.role === "user") {
      return <Navigate to="/" replace />;
    }
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

const GuestRoute = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  console.log("Im GuestRoute");
  if (token && isTokenValid(token)) {
    return <Navigate to="/redirect" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

const MainLayout = () => {
  console.log("Im MainLayout");
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public default route} */}
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Guest route */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Redirect route */}
          <Route path="/redirect" element={<ProtectedRoute redirectByRole />} />

          {/* User routes */}
          <Route element={<ProtectedRoute roles={["user"]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<div>Cart Page</div>} />
            <Route path="/orders" element={<div>Orders Page</div>} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductCRUD />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
