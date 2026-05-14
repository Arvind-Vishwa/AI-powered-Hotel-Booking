import { create } from "zustand";
import { loginUser, registerUser, getMe,logoutUser } from "./api/auth.js";

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
      return res.data.user
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
  
      set({ loading: false });
      return false
    }
  },

  register: async (data) => {

    try {
  
      set({ loading: true });
  
      const res = await registerUser(data);
  
      set({
        user: res.data.user,
        loading: false
      });
  
      // IMPORTANT
      return res.data.user;
  
    } catch (err) {
  
      console.log(err);
  
      set({ loading: false });
  
      return null;
    }
  },

fetchUser: async () => {
  try {
    const res = await getMe();

    const user = res.data.user;

    set({ user });

    return user; // user exists
  } catch (error) {
    set({ user: null });

    return null; // user does not exist / request failed
  }
},

  logout: async () => {
    await logoutUser();
    set({ user: null });
  },
}));