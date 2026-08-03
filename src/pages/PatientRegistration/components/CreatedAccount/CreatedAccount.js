import React, { useState } from "react";
import logo from "../../../../assets/assets/logo.svg";
import SuccessIcon from "@/assets/patientRegistration/SuccessFull.svg";
import { Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatedAccount = () => {

  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const patientInfo =
    JSON.parse(localStorage.getItem("patientInformation")) || {};

  const reviewData = patientInfo.reviewComplete || {};

  const uniqueId = (reviewData.uniqueId || "PAT7N6S93").replace(/[^A-Za-z0-9]/g, "");
  const email =
    reviewData.email || patientInfo.personalInformation?.email || "--";

  const handleCopy = () => {
    navigator.clipboard.writeText(uniqueId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const idPrefix = uniqueId.slice(0, 3);
  const idDigits = uniqueId.slice(3).split("");

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center py-4 px-4">
      {/* Logo + Title — aligned to card's left edge */}
      <div className="w-full max-w-124 flex justify-start mb-2">
        <div className="w-39.5 h-11 flex items-center gap-1 pr-px">
          <img
            src={logo}
            alt="MediConnect"
            className="w-11 h-11 object-contain shrink-0"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-[15px] font-semibold leading-none text-[#096B58]">
              MediConnect
            </h1>
            <p className="text-[9px] font-normal leading-3 text-[#666666] mt-0.5">
              Healthcare Ecosystem
            </p>
          </div>
        </div>
      </div>

      {/* Card — reduced height, no leftover bottom space */}
      <div className="w-full max-w-124 bg-white rounded-3xl border-[0.5px] border-[#EBEBEB] p-6 sm:p-12 flex flex-col items-center shadow-sm box-border">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Success block */}
          <div className="flex flex-col items-center gap-6 w-full max-w-100">
            <img src={SuccessIcon} alt="" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />

            <div className="flex flex-col items-center gap-2 w-full max-w-100">
              <h2 className="text-[16px] sm:text-[18px] font-semibold text-center leading-[100%] text-[#141414]">
                Account Created
                <br />
                Successfully!
              </h2>
              <p className="w-full max-w-69.5 text-[10px] font-normal text-center leading-3.5 text-[#666666]">
                Your patient account has been created successfully. You can
                now access your healthcare dashboard and manage your records
                securely.
              </p>
            </div>

            {/* Unique ID */}
            <div className="flex flex-col gap-2 w-full max-w-78.5 items-center">
              <label className="w-full text-xs font-medium text-[#202020]">
                Unique ID
              </label>

              <div className="flex items-center w-full max-w-60.5 h-14 rounded-lg border-[0.5px] border-[#D0D0D0] overflow-hidden">
                <div className="flex items-center justify-center h-full px-3 border-r border-[#D0D0D0]">
                  <span className="text-sm font-bold text-[#141414]">
                    {idPrefix}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
                  {idDigits.map((char, i) => (
                    <span
                      key={i}
                      className="text-sm font-semibold text-[#096B58]"
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="ml-auto mr-3 text-[#666666] hover:text-[#096B58] transition-colors"
                  aria-label="Copy unique ID"
                >
                  {copied ? (
                    <Check size={16} className="text-[#096B58]" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              <p className="w-full max-w-78.5 text-xs font-normal text-center text-[#666666]">
                Your unique ID has also been sent to
                <br />
                <span className="font-medium text-[#141414] break-all">{email}</span>
              </p>
            </div>
          </div>

          {/* Note */}
          <div className="w-full max-w-100 rounded-lg border-[0.5px] border-[#D0D0D0] bg-[#FBFBFB] px-4 py-3 flex flex-col gap-2">
            <span className="text-[10px] font-medium leading-[100%] text-[#343434]">
              Note
            </span>
            <p className="text-[10px] font-normal leading-4 text-[#666666]">
              Use this ID or your registered phone number to securely access
              your healthcare workspace.
            </p>
          </div>

          {/* Buttons — last element, card ends right after */}
          <div className="w-full max-w-100 h-auto flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-48 h-12 rounded-lg px-6 bg-[#EEF4F3] text-[#096B58] text-[14px] font-medium cursor-pointer"
              onClick={() => navigate("/patient-registration")}
            >
              View Profile
            </button>
            <button
            onClick={() => navigate("/")}
             className="w-full sm:w-48 h-12 rounded-lg px-6 bg-[#096B58] text-white text-[14px] font-medium shadow-[0px_1px_1px_0px_#096B583D,0px_2px_2px_0px_#096B5812,0px_4px_4px_0px_#096B5812,0px_8px_8px_0px_#096B5812]">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedAccount;