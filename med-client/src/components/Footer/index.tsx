import { Box } from "@mui/material";
import { FooterContacts } from "../FooterContacts";
import { FooterSupport } from "../FooterSupport";
import { FooterDescription } from "../FooterDescription";

export const Footer = () => {
  return (
    <Box mt={10}>
      <FooterContacts />
      <FooterSupport />
      <FooterDescription />
    </Box>
  );
};
