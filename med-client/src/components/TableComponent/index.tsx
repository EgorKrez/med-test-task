import * as React from "react";
import { useEffect } from "react";

import {
  Box,
  Button,
  IconButton,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Visibility } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import { ReactComponent as Metadata } from "../../assets/metadata.svg";
import { ReactComponent as Services } from "../../assets/services.svg";
import { ReactComponent as Book } from "../../assets/book.svg";
import { ReactComponent as Sort } from "../../assets/sort.svg";
import { CustomInput } from "../Input";
import { useAppDispatch, useAppSelector } from "../../state/selectors";
import {
  fetchRecords,
  IRecord,
  Order,
  recordsActions,
} from "../../state/recordsSlice";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: any, b: any) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const rootSX: SxProps<Theme> = (theme) => ({
  width: "calc(100vw - 272px)",
  ml: -17,
  px: 17,
  pt: 10,
  pb: 5,
  background: theme.palette.primary.light,
});

export const TableComponent = () => {
  const page = useAppSelector((s) => s.records.page);
  const rowsPerPage = useAppSelector((s) => s.records.limit);
  const selected = useAppSelector((s) => s.records.selected);
  const search = useAppSelector((s) => s.records.search);
  const rows = useAppSelector((s) => s.records.records);
  const totalItems = useAppSelector((s) => s.records.totalItems);
  const order = useAppSelector((s) => s.records.order);
  const orderBy = useAppSelector((s) => s.records.orderBy);
  const { dispatch } = useAppDispatch();

  useEffect(() => {
    reFetchRecords();
  }, [page, rowsPerPage]);

  const handleRequestSort = (property: keyof IRecord) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch(recordsActions.setOrder(isAsc ? "desc" : "asc"));
    dispatch(recordsActions.setOrderBy(property));
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    dispatch(recordsActions.setSelected(newSelected));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(recordsActions.setPage(newPage));
  };

  const handleChangeRowsPerPage = (rowsNumber: number) => {
    dispatch(recordsActions.setLimit(rowsNumber));
    dispatch(recordsActions.setPage(0));
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const reFetchRecords = () => {
    dispatch(fetchRecords());
  };

  const clearFilter = async () => {
    await dispatch(recordsActions.setSearch(""));

    reFetchRecords();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <Box sx={rootSX}>
          <Box>
            <Typography sx={labelSX}>
              Выбор ИС/СР для внесения метаданных
            </Typography>
            <CustomInput
              value={search}
              onSubmit={reFetchRecords}
              setValue={(search) => dispatch(recordsActions.setSearch(search))}
              clearFilter={clearFilter}
            />
          </Box>
          <Box
            height={34}
            width="100%"
            mb={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex" gap={2.5}>
              <Button sx={topButtonSX}>
                <Visibility /> Просмотр ИС/ИР
              </Button>
              <Button sx={topButtonSX}>
                <InfoIcon />
                Доп сведения ИС/ИР
              </Button>
              <Button sx={addButtonSX}>
                <AddIcon /> Добавить
              </Button>
            </Box>

            <Box>
              <IconButton onClick={() => handleRequestSort("name")}>
                <Sort />
              </IconButton>
            </Box>
          </Box>
          <Toolbar sx={toolbarSX}>
            {selected.length > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {selected.length} selected
              </Typography>
            ) : (
              <Typography
                sx={tableLabelSX}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Список АИС
              </Typography>
            )}
            <Box display="flex" gap={1.25} alignItems="center">
              <Typography sx={rowsCountLabelSX}>Показывать по:</Typography>
              <Box
                sx={
                  rowsPerPage === 25 ? rowsCountItemActiveSX : rowsCountItemSX
                }
                onClick={() => {
                  if (rowsPerPage !== 25) {
                    handleChangeRowsPerPage(25);
                  }
                }}
              >
                25
              </Box>
              <Box
                sx={
                  rowsPerPage === 50 ? rowsCountItemActiveSX : rowsCountItemSX
                }
                onClick={() => {
                  if (rowsPerPage !== 50) {
                    handleChangeRowsPerPage(50);
                  }
                }}
              >
                50
              </Box>
              <Box
                sx={
                  rowsPerPage === 100 ? rowsCountItemActiveSX : rowsCountItemSX
                }
                onClick={() => {
                  if (rowsPerPage !== 100) {
                    handleChangeRowsPerPage(100);
                  }
                }}
              >
                100
              </Box>
            </Box>
          </Toolbar>
        </Box>
        <TableContainer sx={tableContainerSX}>
          <Table sx={tableSX} aria-labelledby="tableTitle" size={"medium"}>
            <TableBody>
              {stableSort<IRecord>(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event: React.MouseEvent<unknown>) =>
                        handleClick(event, row.name)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name + index}
                      selected={isItemSelected}
                      sx={{
                        display: "flex",
                        height: 54,
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        sx={rowsNameSX}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          height: "100%",
                          padding: 0,
                          alignItems: "center",
                        }}
                      >
                        <TableCell align="right" sx={tableCellSX}>
                          <Box
                            sx={{
                              display: "flex",
                              padding: 0,
                              alignItems: "center",
                            }}
                          >
                            <Metadata style={{ paddingRight: 9 }} />
                            {row.metadata}
                          </Box>
                          <ArrowForwardIosIcon sx={arrowIconSX} />
                        </TableCell>
                        <TableCell align="right" sx={tableCellSX}>
                          <Services style={{ paddingRight: 9 }} />
                          {row.services}
                          <ArrowForwardIosIcon sx={arrowIconSX} />
                        </TableCell>
                        <TableCell align="right" sx={tableCellSX}>
                          <Book style={{ paddingRight: 9 }} /> {row.book}
                          <ArrowForwardIosIcon sx={arrowIconSX} />
                        </TableCell>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            sx={tablePaginationSX}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
};

const tableLabelSX: SxProps<Theme> = (theme) => ({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: "22px",
  color: theme.palette.grey["600"],
  background: theme.palette.primary.light,
});

const rowsCountLabelSX: SxProps<Theme> = (theme) => ({
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "19px",
  color: theme.palette.grey["300"],
  fontFamily: "Inter",
});

const rowsCountItemActiveSX: SxProps<Theme> = (theme) => ({
  width: 40,
  height: 29,
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "19px",
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  fontFamily: "Inter",
  cursor: "pointer",
});

const rowsCountItemSX: SxProps<Theme> = (theme) => ({
  ...rowsCountItemActiveSX(theme),
  border: 1,
  borderColor: theme.palette.grey["200"],
  background: theme.palette.primary.contrastText,
  color: theme.palette.grey["200"],
});

const rowsNameSX: SxProps<Theme> = (theme) => ({
  fontSize: 20,
  fontWeight: 700,
  lineHeight: "24px",
  fontFamily: "Inter",
  color: theme.palette.grey["900"],
  borderBottom: 0,
  whiteSpace: "nowrap",
});

const arrowIconSX: SxProps<Theme> = (theme) => ({
  width: 17,
  height: 17,
  color: theme.palette.grey["500"],
  position: "absolute",
  right: 10,
  top: 13,
});

const tableCellSX: SxProps<Theme> = (theme) => ({
  fontSize: 18,
  fontWeight: 600,
  fontFamily: "Inter",
  lineHeight: "22px",
  color: theme.palette.primary.main,
  width: 109,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 0.75,
  cursor: "pointer",
  background: theme.palette.primary.contrastText,
  ml: 0.625,
  py: 0,
  px: 1.25,
  height: 44,
  border: 0,
  flexDirection: "row",
  position: "relative",
});

const topButtonSX: SxProps<Theme> = (theme) => ({
  px: 1.25,
  height: "100%",
  display: "flex",
  gap: 0.625,
  border: 1,
  borderColor: theme.palette.grey["500"],
  color: theme.palette.grey["500"],
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "17px",
  fontFamily: "Inter",
  textTransform: "none",
});

const addButtonSX: SxProps<Theme> = (theme) => ({
  ...topButtonSX(theme),
  borderColor: theme.palette.primary.main,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  ":hover": {
    borderColor: theme.palette.primary.main,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
});

const tableSX: SxProps<Theme> = (theme) => ({
  background: theme.palette.primary.light,
});

const tableContainerSX: SxProps<Theme> = (theme) => ({
  width: "calc(100vw - 272px)",
  overflowX: "auto",
  marginLeft: -17,
  px: 17,
  background: theme.palette.primary.light,
});

const toolbarSX: SxProps<Theme> = (theme) => ({
  pl: 2,
  pr: 1,
  display: "flex",
  justifyContent: "space-between",
  background: theme.palette.primary.light,
});

const tablePaginationSX: SxProps<Theme> = (theme) => ({
  background: theme.palette.primary.light,
});

const labelSX: SxProps<Theme> = (theme) => ({
  fontSize: 18,
  fontWeight: 600,
  fontFamily: "Inter",
  lineHeight: "22px",
  color: theme.palette.grey["600"],
});
