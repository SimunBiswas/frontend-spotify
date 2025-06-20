import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAdmin: false,
      isLoading: false,
      error: null,

      checkAdminStatus: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get("/admin/check");
          set({ isAdmin: response.data.admin, isLoading : true });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            set({
              isAdmin: false,
              error: error.response?.data?.message || "Unknown error",
            });
          } else {
            set({ isAdmin: false, error: "An unexpected error occurred" });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      reset: () => {
        set({ isAdmin: false, isLoading: false, error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined, // <-- Prevents SSR crash
    }
  )
);
