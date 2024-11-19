# Tampermonkey Scripts Collection

Making life just a little easier on various websites with simple user interface improvements.

## Description

This repo hosts a handful of different script files that Tampermonkey injects into the relevant websites. Certain websites just seemed to be missing something or something simple could really improve the functionality. I took it upon myself to add these features in the most seamless way possible. If you encounter any issues, check the known issues below. Uses [Standard JS formatting][standard].

## Getting Started

### Dependencies

Tampermonkey browser extension (download links)

[Chrome][tampermonkey-chrome] | [Firefox][tampermonkey-firefox] | [Safari][tampermonkey-safari] | [Edge][tampermonkey-edge] | [Opera][tampermonkey-opera]

### Installation

Visit my profile the [OpenUser website](https://openuserjs.org/users/zachhardesty7/scripts) or the [GreasyFork website](https://greasyfork.org/en/users/371100-zach-hardesty) to download and install any scripts! Scripts are automatically kept up to date with this repository.

### Execution

Code will automatically execute on the designated websites!

## Usage / Descriptions

- [Soundcloud][soundcloud]
  - [soundcloud-download-button.user.js](soundcloud-download-button.user.js): Add seamless download button that uses an external service for any track ![soundcloud external download button][soundcloud-img]
- Google Search
  - [google-hide-search-interruptions.user.js](google-hide-search-interruptions.user.js): simple script that hides the "People also search for" prompt that sometimes appears when returning to the same search results
- [Etsy][etsy]
  - [etsy-remove-ads.user.js](etsy-remove-ads.user.js): hide ad results on search page
- Github
  - [github-inactive-dev-warning.user.js](github-inactive-dev-warning.user.js): add a large or giant banner if project hasn't been updated in 6 months or 1+ years respectively
- YouTube
  - [youtube-filter-subscriptions-page.user.js](youtube-filter-subscriptions-page.user.js): filter out videos on subscription page and home page based on given keyword
  - [youtube-add-watch-later-button.user.js](youtube-add-watch-later-button.user.js): add a watch later button underneath videos to save you a click (on a slow popup menu)
  - [youtube-add-playlist-remove-video-button.user.js](youtube-add-playlist-remove-video-button.user.js): add a remove button next to each video on each playlist page
- Amazon
  - [amazon-clean-ui.user.js](amazon-clean-ui.user.js): hide all of the junk that clutter Amazon's UI (biased decisions)
- Reddit
  - [reddit-improve-saved-comments.user.js](reddit-improve-saved-comments.user.js): add a save button to all comments everywhere & to posts in the saved section of your profile
- Randalls
  - [randalls-add-links-inside-cart.user.js](randalls-add-links-inside-cart.user.js): add links to products in your cart by fixing missing href on `<a />` tag
- [Swagbucks gift cards][swagbucks-gift-cards]
  - [swagbucks-sort-gift-cards-by-cashback.user.js](swagbucks-sort-gift-cards-by-cashback.user.js): add links to products in your cart by fixing missing href on `<a />` tag
- FrankerFaceZ (Twitch)
  - [debug-ffz-twitch-compressor.user.js](debug-ffz-twitch-compressor.user.js): not for general use, but I found it useful for configuring my settings for the FFZ extension audio compressor

_For more information on Tampermonkey itself, please refer to their [website][tampermonkey-website]._

### Archived

These scripts will no longer be maintained or updated by myself. They are kept here for historical purposes. Feel free to submit a PR if you'd like to help update one of them!

- [Binance][binance]
  - [binance-btc-usd.user.js](binance-btc-usd.user.js): Add text to display current amounts of crypto in approx. USD value ![balance line with USD conversion][binance-img-bal]
  - [binance-portfolio-distribution-chart.user.js](binance-portfolio-distribution-chart.user.js): Add chart.js pie chart to display distribution of portfolio holdings ![pie chart of ratios][binance-img-pie]
- [Google Docs][gdocs]
  - [google-docs-force-center.user.js](google-docs-force-center.user.js): Center document on screen and prevent horizontal scrolling
  - [google-docs-word-count.user.js](google-docs-word-count.user.js): Separate count for seeing word count of selected text ![footer count][docs-img]
- [Harvest][harvest]
  - [harvest-hourly-pay.user.js](harvest-hourly-pay.user.js): Display pre-tax income based on clocked hours, must update with pay rate, defaults to \$16 / hour ![conversion next to hours worked][harvest-img]
- Mint (shut down)
  - [mint-clean-ui.user.js](mint-clean-ui.user.js): removes annoying and inconspicuous ads from Mint
- Piazza
  - [piazza-archive-with-delete-key.user.js](piazza-archive-with-delete-key.user.js): bind the delete key to quickly archive posts

## Known Issues

- ONLY TESTED ON CHROME
- Binance
  - Unnecessary usage of 'onElementReady.js'
- Soundcloud
  - Button does not appear on all types of pages
- Docs
  - Requires user to scroll throughout document to counteract lazy loading of page content
  - Selecting text while using filters can cause some funky word counts (regex would get far too complicated to realistically fix these issues)
  - Uses 15.4 KB library to determine selected text that's slightly overkill and results in text being processed twice

## Contributing

1. Fork it (<https://github.com/zachhardesty7/tamper-monkey-scripts-collection/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Copyright 2018 Zachary Hardesty

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[Full Apache 2.0 License Source](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Acknowledgements

- [Javascript Standard Style][standard] - strictly enforced guide of good practices (and no semicolons)
- [Chart.js][chartjs] - Simple HTML5 Charts using the canvas element
- [CryptoCompare API][api] - The best free API for getting cryptocurrency live pricing data
- [onElementReady.js][waitjs] - A utility function, for Greasemonkey scripts, that detects and handles AJAX content.
- [JQuery][jquery] - jQuery is a fast, small, and feature-rich JavaScript library. (Only used because above library requires it.)
- [SoundCloud to MP3][soundclouddownload] - With SoundCloud MP3 you can convert and download music in High Quality MP3 format.
- [ChangeValueDetection][detectorjs] - Simple interval observer to detect change from user, JS, or anything else
- [Google Docs Word Count][docs-greasemonkey] - Inspiration for my script, changed formatting, style, and added a few filtering options
- interesting UserScript tools
  - [UserGui](https://github.com/AugmentedWeb/UserGui)
  - [Userscripter](https://github.com/SimonAlling/userscripter)

<!-- Markdown link & img definitions -->

[binance]: https://www.binance.com
[harvest]: https://www.getharvest.com/
[soundcloud]: https://soundcloud.com/
[gdocs]: https://www.google.com/docs/about/
[etsy]: https://www.etsy.com/
[swagbucks-gift-cards]: https://www.swagbucks.com/mygiftcardsplus
[standard]: https://github.com/standard/standard
[chartjs]: https://github.com/chartJS/Chart.js
[api]: https://min-api.cryptocompare.com/
[waitjs]: https://gist.github.com/BrockA/2625891
[jquery]: https://jquery.com/
[soundclouddownload]: https://soundcloudmp3.org/
[detectorjs]: https://gist.github.com/inter-coder/d674758f727fa866f9e9
[docs-greasemonkey]: https://greasyfork.org/en/scripts/22057-google-docs-wordcount/code
[tampermonkey-chrome]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
[tampermonkey-edge]: https://www.microsoft.com/en-us/store/p/tampermonkey/9nblggh5162s?rtc=1
[tampermonkey-safari]: https://safari.tampermonkey.net/tampermonkey.safariextz
[tampermonkey-firefox]: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
[tampermonkey-opera]: https://addons.opera.com/en/extensions/details/tampermonkey-beta/
[tampermonkey-website]: https://tampermonkey.net/
[harvest-img]: ./readme/harvest.png
[binance-img-pie]: ./readme/pie.png
[binance-img-bal]: ./readme/balUSD.png
[soundcloud-img]: ./readme/soundcloud.png
[docs-img]: ./readme/docs.png
