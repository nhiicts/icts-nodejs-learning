const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screenIt', (text) => {
  return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', e => {
    if (e) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Welcome to my website',
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
});



app.listen(3000, () => {
  console.log('Server is up on port 3000');
});