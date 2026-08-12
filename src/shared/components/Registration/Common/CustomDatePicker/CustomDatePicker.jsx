import React from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import { InputAdornment, TextField } from "@mui/material";
import { Icon } from "@iconify/react";

import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

const CustomDatePicker = ({
  name,
  placeholder = "Select date",
  sx,
  startIcon,
  endIcon,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const { setValue, setTouched } = helpers;

  const selectedDate = field.value ? new Date(field.value) : null;

  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        placeholderText={placeholder}
        onChange={(date) => {
          if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            const formattedDate = `${year}-${month}-${day}`;

            setValue(formattedDate);
          } else {
            setValue("");
          }
        }}
        onBlur={() => setTouched(true)}
        wrapperClassName="w-full"
        calendarClassName="custom-datepicker"
        {...props}
        customInput={
          <TextField
            fullWidth
            placeholder={placeholder}
            size="small"
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            slotProps={{
              input: {
                startAdornment: startIcon ? (
                  <InputAdornment position="start">
                    <Icon icon={startIcon} width={24} height={24} />
                  </InputAdornment>
                ) : undefined,

                endAdornment: endIcon ? (
                  <InputAdornment position="end">
                    <Icon icon={endIcon} width={24} height={24} />
                  </InputAdornment>
                ) : undefined,
              },
            }}
            sx={{
              width: "100%",

              "& .MuiOutlinedInput-root": {
                width: "100%",
                height: "56px",
                borderRadius: "10px",
                backgroundColor: "#fff",
              },

              ...sx,
            }}
          />
        }
      />
    </div>
  );
};

export default CustomDatePicker;
