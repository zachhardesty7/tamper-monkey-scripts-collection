# Tamper Monkey Scripts Collection

Making life just a little easier on some websites with simple user interface improvements.

## Description

This repo hosts a handful of different script files that Tampermonkey injects into the relevant websites. Certain websites just seemed to be missing something or something simple could really improve the functionality. I took it upon myself to add these features in the most seemless way possible. If you encounter any issues, check the known issues below. Uses [Standard JS formatting][standard].

## Getting Started

### Dependencies

Tampermonkey browser extension (download links)

[Chrome][tampermonkey-Chrome] | [Firefox][tampermonkey-Firefox] | [Safari][tampermonkey-Safari] | [Edge][tampermonkey-Edge] | [Opera][tampermonkey-Opera]

### Installation

* Download and compress all files in this repo into a .zip file.
* Import .zip into Tampermonkey under the utilities tab.

### Execution

Code will automatically execute on the proper website pages!

## Usage

* [Binance][binance]
    * Add text to display current amounts of crypto in approx. USD value ![][binance-img-bal]
    * Add chart.js pie chart to display distribution of portfolio holdings ![][binance-img-pie]
    * Add a few extra options for percent of holding to buy or sell ![][binance-img-exchange]
* [Harvest][harvest]
    * Display pre-tax income based on clocked hours, must update with pay rate, defaults to $16 / hour ![][harvest-img]
* [Soundcloud][soundcloud]
    * Add seemless download button that uses an external service for any track ![][soundcloud-img]

_For more information on Tampermonkey itself, please refer to their [website][tampermonkey-website]._

## Known Issues

* ONLY TESTED ON CHROME
* Binance
    * Interacting with new percentages does not trigger an official angular event so it's more of a visual indicator until you press 'buy' or 'sell'
    * Unnecessary usage of 'waitForKeyElements.js'
* Soundcloud
    * Button does not appear on all types of pages

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

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Acknowledgements
* [Javascript Standard Style][standard] - strictly enforced guide of good practices (and no semicolons)
* [Chart.js][chartjs] - Simple HTML5 Charts using the canvas element
* [CryptoCompare API][api] - The best free API for getting cryptocurrency live pricing data
* [WaitForKeyElements.js][waitjs] - A utility function, for Greasemonkey scripts, that detects and handles AJAXed content.
* [JQuery][jquery] - jQuery is a fast, small, and feature-rich JavaScript library. (Only used because above library requires it.)
* [SoundCloud to MP3][soundcloud-download] - With SoundCloud MP3 you can convert and download music in High Quality MP3 format.
* [ChangeValueDetection][detectorjs] - simple interval observer to detect change from user, JS, or anything else

<!-- Markdown link & img dfn's -->
[binance]: https://www.binance.com
[harvest]: https://www.getharvest.com/
[soundcloud]: https://soundcloud.com/
[standard]: https://github.com/standard/standard
[chartjs]: https://github.com/chartjs/Chart.js
[api]: https://min-api.cryptocompare.com/
[waitjs]: https://gist.github.com/BrockA/2625891
[jquery]: https://jquery.com/
[soundcloud-download]: https://soundcloudmp3.org/
[detectorjs]: https://gist.github.com/inter-coder/d674758f727fa866f9e9
[tampermonkey-chrome]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
[tampermonkey-edge]: https://www.microsoft.com/en-us/store/p/tampermonkey/9nblggh5162s?rtc=1
[tampermonkey-safari]: https://safari.tampermonkey.net/tampermonkey.safariextz 
[tampermonkey-firefox]: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
[tampermonkey-opera]: https://addons.opera.com/en/extensions/details/tampermonkey-beta/
[tampermonkey-website]: https://tampermonkey.net/
[harvest-img]: http://zachhardesty.com/github/harvest.png 
[binance-img-pie]: http://zachhardesty.com/github/pie.png
[binance-img-bal]: http://zachhardesty.com/github/bal.png
[binance-img-exchange]: http://zachhardesty.com/github/exchange.png
[soundcloud-img]: http://zachhardesty.com/github/soundcloud.png
