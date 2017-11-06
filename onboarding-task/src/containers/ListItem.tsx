import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import {
  toggleBeingEdited,
  putData,
  deleteData
} from '../actions/publicActions';
import { memoizedCreateViewModel } from '../utils/createViewModel';

import {
  IListItemDataProps as IListItemComponentDataProps,
  IListItemCallbacksProps as IListItemComponentCallbacksProps
} from '../components/ListItem';

import { Store } from '../reducers/stores';
import { httpActionResolver } from '../utils/httpActionsResolver';


interface IOwnProps {
  id: string;
}

const mapStateToProps = ({ items }: Store.IRoot, { id }: IOwnProps): IListItemComponentDataProps => {
  const item = items.data.get(id);
  const flags = items.flags.get(id);

  return { itemViewModel: memoizedCreateViewModel(item, flags) };
};

const mapDispatchToProps = (dispatch: Dispatch, { id }: IOwnProps): IListItemComponentCallbacksProps => ({
  onUpdateItem: (value: string) => dispatch(putData(id, value)),
  onDeleteItem: () => dispatch(deleteData(id)),
  onToggleBeingEdited: () => dispatch(toggleBeingEdited(id)),
  onResendRequest: (method: string) => dispatch(httpActionResolver(id, method))
});

export const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemComponent);

