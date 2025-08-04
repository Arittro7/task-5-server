// index.js
const express = require('express')
const cors = require('cors')
const bookGenerator = require('./bookGenerator')

const app = express()
const port = 5000

// simple CORS setup
app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
  res.send('📚 Book Generator API is running!')
})

app.get('/api/books', function (req, res) {
  try {
    var query = req.query
    var books = bookGenerator.generateBooks(query)
    res.json(books)
  } catch (err) {
    console.log('❌ Error:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

app.listen(port, function () {
  console.log('📖 Server is running on http://localhost:' + port)
})
