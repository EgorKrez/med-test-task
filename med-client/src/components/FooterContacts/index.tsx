import { Box, SxProps, Theme, Typography } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export const FooterContacts = () => {
  return (
    <Box display="flex" pb={5}>
      <Box sx={registersSX}>
        <Logo />
        <Typography sx={descriptionSX}>
          Автоматизированная информационная система «Реестры»
        </Typography>
        <Typography sx={descriptionSX} maxWidth={177}>
          © АИС «Реестры», 2022. Все права защищены.
        </Typography>
      </Box>
      <Box ml={16}>
        <Typography sx={titleSX}>Техническая поддержка</Typography>
        <Box display="flex" flexDirection="column" gap={1.25}>
          <Typography sx={descriptionSX}>+375 25 111 22 33</Typography>
          <Typography sx={descriptionSX}>+375 29 222 44 55</Typography>
          <Typography sx={descriptionSX}>dev@agsr.by</Typography>
          <Typography sx={contactSX}>Связаться с поддержкой</Typography>
        </Box>
      </Box>
      <Box ml={19}>
        <Typography sx={titleSX}>Контакты</Typography>
        <Box display="flex" flexDirection="column" gap={1.25}>
          <Typography sx={descriptionSX}>+375 33 112 22 45</Typography>
          <Typography sx={descriptionSX}>+375 29 222 44 88</Typography>
          <Typography sx={descriptionSX}>dev@agsr.by</Typography>
          <Typography sx={descriptionSX}>
            г. Минск, ул. К.Цеткин, д. 24-705
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const registersSX: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
  maxWidth: 278,
};

const descriptionSX: SxProps<Theme> = (theme) => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "22px",
  fontFamily: "Inter",
  color: theme.palette.grey["500"],
});

const contactSX: SxProps<Theme> = (theme) => ({
  ...descriptionSX(theme),
  lineHeight: "17px",
  color: theme.palette.primary.light,
  cursor: "pointer",
});

const titleSX: SxProps<Theme> = (theme) => ({
  fontSize: 20,
  fontWeight: 700,
  lineHeight: "24px",
  fontFamily: "Inter",
  color: theme.palette.grey["900"],
  mb: 2.5,
});
