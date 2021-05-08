const fetch = require('node-fetch');

exports.requestTagUUID = async (tagName) => {
    

    let result; 
    await fetch('http://localhost:3005/api/tag', {
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




