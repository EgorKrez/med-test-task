import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { useEffect } from "react";
import { fetchUserData } from "../../state/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/selectors";

const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=500,left=500,top=500`;

export const googleLoginPath = () => `http://localhost:3000/auth/google`;

const openSignInPopup = () => window.open(googleLoginPath(), "_blank", params);

export const Login = () => {
  const state = useAppSelector(({ user }) => user);

  const { dispatch } = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.user?.id) {
      navigate("/");
    }
  }, [state?.user?.id]);

  useEffect(() => {
    const handler = async (e: MessageEvent<string>) => {
      if (e.data === "signinsuccess") {
        await dispatch(fetchUserData());
      }
    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);
  }, []);
  return (
    <Box sx={rootSX}>
      <Typography sx={labelSX}>Вход</Typography>
      <Button onClick={openSignInPopup} sx={buttonSX}>
        GOOGLE
      </Button>
    </Box>
  );
};

const rootSX: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  mt: 6,
  pb: 10,
};

const labelSX: SxProps<Theme> = (theme) => ({
  fontSize: 48,
  fontWeight: 700,
  fontFamily: "Inter",
  lineHeight: "58px",
  color: theme.palette.grey["900"],
  width: 430,
  mb: 5,
});

const buttonSX: SxProps<Theme> = (theme) => ({
  height: 56,
  width: 430,
  border: 1,
  borderColor: theme.palette.grey["200"],
  color: theme.palette.grey["500"],
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "22px",
  fontFamily: "Inter",
  textTransform: "none",
});
