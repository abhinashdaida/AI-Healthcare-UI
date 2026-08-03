import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";

import {
  setActiveStep,
  setMedicalHistory,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

import { selectMedicalHistory } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

const MAX_LENGTH = 500;

const allergyOptions = [
  "Peanuts",
  "Dust",
  "Penicillin",
  "Seafood",
  "Eggs",
  "Pet Dander",
];

const conditionOptions = ["Diabetes", "Hypertension", "Asthma"];

const defaultMedicalHistory = {
  allergies: "",
  allergyTags: [],
  currentMedications: "",
  existingConditions: "",
  conditionTags: [],
  previousSurgeries: "",
};

const normalizeMedicalHistory = (saved) => ({
  ...defaultMedicalHistory,
  ...(saved || {}),
  allergyTags: Array.isArray(saved?.allergyTags) ? saved.allergyTags : [],
  conditionTags: Array.isArray(saved?.conditionTags) ? saved.conditionTags : [],
});

const MedicalHistory = () => {
  const dispatch = useDispatch();
  const savedMedicalHistory = useSelector(selectMedicalHistory);

  const [formData, setFormData] = useState(() =>
    normalizeMedicalHistory(savedMedicalHistory)
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const toggleTag = (fieldName, tag) => {
    setFormData((previousData) => {
      const currentTags = previousData[fieldName] || [];
      const alreadySelected = currentTags.includes(tag);

      return {
        ...previousData,
        [fieldName]: alreadySelected
          ? currentTags.filter((item) => item !== tag)
          : [...currentTags, tag],
      };
    });
  };

  const saveMedicalHistory = () => {
    dispatch(setMedicalHistory(formData));
  };

  const handleNext = () => {
    saveMedicalHistory();
    dispatch(setActiveStep("insurance"));
  };

  const handleBack = () => {
    saveMedicalHistory();
    dispatch(setActiveStep("additional"));
  };

  const handleSkip = () => {
    dispatch(setActiveStep("insurance"));
  };

  const labelClass = "block mb-2 text-[12px] font-normal text-[#202020]";

  const renderChip = (fieldName, tag) => {
    const selected = formData[fieldName]?.includes(tag);

    return (
      <button
        key={tag}
        type="button"
        onClick={() => toggleTag(fieldName, tag)}
        className={`inline-flex h-8 items-center gap-2 rounded-full border px-4 text-[11px] font-normal transition-colors ${
          selected
            ? "border-[#D0D0D0] bg-[#F7F7F7] text-[#202020]"
            : "border-[#E6E6E6] bg-white text-[#666666] hover:border-[#096B58]"
        }`}
      >
        {tag}
        {selected && <X size={12} strokeWidth={1.8} />}
      </button>
    );
  };

  const renderTextAreaWithCounter = ({
    label,
    name,
    placeholder,
    children,
    minHeight = "min-h-[120px]",
  }) => (
    <div>
      <label className={labelClass}>{label}</label>

      <div className="relative rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 focus-within:border-[#096B58] transition-colors duration-150">
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={MAX_LENGTH}
          rows={4}
          className={`w-full ${minHeight} resize-none border-none bg-transparent p-0 pr-2 text-xs font-normal text-[#141414] outline-none placeholder:text-[#666666]`}
        />

        {children && <div className="mt-3 flex flex-wrap gap-2">{children}</div>}

        <span className="absolute right-4 bottom-3 text-[10px] font-normal text-[#666666]">
          {formData[name]?.length || 0}/{MAX_LENGTH} Characters left
        </span>
      </div>
    </div>
  );

  return (
    <div className="px-7 md:px-10 mt-6 md:mt-12 pb-8">
      <div className="max-w-[880px] space-y-8">
        {renderTextAreaWithCounter({
          label: "Allergies",
          name: "allergies",
          placeholder: "I should diet with these much allergies",
          minHeight: "min-h-[80px]",
          children: allergyOptions.map((tag) => renderChip("allergyTags", tag)),
        })}

        {renderTextAreaWithCounter({
          label: "Current Medications",
          name: "currentMedications",
          placeholder: "List your current medications with dosage",
        })}

        {renderTextAreaWithCounter({
          label: "Existing Conditions",
          name: "existingConditions",
          placeholder:
            "Enter any Conditions (e.g., diabetes, hypertension, asthma, etc.)",
          minHeight: "min-h-[80px]",
          children: conditionOptions.map((tag) =>
            renderChip("conditionTags", tag)
          ),
        })}

        {renderTextAreaWithCounter({
          label: "Previous Surgeries",
          name: "previousSurgeries",
          placeholder: "Enter details of any past surgeries (if any)",
        })}
      </div>

      <div className="mt-16 md:mt-24 flex items-center justify-between pb-10 md:pb-0">
        <ActionButtons
          skip={{
            label: "Skip for now",
            onClick: handleSkip,
          }}
          back={{
            label: "Go Back",
            onClick: handleBack,
          }}
          next={{
            label: "Add Insurance Information",
            onClick: handleNext,
          }}
        />
      </div>
    </div>
  );
};

export default MedicalHistory;