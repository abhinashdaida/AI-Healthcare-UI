import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Button from "../../../components/common/Button/Button";

/**
 * Slide-Over Shopping Cart Drawer matching the FASCO reference design exactly.
 * Located in: src/pages/ProductDetails/components/CartDrawer.jsx
 */
const CartDrawer = ({
  isOpen = false,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);

  if (!isOpen) return null;

  // Calculate items subtotal
  const itemsSubtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const giftWrapFee = isGiftWrapped ? 10.0 : 0;
  const finalSubtotal = itemsSubtotal + giftWrapFee;

  // Calculate amount needed for Free Shipping (threshold e.g. $150)
  const freeShippingThreshold = 150.0;
  const neededForFreeShipping = Math.max(
    0,
    freeShippingThreshold - itemsSubtotal
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
      />

      {/* 2. Slide-over Container (Right Aligned) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-[420px] bg-white shadow-2xl flex flex-col justify-between text-left">
          
          {/* ========================================================
              DRAWER HEADER
          ======================================================== */}
          <div className="p-6 pb-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 tracking-tight">
                Shopping Cart
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors focus:outline-none"
                aria-label="Close cart drawer"
              >
                <Icon icon="mdi:close" className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Alert */}
            <p className="mt-2 text-xs text-neutral-600 font-normal">
              Buy{" "}
              <strong className="text-black font-bold">
                ${neededForFreeShipping.toFixed(2)}
              </strong>{" "}
              More And Get{" "}
              <strong className="text-black font-bold">Free Shipping</strong>
            </p>
          </div>

          {/* ========================================================
              DRAWER ITEMS LIST
          ======================================================== */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 space-y-3">
                <Icon icon="mdi:cart-outline" className="w-12 h-12 mx-auto text-neutral-300" />
                <p className="text-sm font-medium">Your cart is currently empty.</p>
                <Button variant="outline" size="small" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = Number(item.price) || 14.8;
                return (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="pb-6 border-b border-neutral-200 last:border-b-0"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Product Thumbnail */}
                      <div className="h-28 w-24 sm:h-32 sm:w-28 shrink-0 rounded-md overflow-hidden bg-neutral-100 border border-neutral-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between min-h-[112px]">
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-xs text-neutral-500">
                            Color : {item.selectedColor || item.color || "Red"}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="mt-2 text-sm font-bold text-neutral-950">
                          ${itemPrice.toFixed(2)}
                        </div>

                        {/* Quantity Pill Controls [ − ] 01 [ + ] */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center bg-neutral-100/90 rounded px-2 py-1 gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                const currentQty = item.quantity || 1;
                                if (currentQty > 1 && onUpdateQuantity) {
                                  onUpdateQuantity(item, currentQty - 1);
                                } else if (currentQty === 1 && onRemoveItem) {
                                  onRemoveItem(item);
                                }
                              }}
                              className="text-neutral-600 hover:text-black font-semibold text-xs px-1 focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="text-xs font-bold text-neutral-900 min-w-[16px] text-center">
                              {String(item.quantity || 1).padStart(2, "0")}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const currentQty = item.quantity || 1;
                                if (onUpdateQuantity) {
                                  onUpdateQuantity(item, currentQty + 1);
                                }
                              }}
                              className="text-neutral-600 hover:text-black font-semibold text-xs px-1 focus:outline-none"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Delete Item Action */}
                          <button
                            type="button"
                            onClick={() => onRemoveItem && onRemoveItem(item)}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item from cart"
                          >
                            <Icon icon="mdi:trash-can-outline" className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ========================================================
              DRAWER FOOTER (Gift wrap, Subtotal & Checkout)
          ======================================================== */}
          {cartItems.length > 0 && (
            <div className="p-6 pt-4 border-t border-neutral-200 bg-white space-y-4">
              
              {/* Gift Wrap Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer select-none text-xs text-neutral-600 font-normal">
                <input
                  type="checkbox"
                  checked={isGiftWrapped}
                  onChange={(e) => setIsGiftWrapped(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                />
                <span>
                  For <strong className="text-black font-bold">$10.00</strong> Please Wrap The Product
                </span>
              </label>

              <hr className="border-neutral-200" />

              {/* Subtotal Row */}
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-neutral-900">
                  Subtotal
                </span>
                <span className="text-base font-extrabold text-neutral-950">
                  ${finalSubtotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                onClick={onCheckout || (() => (window.location.href = "/cart"))}
                className="w-full justify-center !py-3.5 !rounded-md text-xs font-semibold uppercase tracking-wider shadow-[0_10px_20px_rgba(0,0,0,0.18)] hover:bg-neutral-800 active:scale-95 transition-all"
              >
                Checkout
              </Button>

              {/* View Cart Link */}
              <div className="text-center pt-0.5">
                <a
                  href="/cart"
                  className="text-xs text-neutral-900 hover:text-black underline font-bold tracking-tight transition-colors"
                >
                  View Cart
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
