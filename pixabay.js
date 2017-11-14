// const request = require('request')
const https = require('https')

class Pb {
  constructor(key, q, params) {
    this.key = key
    this.q = q
    this.params = params
  }
  genUrl() {
    let core_url = `https://pixabay.com/api/?key=${this.key}&q=${this.q}`
    if (this.params) {
      Object.keys(this.params).forEach((key) => {
        core_url += `&${key}=${this.params[key]}`
      })
    }
    return core_url
  }

  // get(cb) {
  //   var url = this.genUrl()
  //   console.log(url)
  //   request.get(this.genUrl(), (err, response, body) => {
  //     if (err) return cb(err)
  //     return cb(null, body)
  //   })
  // }

  get(cb) {
    var url = this.genUrl()
    https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        return cb(null, data)
      })
      res.on('error', (err) => {
        return cb(err)
      })
    })
  }
}


module.exports = Pb
