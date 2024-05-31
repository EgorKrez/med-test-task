import { ProfileBreadcrumbs } from "../ProfileBreadcrumbs";
import { Box, SxProps } from "@mui/material";
import { ProfileTitle } from "../ProfileTitle";

export const Profile = () => {
  return (
    <Box sx={rootSX}>
      <ProfileBreadcrumbs breadcrumbsData={["Главная", "Профиль"]} />
      <ProfileTitle />
    </Box>
  );
};

const rootSX: SxProps = {
  mt: 10,
};
