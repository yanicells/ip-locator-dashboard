import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set) => ({
      // Auth state
      user: null,
      token: null,
      isLoggedIn: false,

      // Geo state
      currentGeoData: null,
      historyList: [],

      // Auth actions
      login: (user, token) =>
        set({
          user,
          token,
          isLoggedIn: true,
        }),

      register: (user, token) =>
        set({
          user,
          token,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          currentGeoData: null,
          historyList: [],
        }),

      // Geo actions
      setCurrentGeoData: (data) => set({ currentGeoData: data }),

      addToHistory: (geoData) =>
        set((state) => {
          // Avoid duplicates based on IP address
          const exists = state.historyList.some(
            (item) => item.ip === geoData.ip
          );
          if (exists) {
            return state;
          }

          return {
            historyList: [
              {
                ...geoData,
                timestamp: new Date().toISOString(),
              },
              ...state.historyList,
            ].slice(0, 10), // Keep only last 10 searches
          };
        }),

      clearHistory: () => set({ historyList: [] }),

      removeFromHistory: (ipsToRemove) =>
        set((state) => ({
          historyList: state.historyList.filter(
            (item) => !ipsToRemove.includes(item.ip)
          ),
        })),
    }),
    {
      name: "geo-app-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        historyList: state.historyList,
      }),
    }
  )
);

export default useAppStore;
