//Date Picker Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

const DateFilter = ({ setFilterValue, name, label, minDate, maxDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        minDate={minDate !== undefined ? dayjs(minDate) : ""}
        maxDate={maxDate !== undefined ? dayjs(maxDate) : dayjs()}
        closeOnSelect
        onChange={(newValue) =>
          setFilterValue({ name: name, value: newValue || "" })
        }
        slotProps={{
          textField: {
            helperText: label || name,
            sx: { minWidth: "120px" },
            variant: "standard",
            name: name,
          },
          actionBar: {
            actions: ["clear"],
          },
        }}
        format="YYYY-MM-DD"
      />
    </LocalizationProvider>
  );
};

export default DateFilter;
