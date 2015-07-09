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
      this.setState({overlays: data.overlays});
      window.chrome.storage.sync.set({overlays: data.overlays});
    }
  },
  _fetchChromeSettings: function() {
    window.chrome.storage.sync.get('overlays', this._setSettings);
  },
  setSelectedOverlay: function(overlayIdx) {
    let overlay = this.state.overlays[overlayIdx];
    this.setState({
      index: overlayIdx,
      pattern: overlay.pattern,
      html: overlay.html
    });
  },
  updateForm: function(e) {
    let form = {};
    form[e.target.id] = e.target.value;
    this.setState(form);
  },
  saveOverlay: function(e) {
    e.preventDefault();
    let overlays = this.state.overlays;
    overlays[this.state.index] = {
      pattern: this.state.pattern,
      html: this.state.html
    };

    this._setSettings({overlays: overlays});
  },
  render() {
    return (
      <div>
        <header>
          <h1><img src='icon-128.png' alt='Overlay' /> Overlay Options</h1>
          <hr />
        </header>
        <Overlays currentOverlayIndex={this.state.index} setOverlay={this.setSelectedOverlay} overlays={this.state.overlays} />
        <OverlayForm saveOverlay={this.saveOverlay} pattern={this.state.pattern} html={this.state.html} updateForm={this.updateForm} />
        <LivePreview html={this.state.html} />

        <div className='footer text-center'>
          Overylay &copy; 2015<br />
          Version 2.0
        </div>
      </div>
    );
  }
});
