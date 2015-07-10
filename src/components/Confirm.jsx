import React from 'react';

export default React.createClass({
  propTypes: {
    cancelDelete: React.PropTypes.func,
    deleteOverlay: React.PropTypes.func,
    hideModal: React.PropTypes.bool
  },
  render() {
    let cx = React.addons.classSet;
    let classes = cx({
      overlay: true,
      hide: this.props.hideModal
    });
    return (
      <div id="overlay-container-1" className={classes}>
        <div id="content-settings-page" className="page">
          <a href='#' className="close-button" onClick={this.props.cancelDelete}>&#215;</a>
          <h1>Confirm Deletion of Overlay</h1>
          <div className="content-area">
            <section>
              <h3>Are you sure you want to delete this overlay?</h3>
            </section>
          </div>
          <div className="action-area">
            <div className="button-strip">
              <a href="#" id="content-settings-overlay-confirm" onClick={this.props.cancelDelete}>Cancel</a>
              <a id="content-settings-overlay-confirm" href='#' className="button alert" onClick={this.props.deleteOverlay}>Delete</a>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

