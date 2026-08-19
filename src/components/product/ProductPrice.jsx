export default function ProductPrice({
  price,
  oldPrice,
  size = "normal",
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`font-semibold ${
          size === "large" ? "text-2xl" : "text-sm"
        }`}
      >
        ${price}
      </span>

      {oldPrice && (
        <span className="text-xs text-gray-400 line-through">
          ${oldPrice}
        </span>
      )}
    </div>
  );
}