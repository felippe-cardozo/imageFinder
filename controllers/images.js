const key = require('../config').pixabayKey
const Pb = require('../pixabay')
const SearchHistory = require('../models/search')

exports.find = (req, res) => {
  const searchQuery = req.params.search
  const offset = req.query.offset || 1
  const params = {page: offset}
  const PbSearch = new Pb(key, searchQuery, params)

  const newHistory = new SearchHistory({
    term: searchQuery,
    when: new Date
  })
  newHistory.save((err, data) => {
    if (err) throw err
    console.log(`saving data: ${data}`)
  })

  PbSearch.get((err, data) => {
    if (err) throw err
    let hits = JSON.parse(data).hits
    let results = []
    for (let i in hits) {
      var result = {
        url: hits[i].pageURL,
        thumbnail: hits[i].previewURL,
      }
      if (result) results.push(result)
    }
    results = (JSON.stringify(results))
    res.json(results)
  })
}

exports.history = (req, res) => {
  let query = SearchHistory.find({}, '-_id term when').sort({'when': -1}).limit(10)
  let results
  query.exec((err, data) => {
    if (err) throw err
    results = data
    res.json(JSON.stringify(results))
  })
}
