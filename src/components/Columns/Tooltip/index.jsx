import { Tooltip, Chip } from "@mui/material";

const TooltipColumn = ({ title, value, color }) => {
  return (
    <Tooltip arrow title={title}>
      <Chip label={value} size="small" color={color || "default"} />
    </Tooltip>
  );
};

export default TooltipColumn;
