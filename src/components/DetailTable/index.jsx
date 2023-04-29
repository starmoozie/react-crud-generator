import { DataGrid } from "@mui/x-data-grid";

export const DetailTable = ({ row, columns }) => (
  <DataGrid
    rows={row}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[10, 20]}
    getRowId={() => (Math.random() + 1).toString(36).substring(7)}
    disableColumnFilter
    disableColumnMenu
    disableSelectionOnClick
    isRowSelectable={() => false}
    disableColumnSelector
    hideFooter
    density="compact"
  />
);

export default DetailTable;
