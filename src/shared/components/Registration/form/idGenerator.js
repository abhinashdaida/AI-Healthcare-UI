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

    const cleanValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (!cleanValue) {

        return [];

    }

    const suggestions = new Set();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;

    while (suggestions.size < count && iterations < 50) {
        iterations++;
        let suffix = "";

        if (cleanValue.length < 6) {
            suffix = cleanValue;
            while (suffix.length < 6) {
                suffix += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        } else {
            // If length is 6 or more, truncate/base on first 4 or 5 characters
            // and append random characters to vary and maintain exactly 6 characters.
            const baseLength = Math.random() > 0.5 ? 4 : 5;
            suffix = cleanValue.substring(0, baseLength);
            while (suffix.length < 6) {
                suffix += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        }

        const fullId = `${prefix}-${suffix}`;
        if (isIdAvailable(fullId)) {
            suggestions.add(fullId);
        }
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

export const validateId = (id, prefix = "PAT") => {

    if (!id) {

        return "checking";

    }

    const plainId = id.replace(`${prefix}-`, "");

    // Check alphanumeric format
    const alphanumericRegex = /^[A-Za-z0-9]+$/;
    if (!alphanumericRegex.test(plainId)) {

        return "invalid-format";

    }

    // Check length format (min 6)
    if (plainId.length < 6) {

        return "invalid-length";

    }

    // Check availability
    return isIdAvailable(id)
        ? "success"
        : "exists";

};

// Export mock data (optional)

export { existingIds };