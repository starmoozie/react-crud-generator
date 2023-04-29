import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { Export as Icon } from "@icon";
import { DOWNLOAD as title } from "@constant";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { filterVisibilityColumns, removeArrayObjectContainsArray } from "@util";

const ExportButton = ({ row, visibilityColumns }) => {
  const location = useLocation();

  const handleClick = () => {
    // Filter only visible columns
    const visibility = filterVisibilityColumns(visibilityColumns);
    // Filter all row data contains the column above
    const dataToDownload = removeArrayObjectContainsArray(row, visibility);

    const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(
      workbook,
      `${location.pathname.replace("/", "")}_${dayjs().format(
        "D-MM-YYYY_H-mm"
      )}.xlsx`
    );
  };

  return (
    <Tooltip arrow title={title}>
      <IconButton onClick={handleClick}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default ExportButton;
