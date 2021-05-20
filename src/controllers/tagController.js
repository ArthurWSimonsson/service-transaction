const fetch = require('node-fetch');
require("dotenv").config();

// Requests tag from tag service
exports.requestTagUUID = async () => {
    let tagList = ['Office supplies', 'Food', 'Trip']
    tag = tagList[Math.floor((Math.random() * tagList.length))]

    let result; 
    await fetch(process.env.TAG_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: tag})
    })
    .then(res => res.json())
    .then(json => result = json)

    return result
}




