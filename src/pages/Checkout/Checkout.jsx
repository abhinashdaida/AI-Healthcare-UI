import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import InputField from "../../components/common/InputField/InputField";
import Button from "../../components/common/Button/Button";
import OrderItem from "../../components/product/OrderItem/OrderItem";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Mini Dress With Ruffled Straps",
      brand: "FASCO",
      price: 100,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
      selectedSize: "M",
      color: "Red",
      selected: true,
    },
  ]);

  useEffect(() => {
    const address = localStorage.getItem("selectedAddress");

    if (address) {
      setSelectedAddress(JSON.parse(address));
    }

    const savedCart = localStorage.getItem("cartItems");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const selectedItems = cartItems.filter((item) => item.selected);

  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 40 : 0;
  const total = subtotal + shipping;

  const updateItem = (id, changes) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      )
    );
  };

  const handleIncrease = (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (item) {
      updateItem(id, {
        quantity: item.quantity + 1,
      });
    }
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (item && item.quantity > 1) {
      updateItem(id, {
        quantity: item.quantity - 1,
      });
    }
  };

  const handleRemove = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address from Profile.");
      return;
    }

    if (!selectedItems.length) {
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
    };

    localStorage.setItem(
      "lastOrder",
      JSON.stringify(order)
    );

    setOrderPlaced(true);
  };

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

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Icon
                icon="mdi:check"
                width="35"
                className="text-green-600"
              />
            </div>

            <h1 className="mt-5 text-2xl font-semibold">
              Order Confirmed!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Thank you for your purchase. Your order has
              been successfully placed.
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
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
                Total Amount
              </span>

              <span className="text-sm font-semibold">
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

            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="mt-4 flex gap-4 rounded-lg border p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-16 rounded object-cover"
                />

                <div>
                  <p className="text-sm font-semibold">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Size: {item.selectedSize}
                  </p>

                  <p className="text-xs text-gray-500">
                    Color: {item.color}
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ADDRESS */}
          {selectedAddress && (
            <div className="mt-6 rounded-lg border p-4">
              <h3 className="font-semibold">
                Delivery Address
              </h3>

              <p className="mt-2 text-sm">
                {selectedAddress.name}
              </p>

              <p className="text-sm text-gray-600">
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

              <p className="text-sm text-gray-600">
                {selectedAddress.phone}
              </p>
            </div>
          )}

          <div className="mt-6">
            <Button
              fullWidth
              onClick={() =>
                (window.location.href = "/")
              }
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          Checkout
        </Typography>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* LEFT */}
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
                        : "border-gray-200"
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
                    You will be redirected to PhonePe to
                    complete the payment.
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

          {/* RIGHT */}
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

            {/* CART ITEMS */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.selected}
                        onChange={(e) =>
                          updateItem(item.id, {
                            selected: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Select"
                  />

                  <OrderItem
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                </div>
              ))}
            </div>

            {/* DISCOUNT */}
            <div className="mt-5 border-t border-gray-200 pt-5">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <InputField
                    label="Discount Code"
                    placeholder="Enter discount code"
                  />
                </div>

                <Button>Apply</Button>
              </div>
            </div>

            {/* PRICE */}
            <div className="mt-6 space-y-4 border-t border-gray-200 pt-5">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Subtotal
                </span>

                <span className="text-sm font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Shipping
                </span>

                <span className="text-sm font-medium">
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-lg font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                fullWidth
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>

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