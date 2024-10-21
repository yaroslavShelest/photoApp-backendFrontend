// src/components/Footer/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: theme.palette.text.primary,
        padding: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">© 2024 БОНА ТРЕЙД (Портфоліо) Ярослав Шелест</Typography>
    </Box>
  );
};

export default Footer;
