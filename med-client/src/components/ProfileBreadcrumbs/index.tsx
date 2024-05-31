import { Box, SxProps, Theme } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

type Props = {
  breadcrumbsData: string[];
};

export const ProfileBreadcrumbs = (props: Props) => {
  const { breadcrumbsData } = props;

  return (
    <Box sx={rootSX}>
      {breadcrumbsData.map((item, index) => (
        <Box
          sx={index === breadcrumbsData.length - 1 ? itemActiveSX : itemSX}
          key={index}
        >
          <KeyboardArrowLeftIcon sx={iconSX} />
          {item}
        </Box>
      ))}
    </Box>
  );
};

const rootSX: SxProps = {
  display: "flex",
  gap: 2.5,
  width: "100%",
};

const itemSX: SxProps<Theme> = (theme) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "19px",
  color: theme.palette.grey["500"],
  fontFamily: "Inter",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const itemActiveSX: SxProps<Theme> = (theme) => ({
  ...itemSX(theme),
  color: theme.palette.grey["900"],
});

const iconSX: SxProps = {
  width: 35,
  height: 35,
  mr: 1,
};
