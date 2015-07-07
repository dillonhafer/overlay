import React from 'react';

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
      <div className='edit'>
        <form name="edit">
          <label htmlFor='pattern'>Pattern</label>
          <input type='text' id='pattern' name='pattern' placeholder='example.com' required />

          <label htmlFor='html'>HTML</label>
          <textarea id='html' name='html' placeholder="<h1 style='color: pink'>Hello world</h1>" required></textarea>
          <div className='clear'>
            <button id="save" name='save' className='button left'>Save</button>
            <button id="delete" className='button alert disabled left' disabled>Delete</button>
          </div>
        </form>
      </div>
    );
  }
});
