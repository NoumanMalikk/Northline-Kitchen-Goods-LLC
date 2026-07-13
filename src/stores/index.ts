import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, WishlistItem } from "@/types/product";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, sku: string) => void;
  updateQuantity: (productId: string, sku: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.sku === item.sku,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.sku === item.sku
                  ? { ...i, quantity: Math.min(99, i.quantity + item.quantity) }
                  : i,
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),
      removeItem: (productId, sku) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.productId === productId && i.sku === sku)),
        })),
      updateQuantity: (productId, sku, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId && i.sku === sku
                ? { ...i, quantity: Math.max(0, Math.min(99, quantity)) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((n, i) => n + i.quantity, 0),
    }),
    { name: "northline-cart" },
  ),
);

interface WishlistState {
  items: WishlistItem[];
  toggle: (item: Omit<WishlistItem, "addedAt">) => void;
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId);
          if (exists) {
            return { items: state.items.filter((i) => i.productId !== item.productId) };
          }
          return {
            items: [...state.items, { ...item, addedAt: new Date().toISOString() }],
          };
        }),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
      has: (productId) => get().items.some((i) => i.productId === productId),
    }),
    { name: "northline-wishlist" },
  ),
);

interface CompareState {
  productIds: string[];
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      productIds: [],
      add: (productId) =>
        set((state) => {
          if (state.productIds.includes(productId)) return state;
          if (state.productIds.length >= 4) return state;
          return { productIds: [...state.productIds, productId] };
        }),
      remove: (productId) =>
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        })),
      clear: () => set({ productIds: [] }),
      has: (productId) => get().productIds.includes(productId),
    }),
    { name: "northline-compare" },
  ),
);

interface UiState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
}));
