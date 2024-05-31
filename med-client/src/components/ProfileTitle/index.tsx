import {
  Box,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../../state/selectors';

export const ProfileTitle = () => {
  const { user: {
    avatar,
    firstName,
    lastName
  } } = useAppSelector(({ user }) => user);

  return (
    <Box sx={rootSX}>
      <Typography sx={labelSX}>Личный кабинет</Typography>
      <Box display="flex"
           gap={2.5}
           alignItems="center">
        <Box sx={avatarSX((avatar)!)}></Box>
        <Typography sx={nameSX}>
          {firstName} {lastName}
        </Typography>
        <Box display={'flex'}
             gap={1.25}>
          <Box sx={activeSX}>Активный</Box>
          <Box sx={userSX}>Пользователь</Box>
        </Box>
      </Box>
    </Box>
  );
};

const rootSX: SxProps<Theme> = (theme) => ({
  pb: 5,
  borderBottom: 1,
  borderColor: theme.palette.grey['50'],
  alignItems: 'center',
});

const labelSX: SxProps<Theme> = (theme) => ({
  fontFamily: 'Inter',
  fontSize: 36,
  lineHeight: '43px',
  fontWeight: 700,
  color: theme.palette.grey['900'],
  mb: 2.5,
  mt: 5,
});

const avatarSX = (avatar: string) => ({
  height: 64,
  width: 64,
  borderRadius: '50%',
  backgroundImage: `url(${avatar})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});

const nameSX: SxProps<Theme> = (theme) => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  fontFamily: 'Inter',
  color: theme.palette.grey['900'],
});

const activeSX: SxProps<Theme> = (theme) => ({
  px: 1.25,
  py: 0.625,
  background: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '17px',
  fontFamily: 'Inter',
  borderRadius: '5px',
  cursor: 'pointer',
});

const userSX: SxProps<Theme> = (theme) => ({
  ...activeSX(theme),
  background: theme.palette.success.main,
  color: theme.palette.primary.contrastText,
});
