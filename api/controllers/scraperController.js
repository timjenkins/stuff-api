const validateInput = require('../helpers/validateInput');
const got = require('got');
const urldecode = require('urldecode');
const author = require('metascraper-author')();
const date = require('metascraper-date')();
const description = require('metascraper-description')();
const image = require('metascraper-image')();
const title = require('metascraper-title')();
const theurl = require('metascraper-url')();
const price = require('../helpers/scraperPlugins/price')();
const currency = require('../helpers/scraperPlugins/currency')();
const metascraper = require('metascraper')([
  author,
  price,
  currency,
  date,
  description,
  image,
  title,
  theurl,
]);

const scraperController = {
  scraper: (req, res) => {
    validateInput(req, res, () => {
      // res.status(200).send(req.body.url)
      const targetUrl = urldecode(req.body.url);
      (async () => {
        const { body: html, url } = await got(targetUrl);
        const metadata = await metascraper({ html, url });
        res.status(200).send(metadata);
      })();
    });
  },
};

module.exports = scraperController;
