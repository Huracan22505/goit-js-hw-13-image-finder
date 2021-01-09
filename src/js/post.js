const BASE_URL = 'http://localhost:3000';

const newBook = {
  title: 'Тестовая книга по CSS',
  author: 'Я',
  genres: ['JS'],
  rating: 9,
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newBook),
};

fetch(`http://localhost:3000/books`, options)
  .then(res => res.json())
  .then(console.log());
