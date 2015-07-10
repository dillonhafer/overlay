import React from 'react';
import Frame from 'react-frame-component';

export default React.createClass({
  propTypes: {
    html: React.PropTypes.string
  },
  shouldComponentUpdate: function(nextProps) {
    window.frames.preview.document.body.innerHTML = nextProps.html;
    return false;
  },
  render() {
    return (
      <div>
        <label>Live Preview</label>
        <iframe id='live-preview' name='preview'></iframe>
      </div>
    );
  },
});
