export const getStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9!@#$%^&*]/.test(password)) score++;

        if (score <= 2)
            return { value: 25, label: "Poor", color: "#EF4444" };
        if (score === 3)
            return { value: 50, label: "Moderate", color: "#F59E0B" };
        return { value: 100, label: "Great", color: "#248B8F" };
    };

// PasswordConstants.js

export const passwordRules = (password) => [
  {
    text: "At least 8 Characters",
    ok: password.length >= 8,
  },
  {
    text: "At least one small letter",
    ok: /[a-z]/.test(password),
  },
  {
    text: "At least one capital letter",
    ok: /[A-Z]/.test(password),
  },
  {
    text: "At least one number or symbol",
    ok: /[0-9!@#$%^&*]/.test(password),
  },
];