import { create } from "zustand";
import { persist } from "zustand/middleware";
import historyService from "../services/historyService";

const useAppStore = create(
  persist(
    (set) => ({
      // Geo state
      currentGeoData: null,
      historyList: [],

      // Geo actions
      setCurrentGeoData: (data) => set({ currentGeoData: data }),

      // Fetch history from localStorage
      fetchHistory: async () => {
        try {
          const history = await historyService.fetchHistory();
          set({ historyList: history });
        } catch (error) {
          console.error("Failed to fetch history:", error);
          throw error;
        }
      },

      // Add to history
      addToHistory: async (geoData) => {
        try {
          const newHistoryItem = await historyService.addToHistory(geoData);

          // Update local state
          set((state) => {
            const exists = state.historyList.some(
              (item) => item.ip === geoData.ip,
            );

            if (exists) {
              // Move existing item to top
              return {
                historyList: [
                  { ...newHistoryItem, timestamp: newHistoryItem.created_at },
                  ...state.historyList.filter((item) => item.ip !== geoData.ip),
                ].slice(0, 10),
              };
            }

            return {
              historyList: [
                { ...newHistoryItem, timestamp: newHistoryItem.created_at },
                ...state.historyList,
              ].slice(0, 10),
            };
          });
        } catch (error) {
          console.error("Failed to add to history:", error);
        }
      },

      // Clear all history
      clearHistory: async () => {
        try {
          await historyService.clearAllHistory();
          set({ historyList: [] });
        } catch (error) {
          console.error("Failed to clear history:", error);
          throw error;
        }
      },

      // Remove selected items from history
      removeFromHistory: async (ipsToRemove) => {
        try {
          await historyService.deleteHistory(ipsToRemove);
          set((state) => ({
            historyList: state.historyList.filter(
              (item) => !ipsToRemove.includes(item.ip),
            ),
          }));
        } catch (error) {
          console.error("Failed to remove from history:", error);
          throw error;
        }
      },
    }),
    {
      name: "geo-app-storage",
      partialize: (state) => ({
        // Only persist historyList now (no auth)
        historyList: state.historyList,
      }),
    },
  ),
);

export default useAppStore;
