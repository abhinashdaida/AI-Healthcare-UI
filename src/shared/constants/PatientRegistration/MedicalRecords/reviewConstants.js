export const getbasicDetails =(basicdetails)=> [
    {
        icon: "tabler:user",
        label: "Full Name",
        value: basicdetails?.firstName||"None",
    },
    {
        icon: "tabler:calendar-due",
        label: "Date of Birth",
        value: basicdetails?.dateOfBirth||"None",
    },
    {
        icon: "tabler:gender-bigender",
        label: "Gender",
        value: basicdetails?.gender || "None",
    },
    {
        icon: "tabler:droplet",
        label: "Blood Group",
        value: basicdetails?.bloodGroup||"None",
    },
    {
        icon: "tabler:heart-handshake",
        label: "Marital Status",
        value: basicdetails?.maritalStatus||"None",
    },
    {
        icon: "tabler:phone",
        label: "Phone Number",
        value: basicdetails?.phoneNumber||"None",
    },
];

export const getlocationDetails = (emergency)=> [
    {
        icon: "tabler:map-pin",
        label: "Nationality",
        value: emergency?.nationality||"None",
    },
    {
        icon: "tabler:map-pin",
        label: "State",
        value: emergency?.State||"None",
    },
    {
        icon: "tabler:map-pin",
        label: "City",
        value: emergency?.City||"None",
    },
];

export const getemergencyDetails = (emergency)=>[
    {
        icon: "tabler:user",
        label: "Emergency Contact Relationship",
        value: emergency?.relationship||"None",
    },
    {
        icon: "tabler:phone",
        label: "Emergency Contact Phone Number",
        value: emergency?.emergencyContactNumber||"None",
    },
];

export const getphysicalDetails = (physical)=>[
    {
        icon: "tabler:ruler-measure-2",
        label: "Height",
        value: physical?.height||"None",
    },
    {
        icon: "tabler:scale-outline",
        label: "Weight",
        value: physical?.weight||"None",
    },
];

export const gethealthDetails =(health)=> [
    {
        icon: "tabler:heartbeat",
        label: "Blood Pressure",
        value: health?.bloodPressure||"None",
    },
    {
        icon: "tabler:droplet",
        label: "Blood Sugar",
        value: health?.bloodSugar||"None",
    },
    {
        icon: "tabler:run",
        label: "Physical Activity Level",
        value: health?.physicalActivityLevel||"None",
    },
    {
        icon: "tabler:chef-hat",
        label: "Dietary Preference",
        value: health?.dietaryPreference||"None",
    },
    {
        icon: "tabler:smoking",
        label: "Smoking Status",
        value: health?.smokingStatus||"None",
    },
    {
        icon: "tabler:glass-full",
        label: "Alcohol Consumption",
        value: health?.alcoholConsumption||"None",
    },
];

export const getMedicalDetails = (medical) => [
    {
        icon: "tabler:virus",
        label: "Allergies",
        value: medical?.allergies?.join(", ") || "None",
    },
    {
        icon: "tabler:stethoscope",
        label: "Existing Conditions",
        value: medical?.conditions?.join(", ") || "None",
    },
    {
        icon: "tabler:first-aid-kit",
        label: "Previous Surgeries",
        value: medical?.surgeries?.join(", ") || "None",
    },
    {
        icon: "tabler:pill",
        label: "Current Medications",
        value: medical?.medications?.join(", ") || "None",
    },
];



export const getinsuranceDetails =(insurance)=>[
    {
        icon:"tabler:building-bank",
        label:"Insurance Type",
        value: insurance?.insuranceType || "None",
    },
    {
        icon:"tabler:shield-plus",
        label:"Insurance Provider",
        value: insurance?.schemeProvider || "None",
    },
    {
        icon:"tabler:user",
        label:"Insurance Holder name",
        value:insurance?.holderName || "None",
    },
    {
        icon:"tabler:credit-card",
        label:"Customer ID / Policy Number",
        value: insurance?.customerId || "None",
    },

]

