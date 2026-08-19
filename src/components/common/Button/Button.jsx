import React from "react";

/**
 * Reusable Button Component for BuyCommerce Application.
 * Located in: src/components/common/Button/Button.jsx
 * 
 * Props:
 * @param {React.ReactNode} children - Button label text / content (e.g. 'Sign In', 'Add to Cart', 'Buy Now')
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost' (Default: 'primary')
 * @param {string} size - 'small' | 'medium' | 'large' (Default: 'medium')
 * @param {string} type - 'button' | 'submit' | 'reset' (Default: 'button')
 * @param {function} onClick - Click handler function
 * @param {boolean} disabled - Disables button interactions
 * @param {boolean} loading - Displays loading spinner and disables clicks
 * @param {React.ReactNode} icon - Optional icon element (Iconify)
 * @param {string} iconPosition - 'left' | 'right' (Default: 'left')
 * @param {string} className - Additional Tailwind CSS classes
 */
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "left",
  className = "",
  ...rest
}) => {
  // Base button styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 select-none outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  // Variant color mappings (Tailwind CSS)
  const variantStyles = {
    primary:
      "bg-black text-white hover:bg-neutral-800 focus:ring-black shadow-xs",
    secondary:
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-400 border border-neutral-200",
    outline:
      "bg-transparent text-neutral-900 hover:bg-neutral-50 border border-neutral-300 focus:ring-neutral-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-xs",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-xs",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-black focus:ring-neutral-300"
  };

  // Size padding and font mappings (Tailwind CSS)
  const sizeStyles = {
    small: "px-3 py-1.5 text-xs gap-1.5 h-8",
    medium: "px-4 py-2 text-sm gap-2 h-10",
    large: "px-6 py-3 text-base gap-2.5 h-12"
  };

  const isButtonDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.medium}
        ${className}
      `}
      {...rest}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Left Icon (Only when not loading) */}
      {!loading && icon && iconPosition === "left" && (
        <span className="shrink-0 flex items-center">{icon}</span>
      )}

      {/* Button Content */}
      <span>{children}</span>

      {/* Right Icon (Only when not loading) */}
      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0 flex items-center">{icon}</span>
      )}
    </button>
  );
};

export default Button;
