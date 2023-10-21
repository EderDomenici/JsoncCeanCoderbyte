const axios = require('axios');

const apiUrl = 'https://coderbyte.com/api/challenges/json/json-cleaning';

let data = null

axios.get(apiUrl)
    .then(response => {
        countRemove = 0
        data = response.data
        console.log(data)
        Object.keys(data).forEach(key => {
            if(data[key] === 'N/A' || data[key] === '' || data[key] === '-') {
                delete data[key]
                countRemove++
            } else if(Array.isArray(data[key])) {
               for(let i = 0; i < data[key].length; i++) {
                   if(data[key][i] === 'N/A' || data[key][i] === '' || data[key][i] === '-') {
                       data[key].splice(i, 1)
                       countRemove++
                   }
               }

            } else if(typeof data[key] === 'object'){
                Object.keys(data[key]).forEach(key2 => {
                    if(data[key][key2] === 'N/A' || data[key][key2] === '' || data[key][key2] === '-') {
                        delete data[key][key2]
                        countRemove++
                    }
                })
            }

        })
        
        data["items_removed"] = countRemove
        console.log(data)
    })

