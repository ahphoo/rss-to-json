const express = require('express');
const Parser = require('rss-parser');
const PORT = process.env.PORT || 5000;

const FEED_LIST = [
  'https://hnrss.org/frontpage',
];

let app = express();

app
  .get('/', (req, res) => {
    let parser = new Parser();

    const feedRequests = FEED_LIST.map(feed => {
      return parser.parseURL(feed);
    })

    Promise.all(feedRequests).then(response => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Origin', 'some-domain-to-allow.com');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.json(response);
    })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));