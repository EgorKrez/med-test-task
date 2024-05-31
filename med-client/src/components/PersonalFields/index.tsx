import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/selectors";
import { userActions } from "../../state/userSlice";

export const PersonalFields = () => {
  const firstName = useAppSelector((s) => s.user.edit.firstName);
  const middleName = useAppSelector((s) => s.user.edit.middleName);
  const login = useAppSelector((s) => s.user.edit.login);
  const lastName = useAppSelector((s) => s.user.edit.lastName);
  const personId = useAppSelector((s) => s.user.edit.personId);

  const { dispatch } = useAppDispatch();

  return (
    <>
      <Typography sx={labelSX}>Личные данные</Typography>
      <Box display="flex" gap={2.75}>
        <Box display="flex" flexDirection="column" gap={2.5}>
          <Box sx={rootSX}>
            <Typography sx={inputLabelSX}>Имя*</Typography>
            <TextField
              sx={inputSX}
              placeholder="Введите имя"
              value={firstName}
              onChange={(event) =>
                dispatch(userActions.setEditFirstName(event.target.value))
              }
            />
          </Box>
          <Box sx={rootSX}>
            <Typography sx={inputLabelSX}>Отчество*</Typography>
            <TextField
              sx={inputSX}
              placeholder="Введите отчество"
              value={middleName}
              onChange={(event) => {
                dispatch(userActions.setEditMiddleName(event.target.value));
              }}
            />
          </Box>
          <Box sx={rootSX}>
            <Typography sx={inputLabelSX}>Логин*</Typography>
            <TextField
              sx={inputSX}
              placeholder="Введите логин"
              value={login}
              onChange={(event) => {
                dispatch(userActions.setEditLogin(event.target.value));
              }}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={2.5}>
          <Box sx={rootSX}>
            <Typography sx={inputLabelSX}>Фамилия*</Typography>
            <TextField
              sx={inputSX}
              placeholder="Введите фамилию"
              value={lastName}
              onChange={(event) => {
                dispatch(userActions.setEditLastName(event.target.value));
              }}
            />
          </Box>
          <Box sx={rootSX}>
            <Typography sx={inputLabelSX}>Идентификационный номер*</Typography>
            <TextField
              sx={inputSX}
              placeholder="Введите идентификационный номер"
              value={personId}
              onChange={(event) => {
                dispatch(userActions.setEditPersonId(event.target.value));
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const labelSX: SxProps<Theme> = (theme) => ({
  fontSize: 18,
  fontWeight: 600,
  fontFamily: "Inter",
  lineHeight: "22px",
  color: theme.palette.grey["900"],
  pb: 2.5,
});
const rootSX: SxProps = {
  display: "flex",
  flexDirection: "column",
};

const inputLabelSX: SxProps<Theme> = (theme) => ({
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
