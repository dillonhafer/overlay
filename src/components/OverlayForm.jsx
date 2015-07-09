import React from 'react';

export default React.createClass({
  propTypes: {
    html: React.PropTypes.string,
    pattern: React.PropTypes.string
  },
  render() {
    return (
      <div className='edit'>
        <form name="edit">
          <label htmlFor='pattern'>Pattern</label>
          <input type='text' id='pattern' name='pattern' placeholder='example.com' value={this.props.pattern} onChange={this.props.updateForm} required />
          <label htmlFor='html'>HTML</label>
          <textarea id='html' name='html' value={this.props.html} onChange={this.props.updateForm} required></textarea>
          <div className='clear'>
            <button id="save" name='save' className='button left' onClick={this.props.saveOverlay}>Save</button>
          </div>
        </form>
      </div>
    );
  }
});
