const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js')();
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());


app.get('/webhook/:key', (req, res) => {
    res.send(req.params.key);
    console.log(genres);
    console.log(shows);
})

function setResponse(obj) {
    var response = {
        "fullfillmentMessages": []
    };
    obj.shows.map((item) => {
        response.fullfillmentMessages.push({
                "payload": {
                    "richContent": [{
                            "title": item.name,
                            "type": "description",
                            "text": [
                                item.air_date,
                                item.overview
                            ]
                        },
                        {
                            "type": "divider"
                        },
                    ]
                }
            }

        )
    })
   
    return response;
}

// app.post('/webhook', (req, res) => {
//     console.log("Got a post request");
//     if (!req.body) return res.sendStatus(400);
//     res.setHeader('Content-Type', 'application/json');
//     console.log("Post req is :");
//     console.log(req.body);
//     console.log("Parameters : " + req.body.queryResult.parameters['genre']);
//     var genreToSend = req.body.queryResult.parameters['genre'];
//     for (var genreType in shows) {
//         if (genreToSend === genreType) {
//             const resp = setResponse(eval(`shows.${genreType}`)); 
//             resp.fullfillmentText = `Here are some ${genreType} shows`;
//             return res.json(resp);
//         }
//     }
// })


app.post('/webhook', (req, res) => {
    console.log("Got a post request");
    if (!req.body) return res.sendStatus(400);
    console.log("Post req is :");
    console.log(req.body);
    console.log("Parameters : " + req.body.queryResult.parameters['genre']);
    var genreToSend = req.body.queryResult.parameters['genre'];
    for (var genreType in shows) {
        if (genreToSend === genreType) {
            var resp = {
                "fullfillmentMessages": [
                    {
                        "text" : {
                            "text":[
                                "HEROKU RETURNS",
                                "HAHAHHA"

                            ]
                        }
                    }
                ]
            };
            return res.send(resp);
        }
    }
})


app.listen(port, () => console.log('Server started on port' + port));