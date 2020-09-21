const express = require('express');
const bodyParser = require('body-parser');
const showdown = require('showdown');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

converter = new showdown.Converter();

app.post('/api/world', (req, res) => {
  fs = require('fs');
  // fs.readFile(__dirname + '/posts/react-v16.13.0.md', 'utf8', function (
  fs.readFile(
    __dirname + '/posts/React v16.13.0 is VERY cool!.md',
    'utf8',
    function (err, data) {
      if (err) {
        return console.log(err);
      }
      text = data;
      html = converter.makeHtml(text);
      res.send(html);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
