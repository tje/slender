Slender
=======

Web injection paying tribute to [Slender: The Arrival](http://www.slenderarrival.com/) (an excellent
video game!).

Usage
-----

Including `slender.js` creates a `Slender` global variable in the window space. The method `arrive`
will begin the page override process. There are several parameters that may be configured before
`arrive` is invoked.

Dependencies include [jQuery](https://github.com/jquery/jquery), 
[html2canvas](https://github.com/niklasvh/html2canvas), and 
[glitch.js](https://github.com/sjhewitt/glitch.js). These must be loaded before `slender.js`.

``` javascript
Slender.setOptions({
  // Path to the audio track that is skipped across during the "stutter" effect
  audioStutter:   'media/slender1.mp3',
  
  // Path to the audio track that is played once when stutter threshold is met
  audioSlender:   'media/slender2.mp3',
  
  // Path to the video to play once the stutter threshold is met
  videoSlender:   'media/slender.mp4',
  
  // Number of scrambled page renders to build and randomly cycle through (higher is dangerous)
  glitchLayers:   5,
  
  // Stutter threshold - # of stutters to occur before Slender "arrives"
  glitchesUntilSlender: 50,
});

// This will start the "arrival" process - clicking anywhere on the page will begin the random
// stutter effect, increasing in frequency with each stutter or mousemove event.
Slender.arrive();
```

It may be worth noting that, optionally, `slender.media.js` may be loaded after `slender.js` to
include the media for the injection by way of data URIs.