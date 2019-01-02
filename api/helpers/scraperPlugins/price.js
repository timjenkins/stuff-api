/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */


const wrap = rule => ({ htmlDom }) => rule(htmlDom);

/**
 * Rules.
 */

module.exports = () => ({
  price: [
    // Amazon
    wrap($ => $('.offer-price').html()),
    // Schema.org support
    wrap($ => $('[itemprop="price"]').attr('content')),
    // Open Graph support
    wrap($ => $('meta[property="og:price:amount"]').attr('content')),
    // Generic Fallback
    wrap($ => $('.price').text()),
  ],
});
