import { Box, SxProps, Theme, Typography } from "@mui/material";
import { PasswordFieldInput } from "../PasswordFieldInput";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/selectors";
import { userActions } from "../../state/userSlice";

export const PasswordFields = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const confirmPassword = useAppSelector((s) => s.user.edit.confirmPassword);
  const newPassword = useAppSelector((s) => s.user.edit.newPassword);
  const oldPassword = useAppSelector((s) => s.user.edit.oldPassword);

  const { dispatch } = useAppDispatch();

  const enableEdit = () => {
    setIsDisabled(false);
  };

  return (
    <Box mt={10}>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={contactsLabelSX}>Пароль</Typography>
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
      <Box display="flex" pt={2.5}>
        <PasswordFieldInput
          label={"Текущий пароль"}
          placeholder="**********"
          value={oldPassword}
          disabled={isDisabled}
          onChange={(str) => {
            dispatch(userActions.setEditOldPassword(str));
          }}
        />
      </Box>
      <Box display="flex" pt={2.5} gap={2.5}>
        <PasswordFieldInput
          label={"Новый пароль"}
          placeholder="**********"
          value={newPassword}
          disabled={isDisabled}
          onChange={(str) => dispatch(userActions.setEditNewPassword(str))}
        />
        <PasswordFieldInput
          label={"Подтвердите пароль"}
          placeholder="**********"
          disabled={isDisabled}
          value={confirmPassword}
          onChange={(str) => dispatch(userActions.setEditConfirmPassword(str))}
        />
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
