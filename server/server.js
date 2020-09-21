const express = require('express');
const bodyParser = require('body-parser');
const showdown = require('showdown');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

converter = new showdown.Converter();

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Expressas' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

fs = require('fs');
fs.readFile(__dirname + '/posts/react-v16.13.0.md', 'utf8', function (
  err,
  data
) {
  if (err) {
    return console.log(err);
  }
  text = data;
  html = converter.makeHtml(text);
  // res.json(['markdown', html]);
  // console.log(data);
  console.log(html);
});
console.log('dd: ', __dirname);

app.listen(port, () => console.log(`Listening on port ${port}`));
