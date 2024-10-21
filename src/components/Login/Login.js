// src/components/Login/Login.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert, Paper } from '@mui/material';
import { styled } from '@mui/system';

const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `url('https://i.pinimg.com/1200x/7d/ec/18/7dec18a7dfe28d971caede39f9bc066c.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Затемнение
    zIndex: 1,
  },
}));

const LoginBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  zIndex: 2,
  position: 'relative',
  maxWidth: '500px',
  width: '100%',
}));

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Проверка логина и пароля
    if (username === 'adminБонаТрейд' && password === '1234567') {
      onLogin(true);
    } else {
      setError('Неверные учетные данные. Попробуйте снова.');
    }
  };

  return (
    <LoginContainer>
      <LoginBox elevation={6}>
        <Typography variant="h4" gutterBottom>
          Вхід до адмінки
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Логін"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Вхід
          </Button>
        </Box>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
