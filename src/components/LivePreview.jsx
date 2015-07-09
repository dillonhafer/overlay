import React from 'react';
import Frame from 'react-frame-component';

export default React.createClass({
  propTypes: {
    html: React.PropTypes.string
  },
  createMarkup: function() {
    return {__html: this.props.html};
  },
  render() {
    return (
      <div>
        <label>Live Preview</label>
        <iframe id='live-preview' dangerouslySetInnerHTML={this.createMarkup()}></iframe>
      </div>
    );
  },
});
