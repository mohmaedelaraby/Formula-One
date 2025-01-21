import { create } from "zustand";

// Zustand store to manage pinned races
const useStore = create((set) => ({
  // State for pinned races (we'll use a Set to store race IDs)
  pinnedRaces: new Set(JSON.parse(localStorage.getItem("pinnedRaces") || "[]")),

  // Function to pin/unpin a race
  togglePin: (raceId: any) => {
    set((state: any) => {
      const updatedPinnedRaces = new Set(state.pinnedRaces);
      if (updatedPinnedRaces.has(raceId)) {
        updatedPinnedRaces.delete(raceId);
      } else {
        updatedPinnedRaces.add(raceId);
      }

      // Update localStorage to persist pinned races
      localStorage.setItem(
        "pinnedRaces",
        JSON.stringify(Array.from(updatedPinnedRaces))
      );

      return { pinnedRaces: updatedPinnedRaces };
    });
  },
}));

export default useStore;
