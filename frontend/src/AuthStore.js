import { create } from "zustand";
import { loginUser, registerUser, getMe } from "./api/auth.js";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  login: async (data) => {
    try {
      set({ loading: true });
  
      const res = await loginUser(data);
  
      const user = res?.data?.user;
  
      if (!user) {
        throw new Error("Invalid response from server");
      }
  
      set({
        user,
        loading: false,
      });
      return true
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
  
      set({ loading: false });
      return false
    }
  },

  register: async (data) => {
    set({ loading: true });
    const res = await registerUser(data);
    set({ user: res.data.user, loading: false });
  },

  fetchUser: async () => {
    try {
      const res = await getMe();
      set({ user: res.data.user });
    } catch {
      set({ user: null });
    }
  },

//   logout: async () => {
//     await logoutUser();
//     set({ user: null });
//   },
}));