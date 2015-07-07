import React from 'react';
import Overlays from './Overlays';
import OverlayForm from './OverlayForm';

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
    }
  },

  _fetchChromeSettings: function() {
    window.chrome.storage.sync.get('overlays', this._setSettings);
  },

  render() {
    return (
      <div>
        <div className="header">
          <h1>
            <img src='icon-128.png' alt='Overlay' />
            Overlay Options (REACT)
          </h1>
          <hr />
        </div>
        <Overlays overlays={this.state.overlays} />
        <OverlayForm overlay={this.state.selectedOverlay} />

        <label>Live Preview</label>
        <iframe name='preview' id='live-preview'></iframe>

        <div className='footer text-center'>
          Overylay &copy; 2015<br />
          Version 2.0
        </div>
      </div>
    );
  }
});
