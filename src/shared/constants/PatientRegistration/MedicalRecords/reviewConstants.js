export const basicDetails = [
    {
        icon: "tabler:user",
        label: "Full Name",
        value: "Deepika K",
    },
    {
        icon: "tabler:calendar-due",
        label: "Date of Birth",
        value: "1 February 1980",
    },
    {
        icon: "tabler:gender-bigender",
        label: "Gender",
        value: "F",
    },
    {
        icon: "tabler:droplet",
        label: "Blood Group",
        value: "AB-ve",
    },
    {
        icon: "tabler:heart-handshake",
        label: "Marital Status",
        value: "Single",
    },
    {
        icon: "tabler:phone",
        label: "Phone Number",
        value: "+91 9876 543 210",
    },
];

export const locationDetails = [
    {
        icon: "tabler:map-pin",
        label: "Nationality",
        value: "India",
    },
    {
        icon: "tabler:map-pin",
        label: "State",
        value: "Hyderabad",
    },
    {
        icon: "tabler:map-pin",
        label: "City",
        value: "Jadcherala",
    },
];

export const emergencyDetails = [
    {
        icon: "tabler:user",
        label: "Emergency Contact Relationship",
        value: "Spouse",
    },
    {
        icon: "tabler:phone",
        label: "Emergency Contact Phone Number",
        value: "+91 992 223 4567",
    },
];

export const physicalDetails = [
    {
        icon: "tabler:ruler-measure-2",
        label: "Height",
        value: "182 cm",
    },
    {
        icon: "tabler:scale-outline",
        label: "Weight",
        value: "125 kg",
    },
];

export const healthDetails = [
    {
        icon: "tabler:heartbeat",
        label: "Blood Pressure",
        value: "120/80 mm/Hg",
    },
    {
        icon: "tabler:droplet",
        label: "Blood Sugar",
        value: "70/100 mg/dl",
    },
    {
        icon: "tabler:run",
        label: "Physical Activity Level",
        value: "Lightly Active",
    },
    {
        icon: "tabler:chef-hat",
        label: "Dietary Preference",
        value: "Non-Vegetarian",
    },
    {
        icon: "tabler:smoking",
        label: "Smoking Status",
        value: "Regular Smoker",
    },
    {
        icon: "tabler:glass-full",
        label: "Alcohol Consumption",
        value: "Weekly",
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

