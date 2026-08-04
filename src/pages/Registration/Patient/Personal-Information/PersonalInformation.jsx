import React from "react";
import FormHeader from "../components/layout/FormHeader";
import SiderBar from "../components/layout/SiderBar";
import Footer from "../components/layout/Footer";

const PersonalInformation = () => {
  const handleSave = () => {
    console.log("done");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-3">
      <div className="w-full max-w-350 bg-white flex min-h-172.5">

        {/* Sidebar */}
        <SiderBar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">

          {/* Header */}
          <FormHeader 
          title="Personal Information"
          subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
        />

          {/* Main Body */}
          <div className="flex-1">
            {/* Your form content will come here */}
          </div>

          {/* Footer */}
          <Footer onSave={handleSave} />

        </main>
      </div>
    </div>
  );
};

export default PersonalInformation;
