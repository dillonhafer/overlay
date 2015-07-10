import React from 'react';
import Overlays from './Overlays';
import OverlayForm from './OverlayForm';
import LivePreview from './LivePreview';

export default React.createClass({
  getInitialState: function() {
    return {
      overlays: []
    };
  },
  componentDidMount: function() {
    this._fetchChromeSettings();
  },
  _setSettings: function(data) {
    if (data && data.overlays) {
      let state = {overlays: data.overlays, index: data.index};
      if (data.index === null) {
        state.html = '';
        state.pattern = '';
      }
      this.setState(state);
      window.chrome.storage.sync.set({overlays: data.overlays});
    }
  },
  _fetchChromeSettings: function() {
    window.chrome.storage.sync.get('overlays', this._setSettings);
  },
  setSelectedOverlay: function(overlayIdx) {
    if (!isNaN(overlayIdx)) {
      let overlay = this.state.overlays[overlayIdx];
      this.setState({
        index: overlayIdx,
        pattern: overlay.pattern,
        html: overlay.html
      });
    }
  },
  newOverlay: function(e) {
    e.preventDefault();
    this.setState({
      index: null,
      pattern: '',
      html: ''
    });
  },
  updateForm: function(e) {
    let form = {};
    form[e.target.id] = e.target.value;
    this.setState(form);
  },
  isNewOverlay: function() {
    return this.state.index === null;
  },
  saveOverlay: function(e) {
    e.preventDefault();
    let overlays = this.state.overlays;
    let formData = {pattern: this.state.pattern, html: this.state.html};
    let idx      = overlays.length;

    if (this.isNewOverlay()) {
      overlays.push(formData);
    } else {
      idx = this.state.index;
      overlays[this.state.index] = formData;
    }

    this._setSettings({overlays: overlays, index: idx});
  },
  deleteOverlay: function(idx) {
    let overlays = this.state.overlays;
    overlays.splice(idx, 1);
    this._setSettings({overlays: overlays, index: null});
  },
  render() {
    return (
      <div>
        <header>
          <h1><img src='icon-128.png' alt='Overlay' /> Overlay Options</h1>
          <hr />
        </header>
        <Overlays newOverlay={this.newOverlay} currentOverlayIndex={this.state.index} setOverlay={this.setSelectedOverlay} overlays={this.state.overlays} deleteOverlay={this.deleteOverlay} />
        <OverlayForm saveOverlay={this.saveOverlay} pattern={this.state.pattern} html={this.state.html} updateForm={this.updateForm} />
        <LivePreview html={this.state.html} />

        <footer className='text-center'>
          Overylay &copy; 2015<br />
          Version 2.0
        </footer>
      </div>
    );
  }
});
