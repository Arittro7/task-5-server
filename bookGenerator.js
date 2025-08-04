const fakerLib = require('@faker-js/faker')
const faker = fakerLib.faker

function getCount(rate) {
  const base = Math.floor(rate)
  const extra = Math.random() < (rate - base) ? 1 : 0
  return base + extra
}

function generateBooks(query) {
  const locale = query.locale || 'en'
  const seed = Number(query.seed) || 123
  const page = Number(query.page) || 1
  const likesError = parseFloat(query.likesError) || 0
  const reviewsError = parseFloat(query.reviewsError) || 0

  faker.locale = locale
  faker.seed(seed + page)

  const booksPerPage = page === 1 ? 20 : 10
  const startIndex = page === 1 ? 0 : 20 + (page - 2) * 10

  const books = []

  for (let i = 0; i < booksPerPage; i++) {
    const title = faker.commerce.productName()
    const author = faker.person.fullName()
    const reviewCount = getCount(reviewsError)
    const reviews = []

    for (let j = 0; j < reviewCount; j++) {
      reviews.push({
        author: faker.person.fullName(),
        text: faker.lorem.sentence()
      })
    }

    const book = {
      index: startIndex + i + 1,
      isbn: faker.string.uuid(),
      title: title,
      author: author,
      publisher: faker.company.name(),
      likes: getCount(likesError),
      reviews: reviewCount,
      reviewDetails: reviews,
      // coverUrl: 'https://placehold.co/300x400/596E79/EAE0D5?text=' + encodeURIComponent(title)
    }

    books.push(book)
  }

  return books
}

module.exports = {
  generateBooks: generateBooks
}
