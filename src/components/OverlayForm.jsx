import React from 'react/addons';

export default React.createClass({
  propTypes: {
    html: React.PropTypes.string,
    pattern: React.PropTypes.string,
    updateForm: React.PropTypes.func,
    saveOverlay: React.PropTypes.func
  },
  placeholder: function() {
    return '<div style="background: red;">\n  You are on Production!\n</div>';
  },
  isDisabled: function() {
    return (this.props.pattern === '' || this.props.html === '');
  },
  render() {
    let cx = React.addons.classSet;
    let classes = cx({
      'button left': true,
      disabled: this.isDisabled()
    });
    return (
      <div className='edit'>
        <form name="edit">
          <label htmlFor='pattern'>URL Pattern</label>
          <input type='text' id='pattern' name='pattern' placeholder='example.com' value={this.props.pattern} onChange={this.props.updateForm} required='required' />
          <label htmlFor='html'>HTML</label>
          <pre>
            <code className="language-css">
              <textarea id='html' placeholder={this.placeholder()} name='html' value={this.props.html} onChange={this.props.updateForm} required></textarea>
            </code>
          </pre>
          <div className='clear'>
            <button id="save" name='save' className={classes} onClick={this.props.saveOverlay} disabled={this.isDisabled()}>Save</button>
          </div>
        </form>
      </div>
    );
  }
});
