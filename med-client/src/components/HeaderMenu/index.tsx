import { Box, SxProps, Theme, Typography } from "@mui/material";

export const HeaderMenu = () => {
  return (
    <Box sx={menuSX}>
      <Typography sx={menuItemSX}>Меню</Typography>
      <Typography sx={menuItemSX}>Вопросы и ответы</Typography>
      <Typography sx={menuItemSX}>Об АИС</Typography>
    </Box>
  );
};

const menuSX: SxProps = {
  display: "flex",
  gap: 2.5,
  fontSize: 10,
};

const menuItemSX: SxProps<Theme> = (theme) => ({
  fontSize: 16,
  lineHeight: "19px",
  fontWeight: 500,
  color: theme.palette.grey["600"],
  fontFamily: "Inter",
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": {
    color: theme.palette.primary.main,
  },
});
