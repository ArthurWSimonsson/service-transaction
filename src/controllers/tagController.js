const fetch = require('node-fetch');
require("dotenv").config();

exports.requestTagUUID = async (tagName) => {
    

    let result; 
    await fetch(process.env.TAG_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: tagName})
    })
    .then(res => res.json())
    .then(json => result = json)

    return result
}




