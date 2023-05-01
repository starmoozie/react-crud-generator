import { Tooltip, Chip } from "@mui/material";

const TooltipColumn = ({ title, value }) => {
  return (
    <Tooltip arrow title={title}>
      <Chip label={value} size="small" />
    </Tooltip>
  );
};

export default TooltipColumn;
