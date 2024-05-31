import { Box, SxProps } from "@mui/material";
import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { ProfileBreadcrumbs } from "../ProfileBreadcrumbs";
import { Login } from "../Login";

export const LoginPage = () => {
  return (
    <Box sx={rootSX}>
      <Header />
      <Box mt={10}>
        <ProfileBreadcrumbs breadcrumbsData={["Вернуться на главную"]} />
      </Box>
      <Login />
      <Footer />
    </Box>
  );
};

const rootSX: SxProps = {
  overflowX: "hidden",
  px: 17,
};
