import { Box, SxProps } from "@mui/material";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Profile } from "../Profile";
import { ProfileFields } from "../ProfileFields";

export const ProfilePage = () => {
  return (
    <Box sx={rootSX}>
      <Header />
      <Profile />
      <ProfileFields />
      <Footer />
    </Box>
  );
};

const rootSX: SxProps = {
  overflowX: "hidden",
  px: 17,
};
