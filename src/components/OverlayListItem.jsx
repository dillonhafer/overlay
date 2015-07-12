import React from 'react';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    selectedIndex: React.PropTypes.number,
    index: React.PropTypes.number,
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
        <strong>{this.props.index + 1}.</strong> {this.props.name}
        <a href='#' className='deleteOverlay alert' onClick={this.props.deleteOverlay}>&#215;</a>
      </li>
    );
  }
});
