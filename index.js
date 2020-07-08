const express = require('express');
const axios = require('axios').default;
const app = express();
const port = 7000;

app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname + '/public/'}));

app.post('/', function(req, res){

    let body = '';
    req.on('data', function(chunk){
        body += chunk.toString();
    });
    req.on('end', function(){
        console.log(body);
        let subreddit = body.split('=')[1];

        axios.get('https://www.reddit.com/r/' + subreddit + '.json')
          .then(function (response) {
            // handle success
            console.log(response.data);
            res.json(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
