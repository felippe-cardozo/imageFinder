const mongoose = require('mongoose')

const SearchHistory = mongoose.model('SearchHistory', {
  term: String,
  when: Date,
})

module.exports = SearchHistory
