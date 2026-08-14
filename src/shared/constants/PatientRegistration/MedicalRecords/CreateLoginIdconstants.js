
// Create Login ID - Page Content

export const pageContent = {
    pageTitle: "Create Login ID",

    pageSubtitle:
        "Create your login credentials to securely access your healthcare account.",

    title: "Create Your MediConnect ID",

    subtitle:
        "Choose a unique ID that you'll use to sign in to your account.",

    inputLabel: "MediConnect ID",

    suggestionTitle: "Suggested IDs",

    suggestionSubtitle: "Tap on any ID to use it",

    generateButton: "Generate more",

    infoTitle: "Important to know",

    infoDescription:
        "Your MediConnect ID is unique and cannot be changed after your account is created. You can use your registered phone number or this ID to sign in.",
};


// MediConnect ID

export const idPrefix = "PAT";

// Status Messages

export const statusMessages = {
    checking: "Checking availability...",

    available: "Great choice! This ID is available and ready to use for your account.",

    exists: "This ID is already in use. Try another ID or choose one of the suggestions below.",
};


export const STATUS = {
  success: {
    border: "border-[#2BA39A]",
    bg: "bg-[#2BA39A]",
    text: "text-white",
  },
  error: {
    border: "border-[#EF4444]",
    bg: "bg-[#EF4444]",
    text: "text-white",
  },
  default: {
    border: "border-[#D1D5DB]",
    bg: "bg-[#E5E7EB]",
    text: "text-[#374151]",
  },
};

export const STATUS_CONFIG = {
    checking: {
      text: statusMessages.checking,
      color: "text-[#6B7280]",
      icon: "svg-spinners:90-ring-with-bg",
      iconColor: "text-[#9CA3AF]",
      size: 18,
    },
    success: {
      text: statusMessages.available,
      color: "text-[#2BA39A]",
      icon: "tabler:circle-check-filled",
      iconColor: "text-[#2BA39A]",
      size: 20,
    },
    exists: {
      text: statusMessages.exists,
      color: "text-[#EF4444]",
      icon: "tabler:circle-x-filled",
      iconColor: "text-[#EF4444]",
      size: 20,
    },
    "invalid-length": {
      text: "MediConnect ID must contain at least 6 characters.",
      color: "text-[#EF4444]",
      icon: "tabler:circle-x-filled",
      iconColor: "text-[#EF4444]",
      size: 20,
    },
    "invalid-format": {
      text: "Only letters and numbers are allowed.",
      color: "text-[#EF4444]",
      icon: "tabler:circle-x-filled",
      iconColor: "text-[#EF4444]",
      size: 20,
    },
  };


