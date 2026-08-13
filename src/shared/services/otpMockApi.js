import axios from "axios";

const TEMPORARY_VALID_OTP = "123456";

// Intercept axios requests to simulate a backend OTP validation endpoint
axios.interceptors.request.use((config) => {
  if (config.url === "/api/verify-otp") {
    config.adapter = () => {
      return Promise.resolve({
        data: { validOtp: TEMPORARY_VALID_OTP },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    };
  }
  return config;
});
