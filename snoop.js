var inject = '('+function() {
  // taken from adapter.js, written by me
  ['createOffer', 'createAnswer',
      'setLocalDescription', 'setRemoteDescription'].forEach(function(method) {
    var nativeMethod = webkitRTCPeerConnection.prototype[method];
    webkitRTCPeerConnection.prototype[method] = function() {
      // TODO: serialize arguments
      var self = this;
      this.addEventListener('icecandidate', function() {
        //console.log('ice candidate', arguments);
      }, false);
      window.postMessage(['WebRTCSnoop', window.location.href, method], '*');
      return nativeMethod.apply(this, arguments);
    };
  });
}+')();';
var script = document.createElement('script');
script.textContent = inject;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);

var channel = chrome.runtime.connect();
window.addEventListener('message', function (event) {
    if (typeof(event.data) === 'string') return;
    if (event.data[0] !== 'WebRTCSnoop') return;
    channel.postMessage(event.data);
});
