import React, { PureComponent } from 'react';

export class AddItem extends PureComponent {
  static displayName = 'AddItem';

  state = {
    value: '',
  };

  _updateValue = event => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ value: eventTargetValue }));
  };

  _addItem = () => {
    this.props.onChange(this.state.value);
    this.setState(() => ({ value: '' }));
  };

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="text"
            value={this.state.value}
            onChange={this._updateValue}
          />
          <button
            type="button"
            className="btn btn-default"
            onClick={this._addItem}
            disabled={!this.state.value}
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}