const express = require('express');
const bodyParser = require('body-parser');
const showdown = require('showdown');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

converter = new showdown.Converter();

// reading the names of all files in the folder
let filePath = '';
fs = require('fs');
fs.readdir(__dirname + '/posts', (err, files) => {
  if (err) console.log(err);
  else {
    console.log('\nCurrent directory filenames:');
    files.forEach((file) => {
      filePath = file;
    });
  }
});

// converting a file from .md to .html and send it to client
app.post('/api', (req, res) => {
  fs = require('fs');
  fs.readFile(__dirname + '/posts/' + filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    text = data;
    html = converter.makeHtml(text);
    const toSend = filePath + '//' + html;
    res.send(toSend);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
