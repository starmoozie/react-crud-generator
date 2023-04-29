import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, Fragment, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { handleClientValidationMessage } from "@util";

const DELAY = 500;
const getUrl = (endpoint) => `${import.meta.env.VITE_API_URL}${endpoint}`;
const getFilter = (filter) => `filters=${JSON.stringify(filter || [])}`;

export default function SelectField(props) {
  const [cookies] = useCookies();
  const {
    control,
    errors,
    accessorKey,
    header,
    autoFocus,
    setValue,
    defaultValue,
    endpoint,
    attribute,
    primaryKey,
    parent,
    index,
  } = props;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValue(accessorKey, defaultValue || null);
  }, [defaultValue]);

  const fetchData = async (filter) => {
    const fetchData = await axios.request({
      url: `${getUrl(endpoint)}?${getFilter(filter)}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.profile?.token}`,
      },
    });

    setOptions(fetchData.data.data);
    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      fetchData();
    }, DELAY);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const debounced = useDebouncedCallback((value) => {
    const column = attribute.split("-");

    fetchData([{ id: column[0], value: value }]);
  }, DELAY);

  return (
    <Controller
      name={accessorKey}
      control={control}
      render={({ field: { onChange, value } }) => {
        const error = handleClientValidationMessage(
          accessorKey,
          header,
          index,
          parent,
          errors
        );

        return (
          <Autocomplete
            id={accessorKey}
            fullWidth
            open={open}
            onOpen={() => handleOpen()}
            onClose={() => handleClose()}
            isOptionEqualToValue={(option, value) =>
              !value ||
              value === undefined ||
              value === "" ||
              !Object.keys(value).length ||
              option[primaryKey] === value[primaryKey]
            }
            getOptionLabel={(option) => {
              const split = attribute.split("|");

              if (split.length > 1) {
                const a = split.map((property) => option[property]);

                return a.filter((n) => n).length ? a.join(" | ") : "";
              } else {
                return option[attribute] || "";
              }
            }}
            options={options}
            loading={loading}
            onChange={(event, item) => {
              onChange(item);
            }}
            value={value}
            renderOption={(props, option) => {
              const split = attribute.split("|");
              let data = "";

              if (split.length > 1) {
                const a = split.map((property) => option[property]);

                data = a.filter((n) => n).length ? a.join(" | ") : "";
              } else {
                data = option[attribute] || "";
              }

              return (
                <li {...props} key={option[primaryKey]}>
                  {data}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus={autoFocus ?? false}
                onChange={(event) => debounced(event.target.value)}
                margin="dense"
                id={accessorKey}
                label={header || accessorKey}
                fullWidth
                variant="standard"
                error={error.isError}
                helperText={error.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
}
