// Characters used to generate random IDs
// ==========================================

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Mock Existing IDs
// Replace this with an API call later

const existingIds = [
    "PAT-SSHKBP",
    "PAT-JLIK92",
    "PAT-ADMIN1",
    "PAT-TEST01",
];

// Generate One Random ID
// Example:
// PAT-YTHKCW

export const generateId = (prefix = "PAT") => {

    let id = "";

    for (let i = 0; i < 6; i++) {

        id += CHARACTERS.charAt(
            Math.floor(Math.random() * CHARACTERS.length)
        );

    }

    return `${prefix}-${id}`;
};

// Generate Multiple Unique IDs
// Default = 5

export const generateSuggestedIds = (
    prefix = "PAT",
    count = 5
) => {

    const ids = new Set();

    while (ids.size < count) {

        ids.add(generateId(prefix));

    }

    return [...ids];

};

// Generate Suggested IDs based on User Input Value

export const generateSuggestionsForValue = (value = "", prefix = "PAT", count = 5) => {

    if (!value) {

        return [];

    }

    const suggestions = new Set();

    // Suffix templates that will be appended to the typed value
    const templates = [
        `${prefix}-${value}001`,
        `${prefix}-${value}123`,
        `${prefix}-${value}_care`,
        `${prefix}-${value}health`,
        `${prefix}-${value}_connect`,
        `${prefix}-${value}_live`,
        `${prefix}-${value}pro`,
        `${prefix}-${value}_plus`,
        `${prefix}-${value}247`,
        `${prefix}-${value}clinic`,
        `${prefix}-${value}care`,
        `${prefix}-${value}app`,
        `${prefix}-${value}web`,
        `${prefix}-${value}corp`
    ];

    // Generate random 3-digit numbers to add variety
    const randomNum1 = Math.floor(100 + Math.random() * 900);
    const randomNum2 = Math.floor(100 + Math.random() * 900);
    
    templates.push(`${prefix}-${value}${randomNum1}`);
    templates.push(`${prefix}-${value}${randomNum2}`);

    // Shuffle templates using simple random sort
    const shuffled = [...templates].sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffled.length; i++) {

        if (suggestions.size >= count) {

            break;

        }

        suggestions.add(shuffled[i].toUpperCase());

    }

    return [...suggestions];

};

// Check if ID already exists
// Returns true / false

export const isIdAvailable = (id) => {

    return !existingIds.includes(id.toUpperCase());

};

// Validate ID and return status
// checking
// success
// error

export const validateId = (id) => {

    if (!id) {

        return "checking";

    }

    return isIdAvailable(id)
        ? "success"
        : "error";

};

// Export mock data (optional)

export { existingIds };