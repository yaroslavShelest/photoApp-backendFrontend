import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Иконка гамбургер-меню
import CloseIcon from '@mui/icons-material/Close'; // Иконка закрытия меню
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import logo from '../../assets/images/logo.png';
import { useTheme } from '@mui/material/styles';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessIcon from '@mui/icons-material/Business';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [anchorElSites, setAnchorElSites] = useState(null);
  const [anchorElLocations, setAnchorElLocations] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false); // Состояние для мобильного меню
  const menuOpenSites = Boolean(anchorElSites);
  const menuOpenLocations = Boolean(anchorElLocations);

  const theme = useTheme();
  const location = useLocation();

  // Состояние для меню "Наши сайты"
  const handleSitesMenuClick = (event) => {
    setAnchorElSites(event.currentTarget);
  };

  const handleSitesMenuClose = () => {
    setAnchorElSites(null);
  };

  // Состояние для меню "Нас можно найти"
  const handleLocationsMenuClick = (event) => {
    setAnchorElLocations(event.currentTarget);
  };

  const handleLocationsMenuClose = () => {
    setAnchorElLocations(null);
  };

  // Открытие и закрытие модального окна "Запросить звонок"
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Открытие и закрытие мобильного меню
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Массив филиалов
  const locations = [
    {
      city: 'ДНЕПР',
      address: 'г. Днепр, ул. Шевченко, 10',
      phones: ['+38 (067) 569-78-84', '+38 (050) 362-95-48'],
      icon: <BusinessIcon />, // Иконка филиала
    },
    {
      city: 'КИЕВ',
      address: 'г. Киев, ул. Дегтяревская, 8А',
      phones: ['+38 (066) 400-49-12', '+38 (067) 557-55-34'],
      icon: <BusinessIcon />,
    },
    {
      city: 'ЗАКАРПАТЬЕ',
      address: 'г. Иршава, ул. Шевченка, 69',
      phones: ['+38 (067) 415-83-20'],
      icon: <BusinessIcon />,
    },
    {
      city: 'ТЕРНОПОЛЬ',
      address: 'г. Тернополь, ул. Киевская, 2',
      phones: ['+38 (067) 823-04-00'],
      icon: <BusinessIcon />,
    },
    {
      city: 'ЛУЦК',
      address: 'г. Луцк, ул. Ершова, 11а',
      phones: ['+38 (098) 188-01-76'],
      icon: <BusinessIcon />,
    },
    {
      city: 'ЧЕРКАССЫ',
      address: 'г. Черкассы, ул. Чехова 9а',
      phones: ['+38 (067) 626-48-69'],
      icon: <BusinessIcon />,
    },
    {
      city: 'ОДЕССА',
      address: 'ул. Академика Вильямса 1В, 3 этаж, ТЦ DECOR HOUSE',
      phones: ['+38 (098) 157-87-60'],
      icon: <BusinessIcon />,
    },
  ];

  // Массив сайтов
  const sites = [
    {
      name: 'Сайт ЭБД',
      url: 'https://www.ebd.com',
      icon: <BusinessIcon />, // Иконка для сайта
    },
    {
      name: 'Сайт СТАНКИ',
      url: 'https://www.stanki.com',
      icon: <BusinessIcon />,
    },
    {
      name: 'Сайт БОНА ЗАБОРЫ',
      url: 'https://www.bonatrade.com',
      icon: <BusinessIcon />,
    },
    {
      name: 'Сайт БАССЕЙНЫ ТЕРРАС',
      url: 'https://www.teras.com',
      icon: <BusinessIcon />,
    },
  ];

  // Мобильное меню
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <IconButton>
        <CloseIcon />
      </IconButton>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/">
            На головну
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/admin">
          Вхід до адмінки
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleSitesMenuClick} >
            Нас можно знайти
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleLocationsMenuClick} >
            Наші сайти
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'block', sm: 'none' } }} // Показываем на мобильных
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <img src={logo} alt="Логотип" style={{ height: '50px' }} />
          </Link>

          {/* Адаптация кнопки "Вход в админку" */}
          <Box
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              display: { xs: 'none', sm: 'block' }, // Скрываем на мобильных
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to="/admin"
              sx={{
                backgroundColor: '#000',
                color: '#FFD700',
                padding: '8px 16px',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: '4px',
                border: '2px solid #FFD700',
                '&:hover': {
                  backgroundColor: '#333',
                  color: '#FFD700',
                },
              }}
            >
             Вхід до адмінки
            </Button>
          </Box>

          <Box sx={{ ml: 2, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2" sx={{ mr: 2 }}>
              вулиця Шевченка, 10, Дніпро
            </Typography>
            <PhoneIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2" sx={{ mr: 2 }}>
              <a href="tel:0958428248" style={{ color: 'inherit', textDecoration: 'none' }}>
                095 842 8248
              </a>
            </Typography>
            <AccessTimeIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">Пн - Пт 9:00 - 18:00</Typography>
          </Box>
        </Box>

        {/* Иконки социальных сетей */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', mr: 2 }}>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.facebook.com/ваш-профиль"
            target="_blank"
            rel="noopener"
            sx={{ mr: 1 }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.youtube.com/ваш-канал"
            target="_blank"
            rel="noopener"
            sx={{ mr: 1 }}
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.instagram.com/ваш-профиль"
            target="_blank"
            rel="noopener"
            sx={{ mr: 1 }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.pinterest.com/ваш-профиль"
            target="_blank"
            rel="noopener"
          >
            <PinterestIcon />
          </IconButton>
        </Box>

        {/* Кнопки "Нас можно найти" и "Наши сайты" (скрываются на мобильных) */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button color="inherit" endIcon={<ExpandMoreIcon />} onClick={handleLocationsMenuClick}>
            Нас можно знайти
          </Button>
          <Menu
            anchorEl={anchorElLocations}
            open={menuOpenLocations}
            onClose={handleLocationsMenuClose}
          >
            {locations.map((location, index) => (
              <MenuItem key={index} onClick={handleLocationsMenuClose}>
                <ListItemIcon>{location.icon}</ListItemIcon>
                <ListItemText
                  primary={location.city}
                  secondary={`${location.address}, Телефон(ы): ${location.phones.join(', ')}`}
                />
              </MenuItem>
            ))}
          </Menu>

          <Button color="inherit" endIcon={<ExpandMoreIcon />} onClick={handleSitesMenuClick}>
            Наші сайти
          </Button>
          <Menu anchorEl={anchorElSites} open={menuOpenSites} onClose={handleSitesMenuClose}>
            {sites.map((site, index) => (
              <MenuItem
                key={index}
                component="a"
                href={site.url}
                target="_blank"
                rel="noopener"
                onClick={handleSitesMenuClose}
              >
                <ListItemIcon>{site.icon}</ListItemIcon>
                <ListItemText primary={site.name} />
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Button color="inherit" endIcon={<PhoneIcon />} onClick={handleClickOpen}>
          Дзвінок
        </Button>
        <ThemeSwitcher />
      </Toolbar>

      {/* Мобильное меню Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }} // Показываем только на мобильных
      >
        {drawer}
      </Drawer>

      {/* Модальное окно */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Запросити консультацію</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Ваше ім'я" type="text" fullWidth variant="standard" />
          <TextField margin="dense" label="Номер телефону" type="tel" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Відміна</Button>
          <Button onClick={handleClose}>Відправити</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
