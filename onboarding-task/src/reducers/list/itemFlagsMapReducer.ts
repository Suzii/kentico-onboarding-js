import { OrderedMap } from 'immutable';

import { ItemFlags } from '../../models/ItemFlags';
import { IAction } from '../../interfaces/IAction';
import { itemFlagsReducer } from './itemFlagsReducer';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCESS,
  FETCH_SUCCESS,
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,
  POST_REQUEST_FAIL,
  POST_REQUEST_STARTED,
  POST_REQUEST_SUCCESS,
  PUT_REQUEST_FAIL,
  PUT_REQUEST_STARTED,
  PUT_REQUEST_SUCCESS,
} from '../../actions/actionTypes';
import { IItemDTO } from '../../interfaces/IItemDTO';

export type ItemsFlagsMap = OrderedMap<string, ItemFlags>;

const defaultState = OrderedMap<string, ItemFlags>();

export const itemFlagsMapReducer = (state: ItemsFlagsMap = defaultState, action: IAction): ItemsFlagsMap => {
  switch (action.type) {
    case DELETE_REQUEST_SUCCESS:
      return state.remove(action.payload.id);

    case POST_REQUEST_STARTED: {
      const newItem = new ItemFlags({isStored: false});
      return state.set(action.payload.optimisticId, newItem);
    }

    case POST_REQUEST_SUCCESS: {
      const newItem = new ItemFlags({isStored: true});
      state = state.remove(action.payload.formerId);

      return state.set(action.payload.item.id, newItem);
    }

    case FETCH_SUCCESS: {
      action.payload.items.map((item: IItemDTO) => {
        state = state.set(item.id, new ItemFlags({isStored: true}));
      });
      return state;
    }

    case ITEM_MAKE_EDITABLE:
    case ITEM_CHANGE_CANCELLED:
    case DELETE_REQUEST_STARTED:
    case PUT_REQUEST_STARTED:
    case PUT_REQUEST_SUCCESS:
    case PUT_REQUEST_FAIL:
    case DELETE_REQUEST_FAIL:
    case POST_REQUEST_FAIL: {
      const flagsToEdit = state.get(action.payload.id);

      if (!flagsToEdit) {
        return state;
      }

      const editedInfo = itemFlagsReducer(flagsToEdit, action);
      return state.set(action.payload.id, editedInfo);
    }

    /* case PUT_REQUEST_FAIL:
       case DELETE_REQUEST_FAIL:
       case POST_REQUEST_FAIL: {
         const flagsToEdit = state.get(action.payload.id);

         if (!flagsToEdit) {
           return state;
         }

         const editedInfo = itemFlagsReducer(flagsToEdit, action);
         return state.set(action.payload.id, editedInfo);
       }*/
    default:
      return state;
  }
};
