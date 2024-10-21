import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid } from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ObjectPage = () => {
  const { id } = useParams();
  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/objects/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка при получении данных объекта');
        }
        const data = await response.json();
        setObject(data);
      } catch (error) {
        setError('Ошибка при получении объекта');
        console.error('Ошибка при получении объекта:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchObject();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6">Загрузка...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!object) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6">Объект не найден.</Typography>
      </Box>
    );
  }

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setOpen(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        {object.title}
      </Typography>
      <Typography variant="body1" gutterBottom align="center">
        {object.description}
      </Typography>

      {/* Основное изображение */}
      <Box sx={{ maxWidth: '800px', margin: 'auto', mb: 4 }}>
        {object.images.length > 0 && (
          <Box onClick={() => handleImageClick(0)} sx={{ cursor: 'pointer' }}>
            <img
              src={`http://localhost:5000${object.images[0]}`}
              alt="Основное изображение"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                objectFit: 'cover',
                maxHeight: '500px',
              }}
            />
          </Box>
        )}
      </Box>

      {/* Миниатюры */}
      <Grid container spacing={2} justifyContent="center">
        {object.images.map((image, index) => (
          <Grid item key={index} onClick={() => handleImageClick(index)}>
            <img
              src={`http://localhost:5000${image}`}
              alt={`Миниатюра ${index + 1}`}
              style={{
                width: '80px', // Маленький размер миниатюр
                height: '80px',
                cursor: 'pointer',
                borderRadius: '5px',
                objectFit: 'cover',
                margin: '0 5px',
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Информация об объекте */}
      <Grid container spacing={2} sx={{ textAlign: 'center', mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="textSecondary">
            <strong>Категория:</strong> {object.category}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="textSecondary">
            <strong>Год:</strong> {object.year}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="textSecondary">
            <strong>Хештеги:</strong> {object.hashtags.join(', ')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="textSecondary">
            <strong>Город:</strong> {object.city}
          </Typography>
        </Grid>
      </Grid>

      {/* Lightbox для просмотра изображений в полном размере */}
      {open && (
        <Lightbox
          slides={object.images.map((src) => ({ src: `http://localhost:5000${src}` }))}
          index={photoIndex}
          open={open}
          close={() => setOpen(false)}
          onIndexChange={(index) => setPhotoIndex(index)}
        />
      )}
    </Box>
  );
};

export default ObjectPage;
