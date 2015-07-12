import React from 'react';

export default React.createClass({
  propTypes: {
    cancelDelete: React.PropTypes.func,
    deleteOverlay: React.PropTypes.func,
    overlays: React.PropTypes.array,
    index: React.PropTypes.number,
    hideModal: React.PropTypes.bool
  },
  pattern: function() {
    let overlay = this.props.overlays[this.props.index] || {pattern: ''};
    return overlay.pattern;
  },
  render() {
    let cx = React.addons.classSet;
    let classes = cx({
      overlay: true,
      fadeIn: !this.props.hideModal,
      hide: this.props.hideModal
    });
    return (
      <div id="overlay-container-1" className={classes}>
        <div id="content-settings-page" className="page">
          <a href='#' className="close-button" onClick={this.props.cancelDelete}>&#215;</a>
          <h1>Confirm Delete</h1>
          <div className="content-area">
            <section>
              <p>Are you sure you want to delete the overlay for:</p>
              <h3>{this.pattern()}</h3>
              <p>This cannot be undone.</p>
            </section>
          </div>
          <div className="action-area">
            <div className="button-strip">
              <a id="content-settings-overlay-confirm" href='#' className="button alert" onClick={this.props.deleteOverlay}>Delete</a>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

