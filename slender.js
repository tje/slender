var Slender = new (function($) {

  this.autoArrive =               false;
  
  this.glitchLayers =             5;
  this.glitchesUntilSlender =     50;
  this.glitchStartFrequency =     0.9;
  this.glitchFreqDecayMouse =     0.005;
  this.glitchFreqDecayStutter =   0;
  this.glitchFrequencyMin =       0.4;
  this.glitchSpeed =              55;
  
  this.audioStutter =             'media/slender1.ogg';
  this.audioSlender =             'media/slender2.ogg';
  this.videoSlender =             'media/slender.mp4';
  
  this.audioTypeStutter =         'audio/ogg';
  this.audioTypeSlender =         'audio/ogg';
  this.videoTypeSlender =         'video/mp4';
  
  var _cycles =                   0;
  var _renderedCanvases =         0;
  var _layerContainer =           '#slender-overlay';
  var _frequency =                0;
  var _stutterStarted =           false;
  var _audioStutter =             null;
  var _audioSlender =             null;
  var _videoSlender =             null;
  var _stutterInterval =          null;
  
  var _this = this;
  
  this._renderGlitchLayers = function() {
    for (var i = 0; i < _this.glitchLayers; i++) {
      $('body').glitch({
        amount:   Math.floor(Math.random() * 10),
        complete: _this._pushLayer,
      });
    }
  }
  
  this._pushLayer = function(canvas) {
    $(_layerContainer).append(canvas);
    _renderedCanvases++;
    if (_renderedCanvases === _this.glitchLayers - 1) {
      _this._run();
    }
  }
  
  this._prepareScreen = function() {
    $(_layerContainer).show();
    
    $('body').append('<video id="slender-video" type="' + _this.videoTypeSlender + '" src="' + _this.videoSlender + '" width="1600" height="900"></video>');
    $('body').append('<audio id="slender-audio-slender" type="' + _this.audioTypeSlender + '" src="' + _this.audioSlender + '"></audio>');
    $('body').append('<audio id="slender-audio-stutter" type="' + _this.audioTypeStutter + '" src="' + _this.audioStutter + '" loop></audio>');
    $('body').append('<div id="slender-blackout" />');
    
    if ($('#slender-video').height() < document.height) {
      $('#slender-video').css({
        width: 'auto',
        height: '100%',
      });
      $('#slender-video').css('left', (document.width / 2) - ($('#slender-video').width() / 2));
    }
    
    _audioStutter = document.getElementById('slender-audio-stutter');
    _audioSlender = document.getElementById('slender-audio-slender');
    _videoSlender = document.getElementById('slender-video');
  }
  
  this._setupEvents = function() {
    $(document).bind('click.slender', function(e) {
      e.preventDefault();
      _this._triggerStutter();
      $(document).unbind('mousemove.slender').bind('mousemove.slender', function(e) {
        if (_frequency > _this.glitchFrequencyMin) {
          _frequency = Math.max(_this.glitchFrequencyMin, _frequency -= _this.glitchFreqDecayMouse);
        } else {
          $(document).unbind('mousemove.slender');
        }
      });
      $(document).unbind('click.slender');
    });
    
    _stutterInterval = setInterval(function() {
      if (_stutterStarted === false) {
        return false;
      }
      
      if (Math.random() >= _frequency) {
        if (_cycles >= _this.glitchesUntilSlender) {
          _audioStutter.pause();
          clearInterval(_stutterInterval);
          
          $('#slender-video').show();
          _videoSlender.play();
          
          $('#slender-blackout').show();
          
          _audioSlender.play();
          $(_layerContainer).hide();
          
          setTimeout(function() {
            $('#slender-video').hide();
          }, 3000);
          
          return;
        }
        
        _this._triggerStutter();
      } else {
        $(_layerContainer + ' canvas').hide();
        _audioStutter.pause();
      }
    }, _this.glitchSpeed);
  }
  
  this._triggerStutter = function() {
    _stutterStarted = true;
    $(_layerContainer + ' canvas').hide().eq(Math.floor(Math.random() * _this.glitchLayers)).show();
    _frequency = Math.max(_this.glitchFrequencyMin, _frequency -= _this.glitchFreqDecayStutter);
    if (_audioStutter.paused === true) {
      _audioStutter.currentTime = Math.random() * _audioStutter.duration;
      _audioStutter.play();
    }
    _cycles++;
  }
  
  this._run = function() {
    _frequency = _this.glitchStartFrequency;
    _this._prepareScreen();
    _this._setupEvents();
  }
  
  this.arrive = function() {
    if ($(_layerContainer).length === 0) {
      $('<div id="' + _layerContainer.substr(1) + '" />').appendTo('body');
      $('head').append('<style type="text/css">' + _layerContainer + ', ' + _layerContainer + ' > canvas { position:absolute; top:0px; left:0px; display:none; z-index:99998 } #slender-video { display:none; position:fixed; top:0px; left:0px; width:100%; height:auto; z-index:99999 } #slender-blackout { display:none; position:fixed; top:0px; left:0px; width:100%; height:100%; z-index:99997; background:#111; }</style>');
    }
    _this._renderGlitchLayers();
  }
  
  this.setOptions = function(opts) {
    if (!$.isPlainObject(opts)) {
      return _this;
    }
    for (var i in opts) {
      if (opts.hasOwnProperty(i) && _this.hasOwnProperty(i)) {
        _this[i] = opts[i];
      }
    }
    return _this;
  }
  
  $(document).ready(function() {
    if (_this.autoArrive === true) {
      _this.arrive();
    }
  });
  
  return _this;
})(jQuery);