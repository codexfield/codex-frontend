import { ReadTreeResult } from "isomorphic-git";
import { create } from "zustand";

interface Store {
  endpoint: string;
  setEndpoint: (endpoint: string) => void
  rootTree: ReadTreeResult | null;
  setRootTree: (rootTree: ReadTreeResult | null) => void;
}

export const useAppStore = create<Store>((set, get) => {
  return {
    endpoint: '',
    setEndpoint: (endpoint: string) => set((state) => {
      return {endpoint}
    }),
    rootTree: null,
    setRootTree: (rootTree: ReadTreeResult | null) => set((state) => {
      return {rootTree}
    })
  }
})