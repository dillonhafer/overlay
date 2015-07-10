import React from 'react/addons';

export default React.createClass({
  propTypes: {
    html: React.PropTypes.string,
    pattern: React.PropTypes.string,
    updateForm: React.PropTypes.func,
    saveOverlay: React.PropTypes.func
  },
  isDisabled: function() {
    return (this.props.pattern === '' || this.props.html === '');
  },
  render() {
    let cx = React.addons.classSet;
    let classes = cx({
      'button left': true,
      'disabled': this.isDisabled()
    });
    return (
      <div className='edit'>
        <form name="edit">
          <label htmlFor='pattern'>Pattern</label>
          <input type='text' id='pattern' name='pattern' placeholder='example.com' value={this.props.pattern} onChange={this.props.updateForm} required='required' />
          <label htmlFor='html'>HTML</label>
          <textarea id='html' name='html' value={this.props.html} onChange={this.props.updateForm} required></textarea>
          <div className='clear'>
            <button id="save" name='save' className={classes} onClick={this.props.saveOverlay} disabled={this.isDisabled()}>Save</button>
          </div>
        </form>
      </div>
    );
  }
});
