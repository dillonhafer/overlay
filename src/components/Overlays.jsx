import React from 'react';
import OverlayListItem from './OverlayListItem';

export default React.createClass({
  propTypes: {
    overlays: React.PropTypes.array,
    selectedOverlay: React.PropTypes.integer,
    setOverlay: React.PropTypes.func,
    currentOverlayIndex: React.PropTypes.number,
    newOverlay: React.PropTypes.func,
    deleteOverlay: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      overlays: [],
      selectedOverlay: 0
    };
  },
  clickListItem: function(e) {
    e.preventDefault();
    let idx = parseInt(e.target.dataset.overylayIndex, 10);
    this.props.setOverlay(idx);
  },
  confirmMessage: function() {
    let message = 'Are you sure you want to delete this Overlay?';
    return message;
  },
  deleteOverlay: function(e) {
    e.preventDefault();
    if (window.confirm(this.confirmMessage())) {
      let idx = parseInt(e.target.parentElement.dataset.overylayIndex, 10);
      this.props.deleteOverlay(idx);
    }
  },
  render() {
    return (
      <div className="index">
        <label>Saved Overlays ({this.props.overlays.length})</label>
        <ul id='overlays'>
          {
            this.props.overlays.map((overlay, index) => {
              return (
                <OverlayListItem key={index} selectedIndex={this.props.currentOverlayIndex} index={index} name={overlay.pattern} deleteOverlay={this.deleteOverlay} clickListItem={this.clickListItem} />
              );
            })
          }
        </ul>
        <button id="new" className='button success' onClick={this.props.newOverlay}>New</button>
      </div>
    );
  }
});
