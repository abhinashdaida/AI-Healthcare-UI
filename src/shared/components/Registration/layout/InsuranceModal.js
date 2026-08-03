import React from "react";
import CardFront from "../../../../assets/patientRegistration/images/Cardfront.png";
import CardBack from "../../../../assets/patientRegistration/images/Cardback.png";
import { Icon } from "@iconify/react";
const InsuranceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="insurance-modal bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon
            icon="material-symbols-light:close-rounded"
            width="24"
            height="24"
            color="#374151"
          />
        </button>

        <div className="p-8">
          {/* Header */}
          <h2 className="text-[26px] font-bold leading-tight">
            Insurance Information
          </h2>
          <p className="insurance-modal-subtitle mt-3 text-[15px] leading-relaxed">
            Providing insurance information helps us verify your coverage, speed
            up claim processing, and provide a smoother healthcare experience
            for you.
          </p>

          {/* Insurance Card Previews */}
          <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
            {/* Front Side Card */}
            <div className="space-y-2">
              <img
                src={CardFront}
                alt="Card front"
                className="w-full rounded-lg"
              />
              <p className="insurance-modal-caption text-center text-[12px] font-medium">
                Front side
              </p>
            </div>

            {/* Back Side Card */}
            <div className="space-y-2">
              <img
                src={CardBack}
                alt="Card back"
                className="w-full rounded-lg"
              />
              <p className="insurance-modal-caption text-center text-[12px] font-medium">
                Backside
              </p>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-[#F2F2F2] rounded-xl p-4 flex items-start gap-3 border border-gray-100">
            <Icon
              icon="charm:shield-tick"
              width="24"
              height="24"
              className="text-[#0B1117] mt-0.5 shrink-0"
              size={18}
            />
            <p className="insurance-modal-note text-[13px] leading-snug">
              Your information remains private, encrypted, and accessible only
              for authorized healthcare purposes.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full mt-8 bg-[#248B8F] hover:bg-[#257a7a] text-white font-medium py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-teal-900/10"
          >
            Ok, I understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceModal;
