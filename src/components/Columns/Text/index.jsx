import React from "react";
import { Typography } from "@mui/material";

const TextColumn = ({ value }) => {
  return (
    <Typography variant="body2" gutterBottom>
      {value}
    </Typography>
  );
};

export default TextColumn;
