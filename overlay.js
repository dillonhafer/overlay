(function() {
  "use strict"
  chrome.storage.sync.get("overlays", function(data) {
    data.overlays.forEach(function(o) {
      var re = new RegExp(o.pattern)
      if(re.test(window.location.toString())) {
        var overlayDiv = document.createElement('div')
        overlayDiv.innerHTML = o.html
        document.body.appendChild(overlayDiv)
      }
    })
  })
})()
