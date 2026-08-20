import React from "react";
import { Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import InputField from "../../components/common/InputField/InputField";
import Button from "../../components/common/Button/Button";

const Payment = () => {
  return (
    <div className="min-h-screen bg-white">

      <div className="mx-auto max-w-3xl px-6 py-12">

        <div className="text-center">

          <Icon
            icon="mdi:shield-check-outline"
            width="45"
            className="mx-auto"
          />

          <Typography
            sx={{
              mt: 2,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            Payment
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#777",
            }}
          >
            Enter your payment details securely.
          </Typography>

        </div>

        <div className="mt-10 rounded-lg border border-gray-200 p-8">

          <Typography
            sx={{
              mb: 5,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Card Details
          </Typography>

          <div className="space-y-5">

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
                label="CVV"
                placeholder="123"
              />

            </div>

            <InputField
              label="Card Holder Name"
              placeholder="Name on card"
            />

          </div>

          <div className="mt-8">
            <Button fullWidth>
              Pay Now
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Payment;