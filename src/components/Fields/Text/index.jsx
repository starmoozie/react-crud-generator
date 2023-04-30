import { TextField as Text } from "@mui/material";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { handleClientValidationMessage } from "@util";

export const TextField = ({
  autoFocus,
  accessorKey,
  header,
  defaultValue,
  control,
  errors,
  setValue,
  parent,
  index,
  type,
}) => {
  useEffect(() => {
    setValue(accessorKey, defaultValue);
  }, [defaultValue]);

  return (
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
          <Text
            {...field}
            type={type || "text"}
            margin="dense"
            variant="standard"
            value={field.value || ""}
            autoFocus={autoFocus}
            id={accessorKey}
            label={header}
            fullWidth
            error={error.isError}
            helperText={error.message}
          />
        );
      }}
    />
  );
};

export default TextField;
