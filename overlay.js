(function() {
  "use strict"
  function Overlay(overlay) {
    this.html = overlay.html
    this.urlRegex = new RegExp(overlay.pattern)

    Overlay.prototype.createOverlay = function() {
      var overlayDiv = document.createElement('div')
      overlayDiv.innerHTML = this.html
      document.body.appendChild(overlayDiv)
    }

    Overlay.prototype.shouldOverlay = function() {
      return this.urlRegex.test(window.location.toString())
    }
  }

  chrome.storage.sync.get("overlays", function(data) {
    data.overlays.forEach(function(o) {
      var overlay = new Overlay(o)
      if (overlay.shouldOverlay()) {
        overlay.createOverlay()
      }
    })
  })
})()
