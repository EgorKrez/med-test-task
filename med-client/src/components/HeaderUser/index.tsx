import { Box, SxProps, Theme, Typography } from "@mui/material";
import { ReactComponent as Notification } from "../../assets/notification.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/selectors";

export const HeaderUser = () => {
  const navigate = useNavigate();
  const { user: user } = useAppSelector(({ user }) => user);

  const { avatar, firstName, lastName } = user;

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <Box sx={userSX} onClick={navigateToProfile}>
      <Box sx={notificationSX}>
        <Notification />
        <Box sx={notificationCountSX}>4</Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box sx={avatarSX(avatar!)} marginRight={1.25}></Box>
        <Box sx={dropdownSX}>
          <Typography sx={userLabelSX}>
            {firstName} {lastName}
          </Typography>
          <KeyboardArrowDownIcon sx={iconSX} />
        </Box>
      </Box>
    </Box>
  );
};

const avatarSX = (avatar: string) => ({
  height: 48,
  width: 48,
  backgroundImage: `url("${avatar}")`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderRadius: "50%",
  cursor: "pointer",
});

const notificationSX: SxProps = {
  cursor: "pointer",
  position: "relative",
};

const notificationCountSX: SxProps<Theme> = (theme) => ({
  position: "absolute",
  width: 18,
  height: 18,
  background: theme.palette.primary.main,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: -12,
  right: -10,
  fontSize: 12,
  color: "white",
  fontWeight: 500,
  fontFamily: "Manrope",
});

const userSX: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 5.25,
};

const userLabelSX: SxProps<Theme> = (theme) => ({
  fontFamily: "Inter",
  fontSize: 16,
  lineHeight: "19px",
  fontWeight: 500,
  color: theme.palette.grey["600"],
  width: 127,
  mr: 1.75,
});

const iconSX: SxProps<Theme> = (theme) => ({
  color: theme.palette.grey["500"],
  width: 28,
  height: 28,
});

const dropdownSX: SxProps = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};
