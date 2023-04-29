import React, { useEffect, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@field/Text";
import * as Icon from "@icon";

const RepeatableField = (props) => {
  const { children, append, remove, row, control, errors, setValue, field } =
    props;

  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(!children.length ? errors?.[field.accessorKey]?.message : "");
  }, [children, errors]);

  const newAppend = useMemo(
    () =>
      field.children
        .map((child) => ({ [child.accessorKey]: "" }))
        .reduce((acc, key) => ({ ...acc, ...key }), {}),
    []
  );

  return (
    <Box>
      <Grid sx={{ marginBottom: 2, marginTop: 2 }}>
        <Typography gutterBottom>{field.header}</Typography>
        {message ? (
          <Typography variant="caption" sx={{ color: "red" }} gutterBottom>
            {message}
          </Typography>
        ) : (
          <></>
        )}
      </Grid>

      {children.map((parent, key) => {
        return (
          <Box
            sx={{ p: 2, border: "1px dashed grey", mb: 2 }}
            key={`${parent.id}_${key}`}
          >
            <Grid container spacing={2}>
              {field.children.map((child, index) => {
                const { accessorKey, Cell, header, attributes } = child;
                const size = attributes
                  ? attributes
                  : { xs: 12, sm: 12, md: 12 };
                const defaultValue = row ? row[child.accessorKey] : "";
                const Component = Cell ? Cell : TextField;

                return (
                  <Grid item {...size} key={accessorKey}>
                    <Component
                      parent={field.accessorKey}
                      index={key}
                      field={child}
                      row={row}
                      autoFocus={!index}
                      accessorKey={`${field.accessorKey}[${key}].${accessorKey}`}
                      header={header}
                      defaultValue={defaultValue}
                      control={control}
                      errors={errors}
                      setValue={setValue}
                    />
                  </Grid>
                );
              })}
              <Grid item sm={12} xs={12}>
                <Button
                  fullWidth={true}
                  variant="outlined"
                  startIcon={<Icon.Delete />}
                  onClick={() => remove(key)}
                  color="error"
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      })}

      <Grid sx={{ marginTop: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Icon.Create />}
          onClick={() => append(newAppend)}
        >
          Add
        </Button>
      </Grid>
    </Box>
  );
};

export default RepeatableField;
