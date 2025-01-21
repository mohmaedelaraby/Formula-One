import { create } from "zustand";

interface StoreState {
  pinnedRaces: Set<string>;
  togglePin: (raceId: string) => void;
}

const usePinStore = create<StoreState>((set) => ({
  pinnedRaces: new Set(JSON.parse(localStorage.getItem("pinnedRaces") || "[]")),

  togglePin: (raceId: string) => {
    set((state) => {
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

export default usePinStore;
