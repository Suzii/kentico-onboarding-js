import { OrderedMap } from 'immutable';
import {
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_EDIT, ITEM_POST_SUCCESS, ITEM_PUT_SUCCESS, ITEM_DELETE_SUCCESS,
  ITEM_PUT_ERROR, ITEM_DELETE_ERROR, CLOSE_ITEM_ERROR, ITEM_POST_ERROR,
} from '../../../constants/actionTypes';
import { item } from './item';
import { IAction } from '../../../actions/IAction';
import { ListItem } from '../../../models/ListItem';
import { Uuid } from '../../../utils/generateId';

export const items = (previousState: OrderedMap<Uuid, ListItem> = OrderedMap<Uuid, ListItem>(), action: IAction): OrderedMap<Uuid, ListItem> => {
  switch (action.type) {
    case ITEM_POST_SUCCESS:
      const newState = previousState.delete(action.payload.id);

      return newState
        .update(action.payload.newId, existingItem => item(existingItem, action));

    case ITEM_DELETE_SUCCESS:
    case ITEM_POST_ERROR:
      return previousState.delete(action.payload.id);

    case TODO_LIST_ITEM_INSERT:
    case TODO_LIST_ITEM_UPDATE:
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT:
    case TODO_LIST_ITEM_DELETE:
    case ITEM_DELETE_ERROR:
    case ITEM_PUT_SUCCESS:
    case ITEM_PUT_ERROR:
    case CLOSE_ITEM_ERROR: {
      return previousState
        .update(action.payload.id, existingItem => item(existingItem, action));
    }

    default:
      return previousState;
  }
};
