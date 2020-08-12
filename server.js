const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = 3000;
const axios = require('axios');
const request = require('request');

// Finding a public directory
const publicDirectory = path.join(__dirname, '/public');
// Setting express to use the static files from public directory
app.use(express.static(publicDirectory));

const viewsPath = path.join(__dirname, '/views');

// setting node.js view engine to use handlebars files
app.set('view engine', 'hbs');
//setting the views from HBS to come from our views path variable
app.set('views', viewsPath);
app.use(express.static('views/images'));

// Parse URL- encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
  const randomJoke = 'https://api.chucknorris.io/jokes/random';
  // apiResponse1 = axios.get(randomJoke);

  request({ url: randomJoke, json: true }, (error, apiResponse) => {
    if (error) {
      res.send('There was an error');
    } else {
      res.render('index', { joke: apiResponse.body.value });
    }
  });
});

app.post('/results', async (req, res) => {
  try {
    const category = req.body.category;
    const jokeUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const apiResponse = await axios.get(jokeUrl);

    res.render('joke', {
      joke: apiResponse.data.value,
    });
  } catch (e) {
    console.log('error');
  }
});

app.get('*', (req, res) => {
  res.render('error');
});

app.listen(port, () => console.log(`Example app listening on port port!`));
