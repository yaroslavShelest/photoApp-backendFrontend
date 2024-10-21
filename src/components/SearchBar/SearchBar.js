// src/components/SearchBar/SearchBar.js
import React, { useEffect, useState } from 'react';
import { Box, TextField, Autocomplete, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SearchBar = ({ onFilter }) => {
  const theme = useTheme();
  const [hashtags, setHashtags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedHashtag, setSelectedHashtag] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/objects');
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();

        // Извлекаем категории, хештеги, года и города из данных
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        const uniqueHashtags = [...new Set(data.flatMap((item) => item.hashtags))];
        const uniqueYears = [...new Set(data.map((item) => item.year))];
        const uniqueCities = [...new Set(data.map((item) => item.city))];

        setCategories(uniqueCategories);
        setHashtags(uniqueHashtags);
        setYears(uniqueYears);
        setCities(uniqueCities);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  // Стиль для полей ввода
  const textFieldStyle = {
    '& .MuiInputBase-root': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.text.primary,
    },
  };

  const handleFilterClick = () => {
    console.log('Выбранная категория:', selectedCategory);
    console.log('Выбранный хештег:', selectedHashtag);
    console.log('Выбранный год:', selectedYear);
    console.log('Выбранный город:', selectedCity);
    console.log('Поисковый запрос:', searchQuery);

    // Передаем данные для фильтрации в родительский компонент через onFilter
    onFilter({
      category: selectedCategory,
      hashtag: selectedHashtag,
      year: selectedYear,
      city: selectedCity,
      query: searchQuery,
    });

    // Сбрасываем все выбранные значения
    setSelectedCategory('');
    setSelectedHashtag('');
    setSelectedYear('');
    setSelectedCity('');
    setSearchQuery('');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Поиск по названию, категории или описанию"
        variant="outlined"
        fullWidth
        sx={{ mb: 2, ...textFieldStyle }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Autocomplete
        options={categories}
        value={selectedCategory}
        onChange={(event, newValue) => setSelectedCategory(newValue || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Категория"
            variant="outlined"
            sx={textFieldStyle}
          />
        )}
        sx={{ mb: 2 }}
      />

      <Autocomplete
        options={hashtags}
        value={selectedHashtag}
        onChange={(event, newValue) => setSelectedHashtag(newValue || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Хештеги"
            variant="outlined"
            sx={textFieldStyle}
          />
        )}
        sx={{ mb: 2 }}
      />

      <Autocomplete
        options={years}
        value={selectedYear}
        onChange={(event, newValue) => setSelectedYear(newValue || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Год"
            variant="outlined"
            sx={textFieldStyle}
          />
        )}
        sx={{ mb: 2 }}
      />

      <Autocomplete
        options={cities}
        value={selectedCity}
        onChange={(event, newValue) => setSelectedCity(newValue || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Город"
            variant="outlined"
            sx={textFieldStyle}
          />
        )}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleFilterClick}
      >
        Відфільтрувати об'єкт 
      </Button>
    </Box>
  );
};

export default SearchBar;
