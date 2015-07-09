import React from 'react';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    selectedIndex: React.PropTypes.integer,
    index: React.PropTypes.integer,
    clickListItem: React.PropTypes.func,
    deleteOverlay: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      name: '',
      selectedIndex: 0
    };
  },
  selectedOverlay: function() {
    if (this.props.index === this.props.selectedIndex) {
      return 'selected';
    }
  },
  render: function() {
    return (
      <li className={this.selectedOverlay()} data-overylay-index={this.props.index} onClick={this.props.clickListItem}>
        {this.props.name}
        <a href='#' className='deleteOverlay alert' onClick={this.props.deleteOverlay}>x</a>
      </li>
    );
  }
});
