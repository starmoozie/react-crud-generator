import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import { handleClientValidationMessage } from "@util";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const CheckboxField = ({
  autoFocus,
  accessorKey,
  header,
  defaultValue,
  control,
  errors,
  setValue,
  parent,
  index,
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
          <>
            <FormControlLabel
              control={<Checkbox {...field} {...label} autoFocus={autoFocus} />}
              label={header}
            />
            {error.isError ? (
              <FormHelperText error={error.isError}>
                {error.message}
              </FormHelperText>
            ) : (
              <></>
            )}
          </>
        );
      }}
    />
  );
};

export default CheckboxField;
