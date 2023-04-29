import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { handleClientValidationMessage } from "@util";

export default function DateField({
  autoFocus,
  accessorKey,
  header,
  defaultValue,
  control,
  errors,
  setValue,
  parent,
  index,
}) {
  useEffect(() => {
    setValue(accessorKey, defaultValue);
  }, [defaultValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={accessorKey}
        control={control}
        render={({ field }) => {
          const error = handleClientValidationMessage(
            accessorKey,
            header,
            index,
            parent,
            errors
          );

          return (
            <MobileDatePicker
              {...field}
              value={dayjs(field.value)}
              closeOnSelect
              autoFocus={autoFocus ?? false}
              id={accessorKey}
              label={header || accessorKey}
              format="YYYY-MM-DD"
              slotProps={{
                textField: {
                  variant: "standard",
                  fullWidth: true,
                  margin: "dense",
                  error: error.isError,
                  helperText: error.message,
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
}
