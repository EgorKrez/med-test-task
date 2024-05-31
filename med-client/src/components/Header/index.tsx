import { Box, SxProps, Theme } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { HeaderUser } from "../HeaderUser";
import { HeaderMenu } from "../HeaderMenu";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <Box width="100%" sx={rootSX} height={80}>
      <Box sx={logoSX}>
        <Logo onClick={navigateToHome} />
      </Box>
      <HeaderMenu />
      <HeaderUser />
    </Box>
  );
};

const rootSX: SxProps<Theme> = (theme) => ({
  width: "100%",
  height: 80,
  borderBottom: 1,
  borderColor: theme.palette.grey["50"],
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const logoSX: SxProps = {
  cursor: "pointer",
};
