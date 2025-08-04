const express = require('express');
const cors = require('cors');
const { generateBooks } = require('./bookGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://bdgentask5.netlify.app',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Book Generator API is running successfully!');
});
// ------------------------------

app.get('/api/books', (req, res) => {
  const { locale = 'en_US', seed = 123, page = 1, likesError = 0, reviewsError = 0 } = req.query;

  try {
    const books = generateBooks({
      locale,
      seed,
      page,
      likesError,
      reviewsError
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate data', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`📖 Book Generator server is running port:${PORT}`);
});