import { useMemo, useState } from "react";
import MaterialReactTable, {
  MRT_ShowHideColumnsButton,
} from "material-react-table";
import { Typography, Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Modal from "@modal";
import CreateButton from "@button/Create";
import LineButton from "@button/Line";
import TopButton from "@button/Top";
import { useSelector } from "react-redux";
import { TOP_LEFT, TOP_RIGHT, LINE } from "@constant";
import { setFetchUrl, fetchApi } from "@util";
import { useCookies } from "react-cookie";

const Datatable = ({
  title,
  columns,
  details,
  createFields,
  editFields,
  createValidation,
  editValidation,
  BottomToolbar,
  imports,
  exports,
}) => {
  const location = useLocation();
  const [cookies] = useCookies();

  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const activePrivateMenu = useSelector(
    (state) => state.sidebarReducer.activePrivateMenu
  );

  const permissions = useMemo(() => activePrivateMenu.permission, []);
  const topLeftPermission = useMemo(
    () => permissions.find((permission) => permission.position === TOP_LEFT),
    []
  );
  const topRightPermission = useMemo(
    () =>
      permissions
        .find((permission) => permission.position === TOP_RIGHT)
        ?.access.map((item) => ({
          ...item,
          inputProps: item.key === "import" ? imports : exports,
        })),
    []
  );
  const linePermission = useMemo(
    () => permissions.find((permission) => permission.position === LINE),
    []
  );

  const pageName = useMemo(
    () => title || location.pathname.replace("/", ""),
    [title, location]
  );

  const changed = useSelector((state) => state.operationReducer.changed);

  const { data, isError, isFetching, isLoading } = useQuery(
    [
      columnFilters, //refetch when columnFilters changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
      changed, //refetch when state redux has changed (after crud)
    ],
    {
      queryKey: [
        "table-data",
        columnFilters,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,
      ],
      queryFn: async () => {
        return await fetchApi({
          token: cookies.profile?.token,
          url: setFetchUrl(location.pathname),
          method: "GET",
          query: {
            page: pagination.pageIndex + 1,
            per_page: pagination.pageSize,
            filters: JSON.stringify(columnFilters),
            sort: JSON.stringify(sorting),
          },
        });
      },
      keepPreviousData: true,
    }
  );

  const [visibilityColumns, setVisibilityColumns] = useState(
    columns.reduce((acc, key) => ({ [key.accessorKey]: true, ...acc }), {})
  );

  return (
    <>
      {/* Title component */}
      <Typography
        variant="h5"
        sx={{
          textTransform: "capitalize",
          fontWeight: "bold",
          pb: 1,
        }}
        gutterBottom
      >
        {pageName}
      </Typography>

      {/* Table component */}
      <MaterialReactTable
        columns={columns}
        data={data?.data ?? []}
        initialState={{ showColumnFilters: true }}
        manualFiltering
        manualPagination
        manualSorting
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Failed to load data",
              }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        renderTopToolbarCustomActions={() =>
          topLeftPermission ? (
            <CreateButton permission={topLeftPermission} />
          ) : (
            <div></div>
          )
        }
        rowCount={data?.meta?.total ?? 0}
        state={{
          columnFilters,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching,
          sorting,
          columnVisibility: visibilityColumns,
        }}
        enableGlobalFilter={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableColumnActions={false}
        positionToolbarAlertBanner="bottom"
        memoMode="cells"
        enableRowActions={linePermission ? true : false}
        renderRowActionMenuItems={({ closeMenu, row }) => (
          <div>
            {linePermission ? (
              <LineButton
                closeMenu={closeMenu}
                row={row}
                permission={linePermission}
              />
            ) : (
              <div></div>
            )}
          </div>
        )}
        renderToolbarInternalActions={({ table }) => (
          <Box>
            {/* custom component on top right  */}
            {topRightPermission ? (
              <TopButton
                row={data?.data}
                visibilityColumns={visibilityColumns}
                permission={topRightPermission}
              />
            ) : (
              <div></div>
            )}

            {/* built-in buttons */}
            <MRT_ShowHideColumnsButton table={table} />
          </Box>
        )}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            p: 2,
          },
        }}
        enableStickyHeader
        enableStickyFooter
        muiTableContainerProps={{ sx: { maxHeight: 580 } }}
        columnVisibility={visibilityColumns}
        onColumnVisibilityChange={setVisibilityColumns}
        renderBottomToolbarCustomActions={({ table }) =>
          BottomToolbar ? (
            <BottomToolbar table={table} data={data?.data ?? []} />
          ) : (
            <Box />
          )
        }
      />

      {/* Modal component */}
      <Modal
        details={details || columns}
        createFields={createFields || columns}
        editFields={editFields || columns}
        createValidation={createValidation}
        editValidation={editValidation}
      />
    </>
  );
};

export default Datatable;
