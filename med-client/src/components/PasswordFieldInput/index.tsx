import * as React from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = {
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange: (s: string) => void;
};

export const PasswordFieldInput = (props: Props) => {
  const { label, placeholder, value, disabled = false, onChange } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () =>
    setShowPassword((prevState) => !prevState);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [textFieldValue, setTextFieldValue] = useState(value);

  return (
    <Box sx={rootSX}>
      <Typography sx={labelSX}>{label}</Typography>
      <TextField
        sx={inputSX}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        value={textFieldValue}
        onChange={(e) => {
          setTextFieldValue(e.target.value);
          onChange(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        disabled={disabled}
      />
    </Box>
  );
};

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
    color: theme.palette.grey["A200"],
    opacity: 1,
  },
  "& input": {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "19px",
    fontFamily: "Inter",
    color: theme.palette.grey["A200"],
  },
});
