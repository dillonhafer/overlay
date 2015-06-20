var overlays = []

chrome.storage.sync.get('overlays', function(data) {
  if(!data || !data.overlays) {
    return;
  }

  overlays = data.overlays
  renderOverlayList(overlays)
})

var removeSelected = function() {
  var prevSelected = document.querySelector('#overlays li.selected')
  if(prevSelected) {
    prevSelected.className = ''
  }
}

var edit = function(li, overlay) {
  removeSelected()
  li.className = "selected"
  var editForm = document.forms.edit
  editForm.dataset.idx = li.dataset.idx
  editForm.pattern.value = overlay.pattern
  editForm.html.value = overlay.html
  enableDelete()
  updatePreview()
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

var enableDelete = function() {
  var deleteButton = document.getElementById('delete')
  deleteButton.removeAttribute('disabled')
  deleteButton.className = 'button alert'
}

var disableDelete = function() {
  var deleteButton = document.getElementById('delete')
  deleteButton.setAttribute('disabled', 'disabled')
  deleteButton.className = 'button alert disabled'
}

var newOverlay = function() {
  editForm = document.forms.edit
  editForm.reset()
  delete editForm.dataset.idx
  editForm.pattern.focus()
  removeSelected()
  disableDelete()
}

var del = function() {
  if (confirm('Are you sure you want to delete this Overlay?')) {
    var prevSelected = document.querySelector('#overlays li.selected')
    if(prevSelected) {
      overlays.splice(prevSelected.dataset["idx"], 1)
    }

    renderOverlayList(overlays)
    chrome.storage.sync.set({"overlays": overlays})
    newOverlay()
  }
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

var updatePreview = function() {
  window.frames.preview.document.body.innerHTML = document.forms.edit.html.value
}

var saveShortcut = function(event) {
  if (event.metaKey && event.keyCode == 83) {
    document.forms.edit.save.click()
    event.preventDefault()
    return false
  }
}

var setTitle = function() {
  var title = 'Ctrl + S'
  if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
    var title = 'Command + S'
  }
  document.forms.edit.save.title = title
}

setTitle()
document.forms.edit.addEventListener('submit', save)
document.getElementById('new').addEventListener('click', newOverlay)
document.getElementById('delete').addEventListener('click', del)
document.getElementById('html').addEventListener('keyup', updatePreview)
document.addEventListener('keydown', saveShortcut)
