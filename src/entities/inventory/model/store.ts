import { GearData } from "@malib/gear";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type InventoryState = {
  readonly items: ReadonlyArray<GearData>;
};

export type InventoryActions = {
  addItem(...item: GearData[]): void;
  setItem(index: number, item: GearData): void;
  removeItem(...index: number[]): void;
};

export type InventoryStore = InventoryState & InventoryActions;

export const createInventoryStore = () => {
  return createStore<InventoryStore>()(
    persist(
      immer((set) => ({
        items: [] as GearData[],
        addItem(...item: GearData[]) {
          set((state) => {
            state.items.push(...item);
          });
        },
        setItem(index: number, item: GearData) {
          set((state) => {
            state.items[index] = item;
          });
        },
        removeItem(...index: number[]) {
          const s = new Set(index);
          set((state) => {
            state.items = state.items.filter((_, i) => !s.has(i));
          });
        },
      })),
      {
        name: "inventory",
      }
    )
  );
};
