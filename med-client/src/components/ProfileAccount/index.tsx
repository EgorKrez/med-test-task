import { Box, SxProps } from "@mui/material";
import { ProfileBreadcrumbs } from "../ProfileBreadcrumbs";
import { PersonalAccount } from "../PersonalAccount";

export const ProfileAccount = () => {
  return (
    <Box sx={rootSX}>
      <ProfileBreadcrumbs breadcrumbsData={["Главная", "Личный кабинет"]} />
      <PersonalAccount />
    </Box>
  );
};

const rootSX: SxProps = {
  width: "100%",
  mt: 10,
};
