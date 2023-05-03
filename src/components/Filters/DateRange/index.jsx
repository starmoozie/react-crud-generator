import DateFilter from "@filter/Date";
import dayjs from "dayjs";
import { useState } from "react";
import { Box } from "@mui/material";

const DateRangeFilter = ({ setFilterValue }) => {
  const [filter, setFilter] = useState({
    min: "",
    max: "",
  });

  const handleChange = (data) => {
    const value = data.value ? dayjs(data.value).format("YYYY-MM-DD") : "";
    const filterDate = {
      min: data.name === "min" ? value : filter.min,
      max: data.name === "max" ? value : filter.max,
    };
    setFilter({ ...filter, ...filterDate });

    if (filterDate.min && filterDate.max) {
      setFilterValue(filterDate);
    }
    if (!filterDate.min && !filterDate.max) {
      setFilterValue();
    }
  };

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: "1rem" }}>
      <DateFilter
        maxDate={filter.maxDate}
        name="min"
        setFilterValue={(e) => handleChange(e)}
        label={`Min Date`}
      />
      <DateFilter
        minDate={filter.min}
        name="max"
        setFilterValue={(e) => handleChange(e)}
        label={`Max Date`}
      />
    </Box>
  );
};

export default DateRangeFilter;
