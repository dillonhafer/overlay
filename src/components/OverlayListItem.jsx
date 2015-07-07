import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {
      cssClass: ''
    };
  },
  propTypes: {
    name: React.PropTypes.string
  },
  render: function() {
    return (
      <li className={this.state.cssClass}>{this.props.name}</li>
    );
  }
});
