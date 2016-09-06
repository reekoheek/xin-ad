(function(root) {
  'use strict';

  var xin = root.xin;

  xin.Component({
    is: 'admob-banner',

    behaviors: [xin.ContainerBehavior],

    properties: {
      adId: {
        type: String,
        required: true,
      },

      position: {
        type: String,
        value: 'BOTTOM_CENTER',
      },

      autoShow: {
        type: Boolean,
        value: true
      }
    },

    ready: function() {
      if (!this.adId) {
        console.error('Advertisement id is undefined.');
        return;
      }

      if (typeof window.cordova === 'undefined') {
        console.warn('admob-banner only work for cordova');
      }

      document.addEventListener('deviceready', function() {
        if (typeof AdMob === 'undefined') {
          console.error('No AdMob available or not running on device.');
          return;
        }

        var options = {
          adId: this.adId,
          position: AdMob.AD_POSITION[this.position],
          autoShow: false
        };

        AdMob.createBanner(options);

      }.bind(this));

      if (this.autoShow) {
        document.addEventListener('onAdLoaded',function(data){
          if(data.adType == 'banner') {
            this.show();
          }
        }.bind(this));
      }
    },

    show: function() {
      AdMob.showBanner(AdMob.AD_POSITION[this.position]);
    },

    hide: function() {
      AdMob.hideBanner();
    }
  });
})(this);
