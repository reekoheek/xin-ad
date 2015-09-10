(function(root) {
  'use strict';

  var xin = root.xin;

  xin.Component({
    is: 'admob-interstitial',

    behaviors: [xin.ContainerBehavior],

    properties: {
      adId: {
        type: String,
        required: true,
      },
    },

    ready: function() {
      if (!this.adId) {
        console.error('Advertisement id is undefined.');
        return;
      }

      var options;

      document.addEventListener('deviceready', function() {
        if (typeof AdMob === 'undefined') {
          console.error('No AdMob available or not running on device.');
          return;
        }

        options = {
          adId: this.adId,
          autoShow: false
        };

        AdMob.prepareInterstitial(options);
      }.bind(this));

      document.addEventListener('onAdDismiss',function(data){
        if(data.adType == 'interstitial') {
          AdMob.prepareInterstitial(options);
        }
      });
    },

    show: function() {
      return new Promise(function(resolve, reject) {
        var dismissed = function() {
          removeListener();
          resolve();
        };
        var removeListener = function() {
          document.removeEventListener('onAdDismiss', dismissed);
        };
        try {
          console.log('trying to show interstitial');
          if (AdMob) {
            AdMob.showInterstitial();
          }
          document.addEventListener('onAdDismiss', dismissed);
        } catch(e) {
          removeListener();
          reject(e);
        }
      });
    }
  });
})(this);
