process.env.NODE_ENV = 'test'

const app = require('./app')
const request = require('supertest')
const SearchHistory = require('./models/search')

describe('GET /api/imagesearch', () => {
  it('should return 200', (done) => {
    const url = '/api/imagesearch/cats'
    request(app)
      .get(url)
      .expect(200, done)
  })
})

describe('GET /api/latest/imagesearch/', () => {
  it('should return 200', (done) => {
    let cats = new SearchHistory({term: 'cats', when: new Date})
    cats.save((err, data) => {
      if (err) throw err
      request(app).get('/api/latest/imagesearch').expect(200, done)
    })
  })
})
