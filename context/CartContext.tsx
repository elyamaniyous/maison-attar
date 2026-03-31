"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

export interface CartItemConfiguration {
  zellige?: string;
  size?: string;
  base?: string;
}

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  configuration: CartItemConfiguration;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string; configuration?: CartItemConfiguration } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; configuration?: CartItemConfiguration; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string, configuration?: CartItemConfiguration) => void;
  updateQuantity: (id: string, quantity: number, configuration?: CartItemConfiguration) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "maison-attar-cart";

function cartKey(id: string, configuration?: CartItemConfiguration): string {
  return `${id}__${JSON.stringify(configuration ?? {})}`;
}

function itemMatchesKey(item: CartItem, id: string, configuration?: CartItemConfiguration): boolean {
  return item.id === id && JSON.stringify(item.configuration) === JSON.stringify(configuration ?? {});
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { quantity = 1, ...rest } = action.payload;
      const existingIndex = state.items.findIndex((item) =>
        itemMatchesKey(item, rest.id, rest.configuration)
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, { ...rest, quantity }] };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => !itemMatchesKey(item, action.payload.id, action.payload.configuration)
        ),
      };
    }
    case "UPDATE_QUANTITY": {
      const { id, configuration, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => !itemMatchesKey(item, id, configuration)),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          itemMatchesKey(item, id, configuration) ? { ...item, quantity } : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "SET_ITEMS", payload: parsed });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      dispatch({ type: "ADD_ITEM", payload: item });
    },
    []
  );

  const removeFromCart = useCallback(
    (id: string, configuration?: CartItemConfiguration) => {
      dispatch({ type: "REMOVE_ITEM", payload: { id, configuration } });
    },
    []
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number, configuration?: CartItemConfiguration) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, configuration, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const getCartTotal = useCallback(() => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [state.items]);

  const getCartCount = useCallback(() => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  }, [state.items]);

  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

// Suppress unused warning for cartKey — used as a utility if needed externally
export { cartKey };
