import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Shortcuts } from 'react-shortcuts';

import { isInputValid } from '../utils/validationService';
import { IItemViewModel } from '../models/IItemViewModel';
import {
  ITEM_EDIT_CONFIRM,
  ITEM_EDIT_CANCEL,
  ITEM_DELETE,
} from '../constants/constants';
import { Error } from '../containers/Error';

export interface IListItemOriginalProps {
  readonly item: IItemViewModel;
}

export interface IListItemEditorDispatchProps {
  readonly saveItem: () => void;
  readonly deleteItem: () => void;
  readonly onCancelEdit: () => void;
  readonly onChange: (value: string) => void;
}

interface ListItemEditorProps extends IListItemOriginalProps, IListItemEditorDispatchProps {}

export class ListItemEditor extends React.PureComponent<ListItemEditorProps> {
  static displayName = 'ListItemEditor';

  static propTypes = {
    item: PropTypes.shape({
      bullet: PropTypes.string.isRequired,
      temporaryValue: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool.isRequired,
    }).isRequired,

    saveItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  _shortCuts = ({
    [ITEM_EDIT_CONFIRM]: ({ item: { temporaryValue }, saveItem }: ListItemEditorProps) => {
      if (isInputValid(temporaryValue)) {
        saveItem();
      }
    },
    [ITEM_EDIT_CANCEL]: ({ onCancelEdit }: IListItemEditorDispatchProps) => onCancelEdit(),
    [ITEM_DELETE]: ({ deleteItem }: IListItemEditorDispatchProps) => deleteItem(),
  });

  _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event.target.value);

  _handleShortcuts = (action: string): void => this._shortCuts[action](this.props);

  render() {
    const {
      item: {
        bullet,
        temporaryValue,
        key,
        isDisabled,
      },
      onCancelEdit,
      deleteItem,
      saveItem,
    } = this.props;

    const divContentClass = isDisabled ? 'input-group disabled' : 'input-group';

    return (
      <Shortcuts name="ListItemEditor" handler={this._handleShortcuts}>
        <div className={divContentClass}>
          <span className="input-group-addon">
            {bullet}
          </span>
          <input
            type="text"
            className="form-control"
            value={temporaryValue}
            onChange={this._handleChange}
            autoFocus
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveItem}
              disabled={!isInputValid(temporaryValue)}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteItem}
            >
              Delete
            </button>
          </span>
        </div>
        <Error itemKey={key} retry={false} />
      </Shortcuts>
    );
  }
}