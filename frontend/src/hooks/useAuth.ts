import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { login, register, logout } from "../store/auth-slice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  return {
    user,
    token,
    loading,
    login: (email: string, password: string) =>
      dispatch(login({ email, password })),
    register: (email: string, name: string, password: string) =>
      dispatch(register({ email, name, password })),
    logout: () => dispatch(logout()),
  };
};
