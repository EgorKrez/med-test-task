import { Box, SxProps, Theme, Typography } from "@mui/material";

export const FooterDescription = () => {
  return (
    <Box sx={rootSX}>
      <Typography sx={labelSX}>© АИС «Реестры»</Typography>
      <Typography sx={labelSX}>
        Разработчк: ОАО «Агентство сервисизации и реинжиниринга» (г. Минск,
        ул. К. Цеткин, д. 24–705 dev@agsr.by)
      </Typography>
    </Box>
  );
};

const rootSX: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  pb: 12,
};

const labelSX: SxProps<Theme> = (theme) => ({
  textAlign: "center",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "Inter",
  lineHeight: "22px",
  color: theme.palette.grey["200"],
});
