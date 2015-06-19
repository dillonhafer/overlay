// chrome.storage.sync.set({
//   "overlays": [
//     { "pattern": "jack", "html": "<p>Hey Jack!</p>"},
//     { "pattern": "dillon", "html": "<p>Hey Dillon!</p>"},
//   ]
// })

var overlays = []

chrome.storage.sync.get("overlays", function(data) {
  if(!data || !data.overlays) {
    return;
  }

  overlays = data.overlays

  renderOverlayList(overlays)
})


var edit = function(li, overlay) {
  var prevSelected = document.querySelector('#overlays li.selected')
  if(prevSelected) {
    prevSelected.className = "";
  }

  li.className = "selected"

  var editForm = document.forms.edit
  editForm.dataset.idx = li.dataset.idx
  editForm.pattern.value = overlay.pattern
  editForm.html.value = overlay.html
}

var save = function() {
  var editForm = document.forms.edit

  var o = {
    pattern: editForm.pattern.value,
    html: editForm.html.value
  }

  var idx = editForm.dataset.idx
  if(idx !== undefined) {
    overlays[idx] = o
  } else {
    overlays.push(o)
  }


  renderOverlayList(overlays)

  chrome.storage.sync.set({"overlays": overlays})
}

var newOverlay = function() {
  editForm = document.forms.edit
  editForm.reset()
  delete editForm.dataset.idx
}

var del = function() {
  var prevSelected = document.querySelector('#overlays li.selected')
  if(prevSelected) {
    overlays.splice(prevSelected.dataset["idx"], 1)
  }

  renderOverlayList(overlays)

  chrome.storage.sync.set({"overlays": overlays})

  newOverlay()
}

var renderOverlayList = function(overlays) {
  var overlayList = document.getElementById("overlays")
  overlayList.innerHTML = ""

  overlays.forEach(function(o, idx) {
    var li = document.createElement('li')
    li.dataset["idx"] = idx
    li.innerHTML = o.pattern
    overlayList.appendChild(li)
    li.addEventListener('click', function(e) { edit(e.target, o) } )
  })
}

document.forms.edit.addEventListener('submit', save)
document.getElementById('new').addEventListener('click', newOverlay)
document.getElementById('delete').addEventListener('click', del)
