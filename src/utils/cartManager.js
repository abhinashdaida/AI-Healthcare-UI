// Central Cart State Manager with localStorage synchronization

const CART_STORAGE_KEY = "fasco_shopping_cart";

// Initial default cart item if storage is empty
const DEFAULT_INITIAL_CART = [
  {
    id: "1",
    name: "Rounded Red Hat",
    color: "Red",
    selectedSize: "M",
    selectedColor: "Red",
    price: 50.0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80"
  }
];

export const getStoredCart = () => {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to read cart from localStorage", e);
  }
  return DEFAULT_INITIAL_CART;
};

export const saveStoredCart = (cartItems) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cart_updated"));
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
};

export const addItemToCart = (product) => {
  const current = getStoredCart();
  const rawPrice =
    typeof product.price === "string"
      ? Number(product.price.replace(/[^0-9.-]+/g, ""))
      : Number(product.price) || 0;

  const newItem = {
    id: String(product.id || Date.now()),
    name: product.name || "Fashion Item",
    brand: product.brand || "FASCO",
    price: rawPrice,
    color: product.selectedColor || product.color || "Red",
    selectedSize: product.selectedSize || product.size || "M",
    selectedColor: product.selectedColor || product.color || "Red",
    image: product.image || "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80",
    quantity: Number(product.quantity) || 1
  };

  const existingIndex = current.findIndex(
    (item) =>
      item.id === newItem.id &&
      item.selectedSize === newItem.selectedSize &&
      item.selectedColor === newItem.selectedColor
  );

  let updated;
  if (existingIndex > -1) {
    updated = [...current];
    updated[existingIndex].quantity += newItem.quantity;
  } else {
    updated = [newItem, ...current];
  }

  saveStoredCart(updated);
  return updated;
};

export const updateCartItemQuantity = (itemId, newQuantity) => {
  const current = getStoredCart();
  const updated = current
    .map((item) =>
      item.id === String(itemId) ? { ...item, quantity: Math.max(1, newQuantity) } : item
    )
    .filter(Boolean);

  saveStoredCart(updated);
  return updated;
};

export const removeCartItem = (itemId) => {
  const current = getStoredCart();
  const updated = current.filter((item) => String(item.id) !== String(itemId));
  saveStoredCart(updated);
  return updated;
};
