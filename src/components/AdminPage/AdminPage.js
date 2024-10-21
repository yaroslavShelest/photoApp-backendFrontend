import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Button, Typography, Container, Accordion,
  AccordionSummary, AccordionDetails, Snackbar, Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import ImageIcon from '@mui/icons-material/Image';
import Login from '../Login/Login'; // Імпортуємо компонент логіну

const AdminPage = () => {
  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Стан авторизації

  // Перевірка автентифікації при завантаженні компонента
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem('isAuthenticated', status);
  };

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    hashtags: '',
    year: '',
    description: '',
    images: [], // Поле images змінено на масив
    city: '',
  });

  const [expandedCategory, setExpandedCategory] = useState(false);
  const [expandedHashtags, setExpandedHashtags] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch categories and hashtags from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/objects'); // Замініть на ваш API endpoint
        if (!response.ok) {
          throw new Error('Помилка при отриманні даних');
        }
        const data = await response.json();

        // Отримання унікальних категорій і хештегів з даних
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        const uniqueHashtags = [...new Set(data.flatMap((item) => item.hashtags))];

        setCategories(uniqueCategories);
        setHashtags(uniqueHashtags);
      } catch (error) {
        console.error('Помилка при отриманні даних:', error);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) {
    // Якщо користувач не авторизований, показуємо компонент логіну
    return <Login onLogin={handleLogin} />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевірка на заповнення всіх полів, крім зображення
    if (!formData.title || !formData.category || !formData.hashtags || !formData.year || !formData.city || !formData.description) {
      setSnackbarMessage('Всі поля, крім зображення, є обов\'язковими для заповнення.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Створення об'єкта FormData для відправлення
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('hashtags', formData.hashtags);
    formDataToSend.append('year', formData.year);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('description', formData.description);

    // Додавання зображень у FormData
    if (formData.images) {
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
    }

    // Відправляємо POST-запит на сервер
    try {
      const response = await fetch('http://localhost:5000/api/objects', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Помилка при відправці даних');
      }

      const data = await response.json();
      console.log('Об\'єкт успішно додано:', data);

      // Показати повідомлення про успіх
      setSnackbarMessage('Об\'єкт успішно додано!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Скидання форми
      setFormData({
        title: '',
        category: '',
        hashtags: '',
        year: '',
        city: '',
        description: '',
        images: [],
      });
    } catch (error) {
      console.error('Помилка:', error);

      // Показати повідомлення про помилку
      setSnackbarMessage('Сталася помилка при додаванні об\'єкта.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCategoryAccordionToggle = () => {
    setExpandedCategory((prev) => !prev);
  };

  const handleHashtagsAccordionToggle = () => {
    setExpandedHashtags((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleHashtagClick = (hashtag) => {
    setFormData((prev) => ({
      ...prev,
      hashtags: prev.hashtags ? `${prev.hashtags}, ${hashtag}` : hashtag,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Додати новий об'єкт
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Назва об'єкта"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleInputChange}
          required
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark' ? '#000000' : 'inherit',
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.text.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '& input': {
                color: theme.palette.text.primary,
              },
            },
          }}
        />
        <TextField
          label="Категорія"
          name="category"
          fullWidth
          margin="normal"
          value={formData.category}
          onChange={handleInputChange}
          required
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark' ? '#000000' : 'inherit',
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.text.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '& input': {
                color: theme.palette.text.primary,
              },
            },
          }}
        />
        <Accordion
          expanded={expandedCategory}
          onChange={handleCategoryAccordionToggle}
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}>
            <CategoryIcon sx={{ mr: 1, color: theme.palette.text.primary }} />
            <Typography>Поточні категорії</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {categories.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    size="small"
                    onClick={() => handleCategoryClick(category)}
                    sx={{
                      backgroundColor: '#EEE8AA',
                      color: '#000000',
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </Box>
            ) : (
              <Typography>Наразі відсутні</Typography>
            )}
          </AccordionDetails>
        </Accordion>
        <TextField
          label="Хештеги (через кому)"
          name="hashtags"
          fullWidth
          margin="normal"
          value={formData.hashtags}
          onChange={handleInputChange}
          required
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark' ? '#000000' : 'inherit',
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.text.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '& input': {
                color: theme.palette.text.primary,
              },
            },
          }}
        />
        <Accordion
          expanded={expandedHashtags}
          onChange={handleHashtagsAccordionToggle}
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}>
            <TagIcon sx={{ mr: 1, color: theme.palette.text.primary }} />
            <Typography>Поточні хештеги</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {hashtags.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {hashtags.map((hashtag, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    size="small"
                    onClick={() => handleHashtagClick(hashtag)}
                    sx={{
                      backgroundColor: '#EEE8AA',
                      color: '#000000',
                    }}
                  >
                    {hashtag}
                  </Button>
                ))}
              </Box>
            ) : (
              <Typography>Наразі відсутні</Typography>
            )}
          </AccordionDetails>
        </Accordion>
        <TextField
          label="Рік"
          name="year"
          type="number"
          fullWidth
          margin="normal"
          value={formData.year}
          onChange={handleInputChange}
          required
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark' ? '#000000' : 'inherit',
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.text.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '& input': {
                color: theme.palette.text.primary,
              },
            },
          }}
        />
        <TextField
          label="Місто"
          name="city"
          fullWidth
          margin="normal"
          value={formData.city}
          onChange={handleInputChange}
          required
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark' ? '#000000' : 'inherit',
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.text.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '& input': {
                color: theme.palette.text.primary,
              },
            },
          }}
        />
        <TextField
          label="Опис об'єкта"
          name="description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={formData.description}
          onChange={handleInputChange}
          required
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark' ? '#000000' : 'inherit',
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.text.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '& textarea': {
                color: theme.palette.text.primary,
              },
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<ImageIcon />}
          component="label"
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
          }}
        >
          Завантажити зображення
          <input
            type="file"
            hidden
            multiple
            onChange={handleImageChange}
          />
        </Button>
        {formData.images && formData.images.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Вибрані зображення:</Typography>
            {formData.images.map((file, index) => (
              <Typography key={index} variant="body2" sx={{ color: theme.palette.text.primary }}>
                {file.name}
              </Typography>
            ))}
          </Box>
        )}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.primary,
            }}
          >
            Додати новий об'єкт
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPage;
