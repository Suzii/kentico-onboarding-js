import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyActions } from '../constants/keys';
import { isTextEmpty } from '../utils/validation';

export interface INewItemFormCallbackProps {
  readonly onSubmit: (uri: string, text: string) => void;
}

interface INewItemFormState {
  newItemText: string;
}

export class NewItemForm extends React.PureComponent<INewItemFormCallbackProps, INewItemFormState> {
  static displayName = 'NewItemForm';

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props: INewItemFormCallbackProps) {
    super(props);

    this.state = {
      newItemText: '',
    };
  }

  _onInputChange = (e: React.FormEvent<HTMLInputElement>): void => this.setState({
    newItemText: e.currentTarget.value,
  });

  _submitItemText = (): void => {
    const { onSubmit } = this.props;
    const { newItemText } = this.state;

    onSubmit('/api/v1/listItems', newItemText);

    this.setState({
      newItemText: '',
    });
  };

  _onEnterPress = (): void => {
    const { newItemText } = this.state;

    if (!isTextEmpty(newItemText)) {
      this._submitItemText();
    }
  };

  _onEscPress = (): void => {
    this.setState({
      newItemText: '',
    });
  };

  render() {
    const { newItemText } = this.state;
    const enableAddButton = !isTextEmpty(newItemText);

    const handlers = {
      [keyActions.OnEnter]: this._onEnterPress,
      [keyActions.OnEsc]: this._onEscPress,
    };

    return (
      <HotKeys
        {...{ className: 'row' }}
        handlers={handlers}
      >
        <div className="input-group col">
          <input
            className="form-control col-md-6 rounded"
            type="text"
            placeholder="Item name cannot be empty"
            value={newItemText}
            onChange={this._onInputChange}
            autoFocus={true}
          />
          <button
            className="btn btn-primary ml-3"
            onClick={this._submitItemText}
            disabled={!enableAddButton}
            title="Adds new item to list. Text cannot be empty"
          >
            Add
          </button>
        </div>
      </HotKeys>
    );
  }
}