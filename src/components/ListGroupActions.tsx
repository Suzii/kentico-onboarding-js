import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IListGroupActionsStateProps {
  readonly selectedKeys: Array<Key>;
  readonly actionsDisabled: boolean;
}

export interface IListGroupActionsDispatchProps {
  readonly saveSelected: (selectedKeys: Array<Key>) => void;
  readonly cancelSelected: (selectedKeys: Array<Key>) => void;
  readonly deleteSelected: (selectedKeys: Array<Key>) => void;
}

interface IListGroupActionsProps extends IListGroupActionsStateProps, IListGroupActionsDispatchProps {}

export class ListGroupActions extends React.PureComponent<IListGroupActionsProps> {
  static displayName = 'ListGroupActions';

  static propTypes = {
    selectedKeys: PropTypes.array.isRequired,
    saveSelected: PropTypes.func.isRequired,
    cancelSelected: PropTypes.func.isRequired,
    deleteSelected: PropTypes.func.isRequired,
  };

  _saveSelected = () => this.props.saveSelected(this.props.selectedKeys);

  _cancelSelected = () => this.props.cancelSelected(this.props.selectedKeys);

  _deleteSelected = () => this.props.deleteSelected(this.props.selectedKeys);

  render() {
    const { selectedKeys, actionsDisabled } = this.props;

    return (
      (selectedKeys.length > 1) ? (
        <div className="row">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this._saveSelected}
              disabled={actionsDisabled}
            >
              Save Selected
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={this._cancelSelected}
              disabled={actionsDisabled}
            >
              Cancel Selected
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this._deleteSelected}
              disabled={actionsDisabled}
            >
              Delete Selected
            </button>
          </div>
        </div>
      ) : null
    );
  }
}