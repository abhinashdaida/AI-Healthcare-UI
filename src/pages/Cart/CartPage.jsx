import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Header_2 from "../../components/common/Header_2/Header_2";
import Footer from "../../components/common/Footer/Footer";
import QuantitySelector from "../../components/product/QuantitySelector/QuantitySelector";
import Button from "../../components/common/Button/Button";
import NewsletterSection from "../ProductDetails/sections/NewsletterSection";
import BackButton from "../../components/common/BackButton/BackButton";
import {
  getStoredCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem
} from "../../utils/cartManager";

/**
 * Dedicated Shopping Cart Page matching the FASCO reference design.
 * Dynamically synchronized with all added/clicked products.
 * Located in: src/pages/Cart/CartPage.jsx
 */
const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // If a product was passed directly via navigation state, add it to cart immediately
  useEffect(() => {
    if (location.state && location.state.product) {
      addItemToCart(location.state.product);
    }
  }, [location.state]);

  const [cartItems, setCartItems] = useState(getStoredCart);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);

  // Synchronize cart state on changes
  useEffect(() => {
    const handleCartSync = () => {
      setCartItems(getStoredCart());
    };

    window.addEventListener("cart_updated", handleCartSync);
    window.addEventListener("storage", handleCartSync);

    return () => {
      window.removeEventListener("cart_updated", handleCartSync);
      window.removeEventListener("storage", handleCartSync);
    };
  }, []);

  // Handle quantity change
  const handleQuantityChange = (itemId, newQty) => {
    const updated = updateCartItemQuantity(itemId, newQty);
    setCartItems(updated);
  };

  // Handle remove item
  const handleRemoveItem = (itemId) => {
    const updated = removeCartItem(itemId);
    setCartItems(updated);
  };

  // Calculate items total
  const itemsSubtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const giftWrapFee = isGiftWrapped ? 10.0 : 0;
  const finalSubtotal = itemsSubtotal + giftWrapFee;
  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-black selection:text-white">
      
      {/* 1. Header_2 Navbar */}
      <Header_2
        brandName="FASCO"
        activeLink="Shop"
        cartCount={totalCartCount}
        wishlistCount={0}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* Navigation Back Button */}
        <div className="mb-6">
          <BackButton label="Continue Shopping" fallbackPath="/shop" />
        </div>

        {/* 2. Breadcrumb & Page Heading */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Shopping Cart
          </h1>
          <div className="text-xs text-neutral-500 font-medium flex items-center justify-center gap-2">
            <a href="/" className="hover:text-black transition-colors">
              Home
            </a>
            <span>&gt;</span>
            <span className="text-neutral-900 font-semibold">
              Your Shopping Cart
            </span>
          </div>
        </div>

        {/* 3. Cart Table / Items Section */}
        {cartItems.length === 0 ? (
          <div className="py-20 text-center space-y-4 border border-neutral-100 rounded-lg bg-neutral-50/50">
            <Icon icon="mdi:cart-outline" className="w-16 h-16 mx-auto text-neutral-300" />
            <h3 className="text-base font-bold text-neutral-800">
              Your shopping cart is empty
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our latest arrivals!
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => navigate("/products")}
                className="!px-8 !py-3 !rounded-lg text-xs font-semibold shadow-md"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 pb-4 text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200">
              <div className="sm:col-span-6 text-left">Product</div>
              <div className="sm:col-span-2 text-left">Price</div>
              <div className="sm:col-span-2 text-center">Quantity</div>
              <div className="sm:col-span-2 text-right">Total</div>
            </div>

            {/* Cart Items Rows */}
            <div className="divide-y divide-neutral-100">
              {cartItems.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const itemTotal = itemPrice * (item.quantity || 1);

                return (
                  <div
                    key={item.id}
                    className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                  >
                    {/* Column 1: Product Image & Details */}
                    <div className="sm:col-span-6 flex items-center gap-4 text-left">
                      <div
                        onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                        className="h-24 w-20 sm:h-28 sm:w-24 shrink-0 rounded-md overflow-hidden bg-neutral-100 border border-neutral-200 cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3
                          onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                          className="text-sm font-bold text-neutral-900 leading-snug cursor-pointer hover:underline"
                        >
                          {item.name}
                        </h3>
                        {(item.selectedColor || item.color) && (
                          <p className="text-xs text-neutral-500">
                            Color : {item.selectedColor || item.color}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-xs text-neutral-500 hover:text-red-600 underline transition-colors pt-1 focus:outline-none"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Column 2: Unit Price */}
                    <div className="sm:col-span-2 text-left">
                      <span className="sm:hidden text-xs text-neutral-400 font-semibold mr-2">
                        Price:
                      </span>
                      <span className="text-sm font-semibold text-neutral-900">
                        ${itemPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Column 3: Quantity Selector */}
                    <div className="sm:col-span-2 flex sm:justify-center">
                      <QuantitySelector
                        value={item.quantity}
                        min={1}
                        max={10}
                        size="medium"
                        onChange={(newQty) => handleQuantityChange(item.id, newQty)}
                      />
                    </div>

                    {/* Column 4: Total Amount */}
                    <div className="sm:col-span-2 text-left sm:text-right">
                      <span className="sm:hidden text-xs text-neutral-400 font-semibold mr-2">
                        Total:
                      </span>
                      <span className="text-sm font-bold text-neutral-950">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4. Cart Summary & Checkout Box (Right Aligned matching reference image) */}
            <div className="pt-8 border-t border-neutral-200 flex flex-col items-end">
              <div className="w-full sm:w-96 space-y-5 text-left">
                
                {/* Gift Wrap Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer select-none text-xs text-neutral-700 font-medium">
                  <input
                    type="checkbox"
                    checked={isGiftWrapped}
                    onChange={(e) => setIsGiftWrapped(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                  />
                  <span>
                    For <strong>$10.00</strong> Please Wrap The Product
                  </span>
                </label>

                <hr className="border-neutral-200" />

                {/* Subtotal Row */}
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-neutral-900">
                    Subtotal
                  </span>
                  <span className="text-lg font-extrabold text-neutral-950">
                    ${finalSubtotal.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  variant="primary"
                  onClick={() => alert(`Proceeding to secure checkout with total: $${finalSubtotal.toFixed(2)}`)}
                  className="w-full justify-center !py-3.5 !rounded-lg text-xs font-bold uppercase tracking-wider shadow-[0_10px_20px_rgba(0,0,0,0.18)] hover:scale-101 transition-all"
                >
                  Checkout
                </Button>

                {/* View Cart Link */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-xs text-neutral-600 hover:text-black underline font-medium transition-colors"
                  >
                    View Cart
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* 5. Dual Model Newsletter Section */}
      <NewsletterSection />

      {/* 6. Footer */}
      <Footer />

    </div>
  );
};

export default CartPage;
