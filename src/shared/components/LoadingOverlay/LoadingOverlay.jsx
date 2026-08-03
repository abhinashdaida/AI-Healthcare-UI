import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingOverlay = ({
  loading = false,
  tokenError = false,
  message = "Loading...",
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenError) {
      // Clear auth/session data
      localStorage.removeItem("token");
      sessionStorage.clear();

      // Redirect to logged out page
      navigate("/loggedout");
    }
  }, [tokenError, navigate]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4 min-w-[250px]">
        
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Message */}
        <p className="text-gray-700 font-medium text-lg">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;