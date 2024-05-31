import { Alert, Box, Button, SxProps, Theme } from "@mui/material";
import { PersonalFields } from "../PersonalFields";
import { ContactsFields } from "../ContactsFields";
import { PasswordFields } from "../PasswordFields";
import { useEffect, useMemo, useState } from "react";
import {
  fetchUserData,
  IEditPersonData,
  postEditPersonData,
  postUserPasswordData,
  userActions,
} from "../../state/userSlice";
import {
  useAppDispatch,
  useAppPostDispatch,
  useAppSelector,
} from "../../state/selectors";

const rootSX: SxProps = {
  pt: 5,
};

const alertSX: SxProps = {
  mb: 5,
};

const buttonSX: SxProps<Theme> = (theme) => ({
  mt: 10,
  height: 56,
  px: 10.75,
  color: theme.palette.primary.contrastText,
  fontSize: 18,
  fontWeight: 600,
  fontFamily: "Inter",
  lineHeight: "22px",
  mb: 10,
  textTransform: "none",
  background: theme.palette.primary.main,
  ":hover": {
    background: theme.palette.primary.main,
  },
  "&.MuiButton-root.Mui-disabled": {
    color: "white",
    opacity: 0.5,
  },
});

export const ProfileFields = () => {
  const [errorText, setErrorText] = useState<string>("");
  const [successAlert, setSuccessAlert] = useState<boolean>(false);

  const userState = useAppSelector(({ user }) => user);

  const { dispatch } = useAppDispatch();
  const { postDispatch } = useAppPostDispatch();

  const closeErrorAlert = () => {
    setErrorText("");
  };

  const closeSuccessAlert = () => {
    setSuccessAlert(false);
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const isEditRequestDisabled = useMemo(
    () =>
      userState.edit?.firstName === userState?.user?.firstName &&
      userState.edit?.lastName === userState?.user?.lastName &&
      userState.edit?.middleName === userState?.user?.middleName &&
      userState.edit?.phone === userState?.user?.phone &&
      userState.edit?.email === userState?.user?.email &&
      userState.edit?.login === userState?.user?.login &&
      userState.edit?.personId === userState?.user?.personId,
    [userState]
  );

  const isDisabledButton = useMemo(
    () =>
      isEditRequestDisabled &&
      !userState.edit?.oldPassword &&
      !userState.edit?.newPassword &&
      !userState.edit?.confirmPassword,
    [userState]
  );

  const isChangePasswordRequestDisabled = useMemo(
    () =>
      userState.edit?.oldPassword &&
      userState.edit?.newPassword &&
      userState.edit?.confirmPassword,
    [userState]
  );

  const editPassword = async () => {
    if (userState.edit.oldPassword === userState.edit.newPassword) {
      setErrorText("Текущий и новые пароли совпадают!");
      return;
    }
    if (userState.edit.confirmPassword !== userState.edit.newPassword) {
      setErrorText("Введите одинаковые пароли!");
      return;
    }
    setErrorText("");
    setSuccessAlert(false);
    await postDispatch(
      postUserPasswordData({
        oldPassword: userState.edit.oldPassword,
        newPassword: userState.edit.newPassword,
      })
    ).then(() => {
      setSuccessAlert(true);
      dispatch(userActions.cleanPasswordData());
    });
  };

  const editData = async () => {
    if (!isEditRequestDisabled) {
      setErrorText("");
      setSuccessAlert(false);

      const editData: IEditPersonData = {
        firstName: userState.edit.firstName,
        lastName: userState.edit.lastName,
        middleName: userState.edit.middleName,
        phone: userState.edit.phone,
        email: userState.edit.email,
        login: userState.edit.login,
        personId: userState.edit.personId,
      };

      await postDispatch(postEditPersonData({ editData: editData })).then(
        () => {
          setSuccessAlert(true);
          dispatch(
            userActions.setEditPersonData({
              ...editData,
            })
          );
        }
      );
    }

    if (isChangePasswordRequestDisabled) {
      setErrorText("");
      await editPassword();
    }
  };
  return (
    <Box sx={rootSX}>
      <PersonalFields />
      <ContactsFields />
      <PasswordFields />
      <Button sx={buttonSX} onClick={editData} disabled={isDisabledButton}>
        Сохранить
      </Button>
      {!!errorText && (
        <Alert
          variant="filled"
          severity="error"
          onClose={closeErrorAlert}
          sx={alertSX}
        >
          {errorText}
        </Alert>
      )}
      {successAlert && (
        <Alert
          variant="filled"
          severity="success"
          onClose={closeSuccessAlert}
          sx={alertSX}
        >
          Поля изменены!
        </Alert>
      )}
    </Box>
  );
};
