import React from "react";
import { Icon } from "@iconify/react";
import Button from "../../common/Button/Button";

/**
 * Reusable PriceSummary Component for BuyCommerce Application.
 * Located in: src/components/cart/PriceSummary/PriceSummary.jsx
 * 
 * Props:
 * @param {Object} summary - Summary data object { subtotal, discount, shipping, tax, taxRate, platformFee, handlingFee, serviceFee, total, itemsCount }
 * @param {number} subtotal - Fallback direct subtotal amount
 * @param {number} discount - Fallback direct discount amount
 * @param {number} shipping - Fallback direct shipping fee (0 = Free)
 * @param {number} tax - Fallback direct tax amount
 * @param {number} total - Fallback direct final total amount
 * @param {string} currency - Currency symbol (Default: '₹')
 * @param {string} title - Card header title (Default: 'Order Summary')
 * @param {boolean} showDiscount - Whether to display discount row (Default: true)
 * @param {boolean} showShipping - Whether to display shipping row (Default: true)
 * @param {boolean} showTax - Whether to display tax row (Default: true)
 * @param {boolean} showAdditionalCharges - Whether to display fees (Default: true)
 * @param {boolean} showActionButton - Whether to display the checkout/order button (Default: true)
 * @param {string} actionLabel - Action button label (Default: 'Proceed to Checkout')
 * @param {string} buttonText - Alias for actionLabel
 * @param {function} onAction - Action button click callback
 * @param {function} onCheckout - Alias for onAction callback
 * @param {boolean} loading - Loading state for action button
 * @param {boolean} disabled - Disabled state for action button
 * @param {string} className - Additional wrapper Tailwind CSS classes
 */
const PriceSummary = ({
  summary = {},
  subtotal,
  discount,
  shipping,
  tax,
  total,
  currency = "₹",
  title = "Order Summary",
  showDiscount = true,
  showShipping = true,
  showTax = true,
  showAdditionalCharges = true,
  showActionButton = true,
  actionLabel = "Proceed to Checkout",
  buttonText,
  onAction,
  onCheckout,
  loading = false,
  disabled = false,
  className = "",
  ...rest
}) => {
  // Extract and normalize values safely
  const rawSubtotal = summary.subtotal !== undefined ? summary.subtotal : (subtotal !== undefined ? subtotal : 0);
  const rawDiscount = summary.discount !== undefined ? summary.discount : (discount !== undefined ? discount : 0);
  const rawShipping = summary.shipping !== undefined ? summary.shipping : (shipping !== undefined ? shipping : 0);
  const rawTax = summary.tax !== undefined ? summary.tax : (tax !== undefined ? tax : 0);
  const platformFee = summary.platformFee !== undefined ? summary.platformFee : 0;
  const handlingFee = summary.handlingFee !== undefined ? summary.handlingFee : 0;
  const serviceFee = summary.serviceFee !== undefined ? summary.serviceFee : 0;
  const taxRate = summary.taxRate;
  const itemsCount = summary.itemsCount;

  // Safe number conversions
  const numSubtotal = Number(rawSubtotal) || 0;
  const numDiscount = Number(rawDiscount) || 0;
  const numShipping = Number(rawShipping) || 0;
  const numTax = Number(rawTax) || 0;
  const numPlatform = Number(platformFee) || 0;
  const numHandling = Number(handlingFee) || 0;
  const numService = Number(serviceFee) || 0;

  // Final total: use provided total or compute sum of parts
  const calculatedTotal = numSubtotal - numDiscount + numShipping + numTax + numPlatform + numHandling + numService;
  const rawTotal = summary.total !== undefined ? summary.total : (total !== undefined ? total : calculatedTotal);
  const finalTotal = Math.max(0, Number(rawTotal) || 0);

  // Button callback & label resolution
  const handleAction = onAction || onCheckout;
  const finalButtonLabel = buttonText || actionLabel;

  // Format currency helper
  const formatAmount = (val) => `${currency}${Number(val).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

  return (
    <div
      className={`w-full bg-white border border-neutral-200 rounded-lg p-5 sm:p-6 text-left shadow-xs transition-all ${className}`}
      {...rest}
    >
      {/* 1. Header Section */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <h3 className="text-base font-bold text-neutral-900 tracking-tight">
          {title}
        </h3>
        {itemsCount !== undefined && (
          <span className="text-xs text-neutral-500 font-medium">
            {itemsCount} {itemsCount === 1 ? "Item" : "Items"}
          </span>
        )}
      </div>

      {/* 2. Price Breakdown Rows */}
      <div className="py-4 space-y-3 text-sm text-neutral-600 border-b border-neutral-100">
        
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-neutral-600">Subtotal</span>
          <span className="font-semibold text-neutral-900">
            {formatAmount(numSubtotal)}
          </span>
        </div>

        {/* Discount (Deduction) */}
        {showDiscount && numDiscount > 0 && (
          <div className="flex justify-between items-center text-emerald-600">
            <span className="flex items-center gap-1">
              <span>Discount</span>
              {summary.couponCode && (
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                  {summary.couponCode}
                </span>
              )}
            </span>
            <span className="font-semibold">
              -{formatAmount(numDiscount)}
            </span>
          </div>
        )}

        {/* Shipping / Delivery */}
        {showShipping && (
          <div className="flex justify-between items-center">
            <span className="text-neutral-600">Shipping & Delivery</span>
            <span className={`font-semibold ${numShipping === 0 ? "text-emerald-600 font-bold" : "text-neutral-900"}`}>
              {numShipping === 0 ? "FREE" : formatAmount(numShipping)}
            </span>
          </div>
        )}

        {/* Tax */}
        {showTax && numTax > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-neutral-600">
              Estimated Tax {taxRate ? `(${taxRate}%)` : ""}
            </span>
            <span className="font-semibold text-neutral-900">
              {formatAmount(numTax)}
            </span>
          </div>
        )}

        {/* Optional Additional Charges */}
        {showAdditionalCharges && (
          <>
            {numPlatform > 0 && (
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span>Platform Fee</span>
                <span className="font-medium text-neutral-800">{formatAmount(numPlatform)}</span>
              </div>
            )}
            {numHandling > 0 && (
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span>Handling Fee</span>
                <span className="font-medium text-neutral-800">{formatAmount(numHandling)}</span>
              </div>
            )}
            {numService > 0 && (
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span>Service Fee</span>
                <span className="font-medium text-neutral-800">{formatAmount(numService)}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* 3. Grand Total Section */}
      <div className="pt-4 flex justify-between items-baseline">
        <div>
          <span className="text-base font-bold text-neutral-900 block">Total Payable</span>
          <span className="text-[11px] text-neutral-400">Inclusive of all taxes</span>
        </div>
        <span className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
          {formatAmount(finalTotal)}
        </span>
      </div>

      {/* 4. Optional Reusable Action Button */}
      {showActionButton && handleAction && (
        <div className="mt-5">
          <Button
            variant="primary"
            disabled={disabled}
            loading={loading}
            onClick={handleAction}
            className="w-full justify-center !py-3 text-sm font-bold tracking-wide uppercase"
          >
            {finalButtonLabel}
          </Button>

          {/* Secure Checkout Trust Badge */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 select-none">
            <Icon icon="mdi:shield-check-outline" className="w-4 h-4 text-emerald-600" />
            <span>100% Safe & Secure Checkout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSummary;
