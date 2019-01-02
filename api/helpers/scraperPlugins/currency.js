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
  currency: [
    // Schema.org support
    wrap($ => $('[itemprop="priceCurrency"]').attr('content')),
    // Open Graph support
    wrap($ => $('meta[property="og:price:currency"]').attr('content')),
  ],
});
