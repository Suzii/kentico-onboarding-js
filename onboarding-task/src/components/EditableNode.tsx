const ImmutablePropTypes = require('react-immutable-proptypes');
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import { isNullOrWhitespace } from '../utils/validation';
import { INodeViewModel } from '../models/NodeViewModel';

interface IEditableNodeDataProps {
  nodeViewModel: INodeViewModel;
}

interface IEditableNodeCallbacksProps {
  onSave: (text: string) => void;
  onCancel: () => void;
  onDelete: () => void;
}

type IEditableNodeProps = IEditableNodeDataProps & IEditableNodeCallbacksProps;

interface IEditableNodeState {
  text: string;
}

export class EditableNode extends React.PureComponent<IEditableNodeProps, IEditableNodeState> {
  static displayName = 'EditableNode';

  static propTypes: React.ValidationMap<IEditableNodeProps> = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    nodeViewModel: ImmutablePropTypes.recordOf({
      text: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props: IEditableNodeProps) {
    super(props);

    this.state = {
      text: props.nodeViewModel.text,
    };
  }

  _saveNode = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    if (!isNullOrWhitespace(this.state.text)) {
      event.preventDefault();
      this.props.onSave(this.state.text);
    }
  };

  _updateText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    this.setState(() => ({text}));
  };

  render() {
    const {text} = this.state;

    const keyHandlers: KeyHandler = {
      cancelNode: this.props.onCancel,
      saveNode: (event: React.KeyboardEvent<HTMLFormElement>) => this._saveNode(event),
    };

    return (
      <HotKeys handlers={keyHandlers}>
        <form className="form-inline" onSubmit={this._saveNode}>
          {this.props.nodeViewModel.index}.

          <input
            autoFocus
            className="form-control"
            value={text}
            onChange={this._updateText}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isNullOrWhitespace(text)}
          >
            Save
          </button>

          <button
            type="button"
            className="btn btn-default"
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

        </form>
      </HotKeys>
    );
  }
}
