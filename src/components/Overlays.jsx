import React from 'react';
import OverlayListItem from './OverlayListItem';

export default React.createClass({
  getInitialState: function() {
    return {
      overlays: this.props.overlays
    };
  },
  clickListItem: function(e) {
    e.preventDefault();
    this.setState({cssClass: 'selected'});
  },
  render() {
    return (
      <div className="index">
        <label>Saved Overlays ({this.props.overlays.length})</label>
        <ul id='overlays'>
          {
            this.props.overlays.map((overlay, index) => {
              return (
                <OverlayListItem key={index} name={overlay.pattern} onClick={this.clickListItem} />
              );
            })
          }
        </ul>
        <button id="new" className='button success'>New</button>
      </div>
    );
  }
});
