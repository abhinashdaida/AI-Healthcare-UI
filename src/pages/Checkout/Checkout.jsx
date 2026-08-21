import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";

import InputField from "../../components/common/InputField/InputField";
import Button from "../../components/common/Button/Button";
import OrderItem from "../../components/product/OrderItem/OrderItem";

import {
  getStoredCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../../utils/cartManager";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  /* ================= STATE LOGIC (UNCHANGED) ================= */
  const [cartItems, setCartItems] = useState(() => {
    if (
      location.state?.directBuy &&
      location.state?.checkoutItems?.length > 0
    ) {
      return location.state.checkoutItems.map((item) => ({
        ...item,
        selected: true,
        quantity: Number(item.quantity) || 1,
      }));
    }

    return getStoredCart().map((item) => ({
      ...item,
      selected: item.selected ?? true,
      quantity: Number(item.quantity) || 1,
    }));
  });

  /* ================= ADDRESS (UNCHANGED) ================= */
  useEffect(() => {
    const savedAddress = localStorage.getItem("selectedAddress");

    if (savedAddress) {
      try {
        setSelectedAddress(JSON.parse(savedAddress));
      } catch (error) {
        console.error("Invalid selectedAddress:", error);
      }
    }
  }, []);

  /* ================= CART (UNCHANGED) ================= */
  useEffect(() => {
    if (
      location.state?.directBuy &&
      location.state?.checkoutItems?.length > 0
    ) {
      return;
    }

    const storedCart = getStoredCart();

    setCartItems(
      storedCart.map((item) => ({
        ...item,
        selected: item.selected ?? true,
        quantity: Number(item.quantity) || 1,
      }))
    );
  }, [location.state]);

  /* ================= CALCULATIONS (UNCHANGED) ================= */
  const selectedItems = cartItems.filter((item) => item.selected);

  const subtotal = selectedItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return total + price * quantity;
  }, 0);

  const shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 40;
  const total = subtotal + shipping;

  /* ================= HANDLERS (UNCHANGED) ================= */
  const updateItem = (id, changes) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      )
    );
  };

  const handleIncrease = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = Number(item.quantity || 1) + 1;
    updateItem(id, { quantity: newQuantity });
    updateCartItemQuantity(id, newQuantity);
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const currentQuantity = Number(item.quantity) || 1;
    if (currentQuantity <= 1) return;

    const newQuantity = currentQuantity - 1;
    updateItem(id, { quantity: newQuantity });
    updateCartItemQuantity(id, newQuantity);
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    removeCartItem(id);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address from Profile.");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    const order = {
      items: selectedItems,
      address: selectedAddress,
      paymentMethod,
      subtotal,
      shipping,
      total,
      orderNumber: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    setOrderPlaced(true);
  };

  const paymentOptions = [
    {
      value: "card",
      label: "Credit / Debit Card",
      icon: "solar:card-bold-duotone",
      color: "text-indigo-600",
    },
    {
      value: "phonepe",
      label: "PhonePe / UPI",
      icon: "solar:smartphone-line-duotone",
      color: "text-purple-600",
    },
    {
      value: "cod",
      label: "Cash on Delivery",
      icon: "solar:wallet-money-bold-duotone",
      color: "text-emerald-600",
    },
  ];

  const getSize = (item) => item.selectedSize || item.size || "Standard";
  const getColor = (item) => item.selectedColor || item.color || "Default";

  /* ================= ORDER SUCCESS UI ================= */
  if (orderPlaced) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 px-4 py-12">
        <div className="w-full max-w-xl rounded-3xl border border-emerald-100 bg-white p-8 shadow-2xl shadow-emerald-500/10">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
              <Icon icon="lucide:check-circle-2" width="44" />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
              Order Confirmed! 🎉
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Thank you for your purchase. We have received your order and will process it shortly.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 p-6 border border-emerald-100/60 shadow-inner">
            <div className="flex justify-between items-center py-2 border-b border-slate-200/80">
              <span className="text-sm font-medium text-slate-500">Order Number</span>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                ORD-{Date.now().toString().slice(-6)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200/80 mt-1">
              <span className="text-sm font-medium text-slate-500">Subtotal</span>
              <span className="text-sm font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200/80 mt-1">
              <span className="text-sm font-medium text-slate-500">Shipping</span>
              <span className="text-sm font-semibold text-slate-900">
                {shipping === 0 ? <span className="text-emerald-600 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">FREE</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 mt-1">
              <span className="font-bold text-slate-900">Total Amount</span>
              <span className="text-xl font-black text-emerald-600">${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200/80">
              <span className="text-sm font-medium text-slate-500">Payment Method</span>
              <span className="text-sm font-semibold text-indigo-700 capitalize bg-indigo-50 px-2.5 py-0.5 rounded-md">
                {paymentMethod === "card"
                  ? "Credit Card"
                  : paymentMethod === "phonepe"
                  ? "PhonePe"
                  : "Cash on Delivery"}
              </span>
            </div>
          </div>

          {/* ORDERED ITEMS */}
          <div className="mt-8">
            <h3 className="text-base font-bold text-slate-900">Ordered Items</h3>
            <div className="mt-4 space-y-3">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-indigo-50 p-3 bg-gradient-to-r from-white to-slate-50/50 hover:border-indigo-100 transition-colors shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover bg-slate-100 ring-1 ring-slate-200/60"
                  />
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="font-bold text-sm text-slate-900 line-clamp-1">{item.name}</p>
                    <div className="mt-1.5 flex items-center gap-2 text-xs">
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium">Size: {getSize(item)}</span>
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-medium">Color: {getColor(item)}</span>
                    </div>
                    <p className="mt-2 text-sm font-extrabold text-slate-900">
                      ${Number(item.price).toFixed(2)} <span className="text-xs text-slate-400 font-normal">× {item.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESS */}
          {selectedAddress && (
            <div className="mt-8 rounded-2xl border border-indigo-100 p-5 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Delivery Address</h3>
              <p className="mt-2 text-sm font-bold text-slate-900">{selectedAddress.name}</p>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                {selectedAddress.addressLine1}
                {selectedAddress.addressLine2 && `, ${selectedAddress.addressLine2}`}
                <br />
                {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{selectedAddress.phone}</p>
            </div>
          )}

          <div className="mt-8">
            <Button fullWidth onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= CHECKOUT MAIN PAGE UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* BREADCRUMB / TITLE */}
        <div className="mb-8">
          <Typography
            sx={{
              fontSize: { xs: 26, md: 34 },
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(to right, #1e1b4b, #4338ca, #6b21a8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Checkout
          </Typography>
          <p className="text-sm font-medium text-indigo-900/60 mt-1">Complete your order details below</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN: CONTACT, ADDRESS & PAYMENT */}
          <div className="lg:col-span-7 space-y-8">
            {/* CONTACT */}
            <section className="rounded-3xl border border-indigo-50 bg-white/80 backdrop-blur-md p-6 shadow-xl shadow-indigo-100/40 hover:shadow-indigo-100/70 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black shadow-md shadow-indigo-200">1</div>
                <h2 className="text-lg font-bold text-slate-900">Contact Information</h2>
              </div>

              <div className="space-y-4">
                <InputField label="Email Address" placeholder="Enter your email" />
                <InputField label="Phone Number" placeholder="+91 9876543210" />
              </div>
            </section>

            {/* ADDRESS */}
            <section className="rounded-3xl border border-indigo-50 bg-white/80 backdrop-blur-md p-6 shadow-xl shadow-indigo-100/40 hover:shadow-indigo-100/70 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs font-black shadow-md shadow-fuchsia-200">2</div>
                <h2 className="text-lg font-bold text-slate-900">Delivery Address</h2>
              </div>

              {selectedAddress ? (
                <div className="relative rounded-2xl border-2 border-indigo-500/80 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white p-5 transition-all shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-slate-900">{selectedAddress.name}</p>
                        <span className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                          {selectedAddress.type || "Home"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed pt-1 font-medium">
                        {selectedAddress.addressLine1}
                        {selectedAddress.addressLine2 && `, ${selectedAddress.addressLine2}`}
                      </p>
                      <p className="text-sm text-slate-600 font-medium">
                        {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                      </p>
                      <p className="text-sm font-bold text-indigo-700 pt-1">{selectedAddress.phone}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-4 text-sm text-rose-700 font-medium flex items-center gap-3">
                  <Icon icon="lucide:alert-circle" width="22" className="shrink-0 text-rose-500" />
                  <span>No address selected. Please select an address from your Profile.</span>
                </div>
              )}

              <div className="mt-4">
                <FormControlLabel
                  control={<Checkbox sx={{ "&.Mui-checked": { color: "#6366f1" } }} />}
                  label={<Typography sx={{ fontSize: "14px", color: "#475569", fontWeight: 500 }}>Save this information for future</Typography>}
                />
              </div>
            </section>

            {/* PAYMENT */}
            <section className="rounded-3xl border border-indigo-50 bg-white/80 backdrop-blur-md p-6 shadow-xl shadow-indigo-100/40 hover:shadow-indigo-100/70 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-black shadow-md shadow-emerald-200">3</div>
                <h2 className="text-lg font-bold text-slate-900">Payment Options</h2>
              </div>

              <div className="space-y-3">
                {paymentOptions.map((option) => {
                  const isSelected = paymentMethod === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPaymentMethod(option.value)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-md"
                          : "border-slate-200 hover:border-indigo-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2 rounded-xl ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 " + option.color}`}>
                          <Icon icon={option.icon} width="22" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{option.label}</span>
                      </div>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                          isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                        }`}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* PAYMENT DETAILS INPUTS */}
              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-white p-5 shadow-inner">
                  <InputField label="Card Number" placeholder="1234 5678 9012 3456" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Expiration Date" placeholder="MM / YY" />
                    <InputField label="Security Code" placeholder="CVV" />
                  </div>
                  <InputField label="Card Holder Name" placeholder="Name on card" />
                </div>
              )}

              {paymentMethod === "phonepe" && (
                <div className="mt-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/40 to-pink-50/20 p-5 shadow-inner">
                  <InputField label="PhonePe UPI ID" placeholder="example@ybl" />
                  <p className="mt-3 text-xs font-medium text-purple-700 flex items-center gap-1.5">
                    <Icon icon="solar:info-circle-bold" width="16" />
                    You will be redirected to PhonePe application to authorize payment.
                  </p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-teal-50/20 p-5 text-sm font-medium text-emerald-800 leading-relaxed shadow-inner">
                  Pay with cash upon delivery. Please prepare exact change if possible.
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (STICKY) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-indigo-50 bg-white p-6 shadow-2xl shadow-indigo-100/60 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <h2 className="text-lg font-extrabold text-slate-900 mb-6">Order Summary</h2>

              {/* PRODUCT ITEMS */}
              {cartItems.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-indigo-100 bg-indigo-50/20 p-8 text-center">
                  <Icon icon="solar:box-minimalistic-line-duotone" width="48" className="mx-auto text-indigo-300" />
                  <p className="mt-3 text-sm font-semibold text-slate-500">Your cart is empty.</p>
                  <div className="mt-4">
                    <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-2xl border p-3.5 transition-all ${
                        item.selected 
                          ? "border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 shadow-xs" 
                          : "border-slate-100 bg-slate-50/50 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-indigo-50">
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={Boolean(item.selected)}
                              onChange={(e) =>
                                updateItem(item.id, {
                                  selected: e.target.checked,
                                })
                              }
                              sx={{ "&.Mui-checked": { color: "#6366f1" } }}
                            />
                          }
                          label={<Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#4338ca" }}>Include in Order</Typography>}
                        />
                      </div>

                      <OrderItem
                        item={item}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        onRemove={handleRemove}
                      />

                      <div className="mt-2 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                        <span className="rounded-lg bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">
                          Size: {getSize(item)}
                        </span>
                        <span className="rounded-lg bg-purple-50 px-2.5 py-0.5 text-[11px] font-bold text-purple-700">
                          Color: {getColor(item)}
                        </span>
                        <span className="rounded-lg bg-pink-50 px-2.5 py-0.5 text-[11px] font-bold text-pink-700">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* DISCOUNT CODE */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <InputField label="Discount Code" placeholder="Enter coupon code" />
                  </div>
                  <Button>Apply</Button>
                </div>
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Shipping</span>
                  <span className="font-bold text-slate-900">
                    {shipping === 0 ? <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 100 && (
                  <p className="rounded-xl bg-amber-50 p-2.5 text-center text-xs text-amber-800 font-bold border border-amber-200/60">
                    Add ${(100 - subtotal).toFixed(2)} more to qualify for FREE Shipping.
                  </p>
                )}

                <div className="flex justify-between border-t border-slate-100 pt-4 text-base">
                  <span className="font-extrabold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-6">
                <Button fullWidth onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </div>

              {/* SECURITY ASSURANCE */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-bold">
                <Icon icon="solar:shield-check-bold" width="16" className="text-emerald-500" />
                <span>Encrypted 256-bit SSL Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;