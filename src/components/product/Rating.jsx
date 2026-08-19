import { Rating as MuiRating } from "@mui/material";

export default function Rating({ value = 0, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <MuiRating
        value={value}
        precision={0.5}
        readOnly
        size="small"
      />

      {reviews && (
        <span className="text-xs text-gray-500">
          ({reviews})
        </span>
      )}
    </div>
  );
}