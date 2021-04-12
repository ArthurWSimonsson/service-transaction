const fetch = require('node-fetch');

exports.requestTagUUID = async () => {
    let tagList = ['Office supplies', 'Food', 'Trip']
    tag = tagList[Math.floor((Math.random() * tagList.length))]

    let result; 
    await fetch('http://localhost:3005/api/tag', {
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



