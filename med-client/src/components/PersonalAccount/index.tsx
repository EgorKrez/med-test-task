import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const PersonalAccount = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={rootSX}>
      <Typography sx={labelSX}>Личный кабинет</Typography>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction sx={navigationItemSX} label="Реестры" />
        <BottomNavigationAction
          sx={navigationItemSX}
          label="Электронные сервисы"
        />
        <BottomNavigationAction
          sx={navigationItemSX}
          label="Потребление данных"
        />
        <BottomNavigationAction sx={navigationItemSX} label="Справочники" />
        <BottomNavigationAction sx={navigationItemSX} label="Отчёты" />
      </BottomNavigation>
    </Box>
  );
};

const rootSX: SxProps = {
  mt: 5,
  mb: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const labelSX: SxProps<Theme> = (theme) => ({
  fontFamily: "Inter",
  fontSize: 36,
  lineHeight: "43px",
  fontWeight: 700,
  color: theme.palette.grey["900"],
  mb: 2.5,
});

const navigationItemSX: SxProps<Theme> = (theme) => ({
  color: theme.palette.grey["600"],
  whiteSpace: "nowrap",
  width: "auto",
  minWidth: "auto",
  maxWidth: 300,
  px: 2.5,
  "&.MuiBottomNavigationAction-root.Mui-selected": {
    color: theme.palette.primary.main,
    borderBottom: 2,
    borderColor: theme.palette.primary.main,
  },
  "span.MuiBottomNavigationAction-label": {
    fontSize: 18,
  },
  "span.MuiBottomNavigationAction-label.Mui-selected": {
    fontSize: 18,
  },
});
