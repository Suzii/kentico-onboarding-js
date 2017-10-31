import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  isInputValid,
} from '../utils/inputValidation';

export class EditedItem extends PureComponent {
  static propTypes = {
    onSaveItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editedText: props.item.text,
      isFocused: false,
      isInputValid: true,
    };
  }

  inputChange = (event) => {
    this.setState({
      editedText: event.currentTarget.value,
      isFocused: true,
      isInputValid: isInputValid(event.currentTarget.value),
    });
  };

  saveItem = () => {
    this.props.onSaveItem(this.state.editedText);
  };

  chooseClass = () => {
    if (!this.state.isFocused) {
      return 'input-group';
    }
    if (this.state.isInputValid) {
      return 'input-group has-success';
    }
    return 'input-group has-error';
  };

  focus = () => {
    this.setState({
      editedText: this.state.editedText,
      isFocused: true,
    });
  };

  blur = () => {
    this.setState(() => ({
      editedText: this.state.editedText,
      isFocused: false,
    }));
  };

  render() {
    return (
      <div className="row">
        <div className="col-xs-4">
          <div className={this.chooseClass()}>
            <span className="input-group-addon">
              {this.props.index}.
            </span>
            <input
              className="form-control"
              value={this.state.editedText}
              onChange={this.inputChange}
              onFocus={this.focus}
              onBlur={this.blur}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.saveItem}
          title={this.state.isInputValid
            ? undefined
            : 'Please fill out the form'}
          disabled={!this.state.isInputValid}
        >
          Save
        </button>

        <button
          type="button"
          className="btn btn-light"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}
