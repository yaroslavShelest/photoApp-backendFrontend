import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Box, Container, Pagination, Button } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import ObjectCard from '../ObjectCard/ObjectCard';

const ObjectList = () => {
  const [objects, setObjects] = useState([]);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage] = useState(10); // Количество объектов на странице
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [appliedFiltersText, setAppliedFiltersText] = useState('');

  useEffect(() => {
    // Запрос на получение данных с сервера
    const fetchObjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/objects'); // Убедитесь, что URL совпадает с вашим API
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        const data = await response.json();

        // Добавление полного URL к каждому изображению
        const updatedData = data.map((item) => ({
          ...item,
          images: item.images.map((image) => `http://localhost:5000${image}`),
        }));

        setObjects(updatedData); // Устанавливаем объекты в состояние
        setFilteredObjects(updatedData); // Изначально все объекты отображаются
      } catch (error) {
        setError('Ошибка при получении объектов');
        console.error('Ошибка при получении объектов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, []);

  const handleFilter = (filters) => {
    const { category, hashtag, year, city, query } = filters;

    console.log("Применяем фильтры:", filters);

    const filtered = objects.filter((object) => {
      const matchesCategory = category ? object.category === category : true;
      const matchesHashtag = hashtag ? object.hashtags?.includes(hashtag) : true;
      const matchesYear = year ? object.year === parseInt(year, 10) : true;
      const matchesCity = city ? object.city === city : true;
      const matchesQuery = query
        ? object.title.toLowerCase().includes(query.toLowerCase()) ||
          object.description.toLowerCase().includes(query.toLowerCase()) ||
          object.category.toLowerCase().includes(query.toLowerCase()) ||
          (object.city && object.city.toLowerCase().includes(query.toLowerCase()))
        : true;

      console.log(`Объект: ${object.title}, Город: ${object.city}`);
      console.log(`matchesCity: ${matchesCity}`);

      return matchesCategory && matchesHashtag && matchesYear && matchesCity && matchesQuery;
    });

    setFilteredObjects(filtered);
    setCurrentPage(1); // Сбрасываем текущую страницу на первую при новой фильтрации
    setFiltersApplied(true); // Указываем, что фильтры были применены

    // Формирование текста примененных фильтров
    let filterDescription = 'Отфильтровано по:';
    if (category) filterDescription += ` категории "${category}"`;
    if (hashtag) filterDescription += `, хештегу "${hashtag}"`;
    if (year) filterDescription += `, году "${year}"`;
    if (city) filterDescription += `, городу "${city}"`;
    if (query) filterDescription += `, запросу "${query}"`;

    setAppliedFiltersText(filterDescription);

    console.log("Фильтрованные объекты:", filtered);
  };

  // Функция для сброса всех фильтров
  const handleResetFilters = () => {
    setFilteredObjects(objects);
    setCurrentPage(1);
    setFiltersApplied(false); // Сбрасываем состояние фильтров
    setAppliedFiltersText(''); // Очищаем текст примененных фильтров
  };

  // Определение объектов для текущей страницы
  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const currentObjects = filteredObjects.slice(indexOfFirstObject, indexOfLastObject);

  // Обработчик изменения страницы
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ paddingTop: 4 }}>
      {/* Описание для пользователя */}
      <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
      Тут ви можете знайти будь-який об'єкт за типом, роком, який ми робили, оцінити його і почитати про нього.
      </Typography>

      {/* SearchBar выводится над контейнером */}
      <SearchBar onFilter={handleFilter} />

      {/* Таблица с количеством объектов */}
      <Box sx={{ textAlign: 'center', marginTop: 2, marginBottom: 2 }}>
        <Typography variant="h6" color="textPrimary">
          Найдено объектов: {filteredObjects.length}
        </Typography>
      </Box>

      {/* Уведомление о примененных фильтрах и кнопка сброса фильтров */}
      {filtersApplied && (
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>
            {appliedFiltersText}
          </Typography>
          <Button variant="contained" color="error" onClick={handleResetFilters}>
            Удалить все фильтры
          </Button>
        </Box>
      )}

      <Container maxWidth="xl">
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {currentObjects.length > 0 ? (
                currentObjects.map((object) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={object._id}>
                    <ObjectCard object={object} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" align="center" sx={{ width: '100%' }}>
                  Объекты не найдены.
                </Typography>
              )}
            </Grid>

            {/* Пагинация */}
            {filteredObjects.length > objectsPerPage && (
              <Box
                display="flex"
                justifyContent="center"
                sx={{
                  marginTop: 4,
                  marginBottom: 4,
                }}
              >
                <Pagination
                  count={Math.ceil(filteredObjects.length / objectsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    button: {
                      fontSize: '1.2rem',
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ObjectList;
