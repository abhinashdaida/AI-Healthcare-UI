import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import FormHeader from "@/shared/components/Patient/layout/FormHeader";
import SiderBar from "../components/SiderBar/SiderBar";
import Footer from "@/shared/components/Patient/layout/Footer";
import CustomLabel from "@/shared/components/Patient/Common/CustomLabel";
import CustomTextField from "@/shared/components/Patient/Common/CustomTextField";
import CustomSelect from "@/shared/components/Patient/Common/CustomSelect";
import { Typography } from "@mui/material";

const EmergencyContact=()=>{
    const navigate = useNavigate();

    // ==========================
    // Event Handlers
    // ==========================

    const handleContinue = () => {
      console.log("Upload & Continue");
      navigate("/health-overview");
    };


    const handleAutoSave = () => {
      console.log("Auto Save");
    };

    // ==========================
    // Footer Configuration
    // ==========================

    const footerConfig = useMemo(
      () => ({
        showAutoSave: true,
        showSkipButton: false,

        primaryButtonLabel: "Upload & Continue",
        primaryButtonDisabled: false,

        onPrimaryClick: handleContinue,
        onAutoSaveClick: handleAutoSave,
      }),
      [],
    );

    return (
      <div className="min-h-screen bg-[#F5F7F8] flex justify-center p-3">
        <div className="w-full max-w-[1400px] bg-white rounded-lg overflow-hidden shadow-sm flex min-h-screen">
          {/* Sidebar */}
          <SiderBar />

          {/* Right Content */}
          <main className="flex flex-1 flex-col">
            {/* Header */}
            <FormHeader
              title="Personal Information"
              subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
            />

            {/* Main Body */}
            <section className="flex-1 overflow-y-auto p-8">
              {/* Your Page Components */}
              <Typography>this is a EmergencyContact page</Typography>
            </section>

            {/* Footer */}
            <Footer config={footerConfig} />
          </main>
        </div>
      </div>
    );
};
export default EmergencyContact;