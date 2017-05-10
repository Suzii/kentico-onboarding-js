import { Map } from 'immutable';
import { itemReducer } from './itemReducer';
import {
  ADD_ITEM,
  DELETE_ITEM,
  ENABLE_EDIT_ITEM,
  SAVE_CHANGES_TO_ITEM,
  CANCEL_CHANGES_TO_ITEM,
  RECEIVE_ITEMS
} from '../constants/actionTypes';
import { IAction } from '../actionCreators/IAction';
import { IItem } from '../models/IItem';

const itemsReducer = (state: Map<string, IItem> = Map<string, IItem>(), action: IAction): Map<string, IItem> => {
  switch (action.type) {
    case RECEIVE_ITEMS: {
      const items = action.payload.items;
      console.log('itemsReducer.tsx: items received', items);
      const imItems = Map();
      const spreadItems = items.map((object: any) => imItems.set(object.Id, object.Text));
      console.log('itemsReducer.tsx spread: ', spreadItems);
      return state.clear().merge(...items);
    }

    case ADD_ITEM:
      return state.set(action.payload.id, itemReducer(undefined, action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case ENABLE_EDIT_ITEM:
    case SAVE_CHANGES_TO_ITEM:
    case CANCEL_CHANGES_TO_ITEM: {
      const currentItem = state.get(action.payload.id);
      const editedItem = itemReducer(currentItem, action);

      return state.set(action.payload.id, editedItem);
    }

    default:
      return state;
  }
};

export { itemsReducer };
