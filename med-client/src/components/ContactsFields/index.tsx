import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/selectors";
import { userActions } from "../../state/userSlice";

export const ContactsFields = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const email = useAppSelector((s) => s.user.edit.email);
  const phone = useAppSelector((s) => s.user.edit.phone);

  const { dispatch } = useAppDispatch();

  const enableEdit = () => {
    setIsDisabled(false);
  };

  return (
    <Box mt={10}>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={contactsLabelSX}>Контакты</Typography>
        <Typography
          sx={editLabelSX}
          onClick={() => {
            if (isDisabled) {
              enableEdit();
            }
          }}
        >
          Редактировать
        </Typography>
      </Box>
      <Box display="flex" gap={2.5} pt={2.5}>
        <Box sx={rootSX}>
          <Typography sx={labelSX}>Адресс электроной почты</Typography>
          <TextField
            sx={inputSX}
            placeholder="agsr@mail.ru"
            value={email}
            disabled={isDisabled}
            onChange={(event) => {
              dispatch(userActions.setEditEmail(event.target.value));
            }}
          />
        </Box>
        <Box sx={rootSX}>
          <Typography sx={labelSX}>Мобильный номер</Typography>
          <TextField
            sx={inputSX}
            placeholder="+375 29 123 44 55"
            value={phone}
            disabled={isDisabled}
            onChange={(event) => {
              dispatch(userActions.setEditPhone(event.target.value));
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const contactsLabelSX: SxProps<Theme> = (theme) => ({
  fontFamily: "Inter",
  fontSize: 18,
  lineHeight: "22px",
  fontWeight: 600,
  color: theme.palette.grey["900"],
});

const editLabelSX: SxProps<Theme> = (theme) => ({
  fontFamily: "Inter",
  fontSize: 16,
  lineHeight: "19px",
  fontWeight: 500,
  color: theme.palette.primary.main,
  cursor: "pointer",
});

const rootSX: SxProps = {
  display: "flex",
  flexDirection: "column",
};

const labelSX: SxProps<Theme> = (theme) => ({
  fontWeight: 500,
  fontSize: 15,
  lineHeight: "17px",
  fontFamily: "Inter",
  color: theme.palette.grey["300"],
  pb: 0.625,
});

const inputSX: SxProps<Theme> = (theme) => ({
  width: 470,
  height: 56,

  borderRadius: "5px",
  background: theme.palette.grey["A100"],
  px: 2.25,
  border: "none",
  ".MuiOutlinedInput-notchedOutline": {
    borderWidth: 0,
  },
  "& input::placeholder": {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "19px",
    fontFamily: "Inter",
    color: theme.palette.grey["900"],
  },
  "& input": {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "19px",
    fontFamily: "Inter",
    color: theme.palette.grey["900"],
  },
});
