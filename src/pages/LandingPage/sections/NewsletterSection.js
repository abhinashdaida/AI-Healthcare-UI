import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    // Check empty email
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Check valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Clear error
    setError("");

    // Open success popup
    setOpenSuccess(true);

    // Clear input
    setEmail("");
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="relative min-h-[410px] overflow-hidden bg-white px-5 py-20">

        {/* Left model */}
        <div className="absolute bottom-0 left-[4%] hidden w-[190px] md:block lg:left-[13%]">

          <img
            src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=90"
            alt="Fashion model"
            className="h-[300px] w-full object-cover"
          />

        </div>

        {/* Center */}
        <div className="relative z-10 mx-auto max-w-[480px] text-center">

          <h2 className="font-serif text-[32px]">
            Subscribe To Our Newsletter
          </h2>

          <p className="mx-auto mt-2 max-w-[380px] text-[14px] leading-[1.8] text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Subscribe to our newsletter for the latest fashion updates.
          </p>

          {/* Input */}
          <div className="mx-auto mt-6 max-w-[370px]">

            <div className="flex border-b border-gray-200">

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="michael@gmail.com"
                className="min-w-0 flex-1 px-3 py-3 text-[14px] outline-none"
              />

              <button
                type="button"
                onClick={handleSubscribe}
                className="bg-black px-6 text-[12px] text-white transition hover:bg-gray-800"
              >
                Subscribe Now
              </button>

            </div>

            {/* Error */}
            {error && (
              <p className="mt-2 text-left text-[12px] text-red-500">
                {error}
              </p>
            )}

          </div>

        </div>

        {/* Right model */}
        <div className="absolute bottom-0 right-[4%] hidden w-[190px] md:block lg:right-[13%]">

          <img
            src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=90"
            alt="Fashion model"
            className="h-[300px] w-full object-cover"
          />

        </div>

      </section>

      {/* Success Popup */}
      <Dialog
        open={openSuccess}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "400px",
            maxWidth: "90%",
            borderRadius: "8px",
            padding: "10px",
          },
        }}
      >

        <DialogContent className="relative px-6 py-8 text-center">

          {/* Close button */}
          <IconButton
            onClick={handleClose}
            className="!absolute !right-2 !top-2"
            size="small"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Success Icon */}
          <div className="flex justify-center">

            <Icon icon="tabler:check" width={36}/>

          </div>

          {/* Title */}
          <h2 className="mt-4 font-serif text-[26px]">
            Thank You!
          </h2>

          {/* Message */}
          <p className="mt-3 text-[14px] leading-6 text-gray-500">
            Your subscription was successful.
          </p>

          <p className="mt-1 text-[13px] text-gray-400">
            You have been successfully subscribed to our newsletter.
          </p>

          {/* Button */}
          <button
            onClick={handleClose}
            className="mt-6 bg-black px-8 py-3 text-[12px] text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </button>

        </DialogContent>

      </Dialog>
    </>
  );
};

export default NewsletterSection;