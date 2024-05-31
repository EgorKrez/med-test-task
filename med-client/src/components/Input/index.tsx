import { Box, Button, Input, SxProps, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const rootSX: SxProps = {
  position: "relative",
  height: 61,
  mt: 2.5,
  mb: 5,
  display: "flex",
};

type Props = {
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
  clearFilter: () => void;
};

export const CustomInput = (props: Props) => {
  const { value, setValue, onSubmit, clearFilter } = props;

  const clearValue = () => {
    setValue("");
    clearFilter();
  };

  return (
    <Box sx={rootSX}>
      <Input
        key="111111111"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={inputSX}
        placeholder="Выберите ИС/СР для внесения метаданных..."
        startAdornment={<SearchIcon sx={iconSX} />}
        endAdornment={
          <HighlightOffIcon sx={closeIconSX} onClick={clearValue} />
        }
      />
      <Button
        type="button"
        sx={buttonSX}
        onClick={onSubmit}
        variant="contained"
      >
        Показать
      </Button>
    </Box>
  );
};

const inputSX: SxProps = {
  width: 700,
  height: "100%",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "19px",
  fontFamily: "Inter",
  "& .MuiInputBase-root": { height: 61 },
};

const iconSX: SxProps<Theme> = (theme) => ({
  mr: 1,
  color: theme.palette.grey["100"],
});

const buttonSX: SxProps<Theme> = (theme) => ({
  background: theme.palette.primary.main,
  ":hover": {
    background: theme.palette.primary.main,
  },
  height: "100%",
  px: 5.25,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: "22px",
  fontFamily: "Inter",
  textTransform: "none",
});

const closeIconSX: SxProps<Theme> = (theme) => ({
  color: theme.palette.grey["100"],
  cursor: "pointer",
  mr: 2.5,
});
