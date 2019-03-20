var axios = require('axios')
var client = axios.create({
    baseURL: 'http://localhost:3000/api/v1/'
})

module.exports = client
