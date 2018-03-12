// components/NewItem.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { isInputValid } from '../utils/validationService';

export class NewItem extends React.PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
    };
  }

  _handleChange = (event) => this.setState({ itemValue: event.target.value });

  _handleKeyDown = (event) => {
    if (event.key === 'Enter' && isInputValid(this.state.itemValue)) {
      this._addItem();
    }
    else if (event.key === 'Escape') {
      this.setState({ itemValue: '' });
    }
  };

  _addItem = () => {
    this.props.addItem(this.state.itemValue);
    this.setState({ itemValue: '' });
  };

  render() {
    const { itemValue } = this.state;

    return (
      <div className="row">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What is on your mind ... ?"
            value={itemValue}
            onChange={this._handleChange}
            onKeyDown={this._handleKeyDown}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-default"
              onClick={this._addItem}
              disabled={!isInputValid(itemValue)}
            > Add
            </button>
          </span>
        </div>
      </div>
    );
  }
}

