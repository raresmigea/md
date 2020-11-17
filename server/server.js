import express from 'express';
import { json, urlencoded } from 'body-parser';
import { Converter } from 'showdown';

const app = express();
const port = process.env.PORT || 5000;

app.use(json());
app.use(urlencoded({ extended: true }));
converter = new Converter();

// reads the names of all files in the folder
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

// converts a file from md to html and sends it to client
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

app.listen(port, () => console.log(`Listening on port: ${port}`));
