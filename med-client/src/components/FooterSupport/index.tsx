import { Box, Button, SxProps, Theme } from "@mui/material";
import { ReactComponent as Bank } from "../../assets/bank.svg";

export const FooterSupport = () => {
  return (
    <Box sx={rootSX}>
      <Bank />
      <Button sx={buttonSX}>Условный партнёр</Button>
      <Button sx={buttonSX}>Условный партнёр</Button>
      <Button sx={buttonSX}>Условный партнёр</Button>
      <Button sx={buttonSX}>Условный партнёр</Button>
    </Box>
  );
};

const rootSX: SxProps<Theme> = (theme) => ({
  display: "flex",
  gap: 2.5,
  py: 5,
  borderTop: 1,
  borderColor: theme.palette.grey["50"],
  alignItems: "center",
});

const buttonSX: SxProps<Theme> = (theme) => ({
  px: 1.75,
  py: 1.5,
  background: theme.palette.grey["50"],
  color: theme.palette.grey["300"],
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "17px",
  transition: "0.3s",
  ":hover": {
    background: theme.palette.grey["100"],
  },
});
