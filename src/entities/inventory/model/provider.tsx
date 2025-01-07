import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createInventoryStore, InventoryStore } from "./store";

export type InventoryStoreApi = ReturnType<typeof createInventoryStore>;

export const InventoryStoreContext = createContext<InventoryStoreApi | undefined>(undefined);

export const InventoryStoreProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const storeRef = useRef<InventoryStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createInventoryStore();
  }

  return (
    <InventoryStoreContext.Provider value={storeRef.current}>
      {children}
    </InventoryStoreContext.Provider>
  );
};

export const useInventoryStore = <T,>(selector: (store: InventoryStore) => T): T => {
  const inventoryStoreContext = useContext(InventoryStoreContext);

  if (!inventoryStoreContext) {
    throw new Error("useInventoryStore must be used within a InventoryStoreProvider");
  }

  return useStore(inventoryStoreContext, selector);
};
