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

  /*
   * Product Details -> Buy Now
   *
   * location.state.checkoutItems contains
   * only the product selected from Product Details.
   *
   * Normal Cart -> Checkout
   *
   * getStoredCart() contains cart products.
   */
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

  /* ================= ADDRESS ================= */

  useEffect(() => {
    const savedAddress =
      localStorage.getItem("selectedAddress");

    if (savedAddress) {
      try {
        setSelectedAddress(JSON.parse(savedAddress));
      } catch (error) {
        console.error(
          "Invalid selectedAddress:",
          error
        );
      }
    }
  }, []);

  /* ================= CART ================= */

  useEffect(() => {
    /*
     * If user came directly from Product Details
     * don't replace the selected product with
     * the complete cart.
     */
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

  /* ================= SELECTED ITEMS ================= */

  const selectedItems = cartItems.filter(
    (item) => item.selected
  );

  /* ================= PRICE ================= */

  const subtotal = selectedItems.reduce(
    (total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      return total + price * quantity;
    },
    0
  );

  /*
   * Free shipping when subtotal is 100 or more.
   * Otherwise shipping = 40.
   */
  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= 100
      ? 0
      : 40;

  const total = subtotal + shipping;

  /* ================= UPDATE ITEM ================= */

  const updateItem = (id, changes) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
            }
          : item
      )
    );
  };

  /* ================= INCREASE ================= */

  const handleIncrease = (id) => {
    const item = cartItems.find(
      (item) => item.id === id
    );

    if (!item) return;

    const newQuantity =
      Number(item.quantity || 1) + 1;

    updateItem(id, {
      quantity: newQuantity,
    });

    /*
     * Update central cart only when
     * item actually exists in cart.
     */
    updateCartItemQuantity(id, newQuantity);
  };

  /* ================= DECREASE ================= */

  const handleDecrease = (id) => {
    const item = cartItems.find(
      (item) => item.id === id
    );

    if (!item) return;

    const currentQuantity =
      Number(item.quantity) || 1;

    if (currentQuantity <= 1) return;

    const newQuantity = currentQuantity - 1;

    updateItem(id, {
      quantity: newQuantity,
    });

    updateCartItemQuantity(id, newQuantity);
  };

  /* ================= REMOVE ================= */

  const handleRemove = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    removeCartItem(id);
  };

  /* ================= PLACE ORDER ================= */

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert(
        "Please select a delivery address from Profile."
      );
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

    localStorage.setItem(
      "lastOrder",
      JSON.stringify(order)
    );

    setOrderPlaced(true);
  };

  /* ================= PAYMENT OPTIONS ================= */

  const paymentOptions = [
    {
      value: "card",
      label: "Credit Card",
      icon: "mdi:credit-card-outline",
    },
    {
      value: "phonepe",
      label: "PhonePe",
      icon: "mdi:cellphone",
    },
    {
      value: "cod",
      label: "Cash on Delivery",
      icon: "mdi:cash",
    },
  ];

  /* ================= HELPER ================= */

  const getSize = (item) => {
    return (
      item.selectedSize ||
      item.size ||
      "Standard"
    );
  };

  const getColor = (item) => {
    return (
      item.selectedColor ||
      item.color ||
      "Default"
    );
  };

  /* ================= ORDER SUCCESS ================= */

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          {/* SUCCESS ICON */}

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Icon
                icon="mdi:check"
                width="36"
                className="text-green-600"
              />
            </div>

            <h1 className="mt-5 text-2xl font-semibold">
              Order Confirmed!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Thank you for your purchase. Your order
              has been successfully placed.
            </p>
          </div>

          {/* ORDER DETAILS */}

          <div className="mt-6 rounded-xl bg-gray-50 p-5">

            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Order Number
              </span>

              <span className="text-sm font-semibold">
                ORD-{Date.now().toString().slice(-6)}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-sm text-gray-500">
                Subtotal
              </span>

              <span className="text-sm font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-sm text-gray-500">
                Shipping
              </span>

              <span className="text-sm font-semibold">
                {shipping === 0
                  ? "FREE"
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="mt-4 flex justify-between border-t pt-4">
              <span className="font-semibold">
                Total Amount
              </span>

              <span className="text-lg font-semibold">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-sm text-gray-500">
                Payment
              </span>

              <span className="text-sm font-semibold">
                {paymentMethod === "card"
                  ? "Credit Card"
                  : paymentMethod === "phonepe"
                  ? "PhonePe"
                  : "Cash on Delivery"}
              </span>
            </div>
          </div>

          {/* ORDERED ITEMS */}

          <div className="mt-6">
            <h3 className="font-semibold">
              Ordered Items
            </h3>

            <div className="mt-4 space-y-3">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Size: {getSize(item)}
                    </p>

                    <p className="text-xs text-gray-500">
                      Color: {getColor(item)}
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      ${Number(item.price).toFixed(2)}
                      {" × "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESS */}

          {selectedAddress && (
            <div className="mt-6 rounded-xl border p-5">
              <h3 className="font-semibold">
                Delivery Address
              </h3>

              <p className="mt-3 text-sm font-medium">
                {selectedAddress.name}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {selectedAddress.addressLine1}
              </p>

              {selectedAddress.addressLine2 && (
                <p className="text-sm text-gray-600">
                  {selectedAddress.addressLine2}
                </p>
              )}

              <p className="text-sm text-gray-600">
                {selectedAddress.city},{" "}
                {selectedAddress.state} -{" "}
                {selectedAddress.pincode}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {selectedAddress.phone}
              </p>
            </div>
          )}

          {/* CONTINUE SHOPPING */}

          <div className="mt-6">
            <Button
              fullWidth
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= CHECKOUT PAGE ================= */

  return (
    <div className="min-h-screen bg-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* TITLE */}

        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          Checkout
        </Typography>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div>

            {/* CONTACT */}

            <section>
              <Typography
                sx={{
                  mb: 3,
                  fontSize: 21,
                  fontWeight: 600,
                }}
              >
                Contact Information
              </Typography>

              <InputField
                label="Email Address"
                placeholder="Enter your email"
              />

              <div className="mt-4">
                <InputField
                  label="Phone Number"
                  placeholder="+91 9876543210"
                />
              </div>
            </section>

            {/* ADDRESS */}

            <section className="mt-8">

              <Typography
                sx={{
                  mb: 3,
                  fontSize: 21,
                  fontWeight: 600,
                }}
              >
                Delivery Address
              </Typography>

              {selectedAddress ? (
                <div className="rounded-xl border border-gray-200 p-5">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="font-semibold">
                        {selectedAddress.name}
                      </p>

                      <p className="mt-2 text-sm text-gray-600">
                        {selectedAddress.addressLine1}
                      </p>

                      {selectedAddress.addressLine2 && (
                        <p className="text-sm text-gray-600">
                          {selectedAddress.addressLine2}
                        </p>
                      )}

                      <p className="text-sm text-gray-600">
                        {selectedAddress.city},{" "}
                        {selectedAddress.state}
                      </p>

                      <p className="text-sm text-gray-600">
                        {selectedAddress.pincode},{" "}
                        {selectedAddress.country}
                      </p>

                      <p className="mt-2 text-sm text-gray-600">
                        {selectedAddress.phone}
                      </p>

                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      {selectedAddress.type}
                    </span>

                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  No address selected. Please select an
                  address from your Profile.
                </div>
              )}

              <FormControlLabel
                control={<Checkbox />}
                label="Save this information for future"
              />

            </section>

            {/* PAYMENT */}

            <section className="mt-8">

              <Typography
                sx={{
                  mb: 3,
                  fontSize: 21,
                  fontWeight: 600,
                }}
              >
                Payment
              </Typography>

              <div className="space-y-3">

                {paymentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setPaymentMethod(option.value)
                    }
                    className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition ${
                      paymentMethod === option.value
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <Icon
                        icon={option.icon}
                        width="24"
                      />

                      <span className="text-sm font-medium">
                        {option.label}
                      </span>

                    </div>

                    <div
                      className={`h-4 w-4 rounded-full border ${
                        paymentMethod === option.value
                          ? "border-black bg-black"
                          : "border-gray-300"
                      }`}
                    />

                  </button>
                ))}

              </div>

              {/* CARD */}

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4 rounded-lg border p-5">

                  <InputField
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                  />

                  <div className="grid grid-cols-2 gap-4">

                    <InputField
                      label="Expiration Date"
                      placeholder="MM / YY"
                    />

                    <InputField
                      label="Security Code"
                      placeholder="CVV"
                    />

                  </div>

                  <InputField
                    label="Card Holder Name"
                    placeholder="Name on card"
                  />

                </div>
              )}

              {/* PHONEPE */}

              {paymentMethod === "phonepe" && (
                <div className="mt-4 rounded-lg border p-5">

                  <InputField
                    label="PhonePe UPI ID"
                    placeholder="example@ybl"
                  />

                  <p className="mt-3 text-xs text-gray-500">
                    You will be redirected to PhonePe
                    to complete the payment.
                  </p>

                </div>
              )}

              {/* COD */}

              {paymentMethod === "cod" && (
                <div className="mt-4 rounded-lg bg-gray-50 p-5 text-sm text-gray-600">
                  Pay when your order is delivered.
                </div>
              )}

            </section>

          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE - ORDER SUMMARY */}
          {/* ================================================= */}

          <div className="lg:border-l lg:pl-10">

            <Typography
              sx={{
                mb: 4,
                fontSize: 21,
                fontWeight: 600,
              }}
            >
              Order Summary
            </Typography>

            {/* PRODUCTS */}

            {cartItems.length === 0 ? (
              <div className="rounded-xl border border-gray-200 p-6 text-center">

                <Icon
                  icon="mdi:cart-outline"
                  width="50"
                  className="mx-auto text-gray-400"
                />

                <p className="mt-3 text-sm text-gray-500">
                  No products available.
                </p>

                <div className="mt-4">
                  <Button
                    onClick={() =>
                      navigate("/shop")
                    }
                  >
                    Continue Shopping
                  </Button>
                </div>

              </div>
            ) : (
              <div className="space-y-4">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className={`rounded-xl border p-4 ${
                      item.selected
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >

                    {/* SELECT */}

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(
                            item.selected
                          )}
                          onChange={(e) =>
                            updateItem(item.id, {
                              selected:
                                e.target.checked,
                            })
                          }
                        />
                      }
                      label="Select"
                    />

                    {/* PRODUCT */}

                    <OrderItem
                      item={item}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      onRemove={handleRemove}
                    />

                    {/* VARIANTS */}

                    <div className="mt-3 flex flex-wrap gap-3">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        Size: {getSize(item)}
                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        Color: {getColor(item)}
                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        Qty: {item.quantity}
                      </span>

                    </div>

                  </div>

                ))}

              </div>
            )}

            {/* DISCOUNT */}

            <div className="mt-6 border-t border-gray-200 pt-6">

              <div className="flex items-end gap-2">

                <div className="flex-1">
                  <InputField
                    label="Discount Code"
                    placeholder="Enter discount code"
                  />
                </div>

                <Button>
                  Apply
                </Button>

              </div>

            </div>

            {/* ================================================= */}
            {/* PRICE SUMMARY */}
            {/* ================================================= */}

            <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">

              {/* SUBTOTAL */}

              <div className="flex justify-between">

                <span className="text-sm text-gray-600">
                  Subtotal
                </span>

                <span className="text-sm font-medium">
                  ${subtotal.toFixed(2)}
                </span>

              </div>

              {/* SHIPPING */}

              <div className="flex justify-between">

                <span className="text-sm text-gray-600">
                  Shipping
                </span>

                <span className="text-sm font-medium">
                  {shipping === 0
                    ? "FREE"
                    : `$${shipping.toFixed(2)}`}
                </span>

              </div>

              {/* FREE SHIPPING MESSAGE */}

              {subtotal > 0 && subtotal < 100 && (
                <p className="text-xs text-gray-500">
                  Add $
                  {(100 - subtotal).toFixed(2)}
                  {" "}
                  more to get free shipping.
                </p>
              )}

              {/* TOTAL */}

              <div className="flex justify-between border-t border-gray-200 pt-5">

                <span className="text-lg font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  ${total.toFixed(2)}
                </span>

              </div>

            </div>

            {/* PLACE ORDER */}

            <div className="mt-6">

              <Button
                fullWidth
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>

            </div>

            {/* SECURITY */}

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">

              <Icon
                icon="mdi:shield-check-outline"
                width="18"
              />

              Secure and encrypted payment

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;