const config = {
  port: process.env.PORT || 3000,
  db: process.env.MONGOLAB_URI || 'mongodb://localhost/imageapi',
  testdb: 'mongodb://localhost/imagetest',
  pixabayKey:  process.env.PIXBAYKEY
}
module.exports = config
