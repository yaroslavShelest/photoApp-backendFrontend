// src/components/CustomCursor.js
import React, { useEffect } from 'react';
import '../styles/cursor.css'; // Подключаем CSS для кастомного курсора

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
    };

    // Слушаем движение мыши
    window.addEventListener('mousemove', moveCursor);

    return () => {
      // Удаляем обработчик событий и сам элемент при удалении компонента
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
};

export default CustomCursor;
