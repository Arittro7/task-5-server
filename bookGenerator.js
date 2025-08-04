const { faker } = require('@faker-js/faker');

function generateBooks(options) {
  // defaults
  const locale = options.locale || 'en_US';
  const seed = Number(options.seed || 123);
  const page = Number(options.page || 1);
  const likesError = Number(options.likesError || 0);
  const reviewsError = Number(options.reviewsError || 0);

  // set faker config
  faker.locale = locale;
  faker.seed(seed + page);

  const books = [];

  // generate 20 books per page
  for (let i = 0; i < 20; i++) {
    const book = {
      index: (page - 1) * 20 + i + 1,
      isbn: faker.string.uuid(),
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      publisher: faker.company.name(),
      likes: Math.floor(Math.random() * 10) + likesError,
      reviews: Math.floor(Math.random() * 10) + reviewsError
    };

    books.push(book);
  }

  return books;
}

module.exports = { generateBooks };
