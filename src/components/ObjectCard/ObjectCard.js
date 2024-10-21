import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

const ObjectCard = ({ object }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%', // Добавляем 100% высоты для карточки
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Разделяем содержимое и кнопку
        borderRadius: 4,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <CardActionArea component={Link} to={`/object/${object._id}`} sx={{ flexGrow: 1 }}>
        {/* Изображение объекта */}
        {object.images && object.images.length > 0 ? (
          <CardMedia
            component="img"
            height="200"
            image={object.images[0]}
            alt={object.title}
            sx={{
              objectFit: 'cover',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
        ) : (
          <CardMedia
            component="img"
            height="200"
            image="https://via.placeholder.com/345x200.png?text=Нет+изображения"
            alt="Нет изображения"
            sx={{
              objectFit: 'cover',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
        )}

        <CardContent sx={{ flexGrow: 1 }}> {/* Расширяем CardContent, чтобы занимало все пространство */}
          {/* Заголовок объекта */}
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {object.title}
          </Typography>

          {/* Описание объекта */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {object.description.length > 100 ? `${object.description.substring(0, 100)}...` : object.description}
          </Typography>

          {/* Категория и хештеги */}
          <Stack spacing={1} sx={{ mb: 2 }}>
            {object.category && (
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'medium' }}>
                <strong>Категория:</strong> {object.category}
              </Typography>
            )}
            {object.hashtags && object.hashtags.length > 0 && (
              <Typography variant="body2" color="text.primary">
                <strong>Хештеги:</strong> {object.hashtags.join(', ')}
              </Typography>
            )}
            {object.city && (
              <Typography variant="body2" color="text.secondary">
                Город: {object.city}
              </Typography>
            )}
            {object.year && (
              <Typography variant="body2" color="text.secondary">
                Год: {object.year}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>

      {/* Кнопка для перехода на страницу объекта */}
      <Box sx={{ padding: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/object/${object._id}`}
          startIcon={<InfoIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: 20,
            paddingX: 3,
            paddingY: 1,
          }}
        >
          Подробнее
        </Button>
      </Box>
    </Card>
  );
};

export default ObjectCard;
