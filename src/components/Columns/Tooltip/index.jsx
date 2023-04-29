import { Tooltip, Typography, Button } from "@mui/material";

const TooltipColumn = ({ title, value }) => {
  return (
    <Tooltip arrow title={title}>
      <Typography>
        <Button>{value}</Button>
      </Typography>
    </Tooltip>
  );
};

export default TooltipColumn;
