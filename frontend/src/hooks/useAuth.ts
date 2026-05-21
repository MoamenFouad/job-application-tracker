// Franco: da el useAuth hook - byes3edna n3mel login w register w logout
import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';
import type { LoginInput, RegisterInput } from '../services/auth.service';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (input: LoginInput) => loginUser(input),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (input: RegisterInput) => registerUser(input),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return () => clearAuth();
};
