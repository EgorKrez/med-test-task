import { Header } from '../components/Header';
import { ProfileAccount } from '../components/ProfileAccount';
import { Footer } from '../components/Footer';
import {
  Box,
  SxProps,
} from '@mui/material';
import React from 'react';
import { TableComponent } from '../components/TableComponent';

export const PersonalAccountPage = () => {
  return (
    <Box sx={rootSX}>
      <Header />
      <ProfileAccount />
      <TableComponent />
      <Footer />
    </Box>
  );
};

const rootSX: SxProps = {
  overflowX: "hidden",
  px: 17,
};
