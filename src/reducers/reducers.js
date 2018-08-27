import { OrderedMap } from 'immutable';
import {
  CHANGES_SAVE,
  EDITING_MODE_CHANGE,
  ITEM_ADD,
  ITEM_DELETE
} from '../actions/actionTypes';
import { ListItem } from '../models/ListItem';

export const performAction = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADD:
      return state.set(action.id, new ListItem({ ...action }));
    case ITEM_DELETE:
      return state.delete(action.id);
    case EDITING_MODE_CHANGE:
      return state.updateIn([action.id, 'isEdited'], isEdited => !isEdited);
    case CHANGES_SAVE:
      return state.mergeIn([action.id], {
        text: action.text,
        isEdited: false
      });
    default:
      return state;
  }
};

// const _addItem = (state = new OrderedMap(), action) => {
//   switch (action.type) {
//     case ITEM_ADD:
//       return state.set(action.id, new ListItem({
//         id: action.id,
//         text: action.text
//       }));
//     default:
//       return state;
//   }
// };
//
// const _deleteItem = (state = new OrderedMap(), action) => {
//   switch (action.type) {
//     case ITEM_DELETE:
//       return state.delete(action.id);
//     default:
//       return state;
//   }
// };
//
// const _changeEditingMode = (state = new OrderedMap(), action) => {
//   switch (action.type) {
//     case EDITING_MODE_CHANGE:
//       return state.updateIn([action.id, 'isEdited'], isEdited => !isEdited);
//     default:
//       return state;
//   }
// };
