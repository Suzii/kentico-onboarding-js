import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IListItemDataProps,
  ListItem as ListItemComponent
} from '../components/ListItem';
import { IAppState } from '../reducers/IAppState';
import { ItemId } from '../models/ItemId';
import * as React from 'react';
import { IAction } from '../actions/IAction';
import { toggleEditing } from '../actions/simpleActions/toggleEditing';
import { removeItem } from '../actions/index';
import { updateItem } from '../actions/index';
import { resetItem } from '../actions/simpleActions/resetItem';
import { uploadItemAgain } from '../actions';

export interface IListItemContainerProps {
  id: ItemId;
  index: number;
}

export interface IListItemCallbackProps {
  onDivClick: React.MouseEventHandler<HTMLDivElement>;
  onThrowAway: () => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
  onUploadAgain: (text: string) => Promise<IAction>;
  onRecover: () => IAction;
}

function mapStateToProps(state: IAppState, {id, index}: IListItemContainerProps): IListItemDataProps {
  const item = state.items.byId.get(id);
  return {
    text: item.text,
    textUpdate: item.textUpdate,
    id,
    isBeingEdited: item.isBeingEdited,
    index,
    synchronized: item.synchronized,
    errorMessages: item.errorMessages,
    isBeingDeleted: item.isBeingDeleted,
  };
}

const mapDispatchToProps = (dispatch: Function, { id }: IListItemContainerProps): IListItemCallbackProps => ({
  onDivClick: () => dispatch(toggleEditing(id, true)),
  onThrowAway: () => removeItem(dispatch)(id),
  onSaveAgain: (text: string) => updateItem(dispatch)(id, text),
  onUploadAgain: (text: string) => uploadItemAgain(id)(dispatch)(text),
  onRecover: () => dispatch(resetItem(id, ['DELETE'])),
});


export const ListItem: ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
